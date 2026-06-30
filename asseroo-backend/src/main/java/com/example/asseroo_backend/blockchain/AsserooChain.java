package com.example.asseroo_backend.blockchain;

import org.springframework.stereotype.Component;
import jakarta.annotation.PostConstruct;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HexFormat;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import com.example.asseroo_backend.errors.ApiException;
import org.springframework.http.HttpStatus;

@Component
public class AsserooChain {

    private static final String GENESIS_PREVIOUS_HASH = "0";
    private static final String SYSTEM_ISSUER = "SYSTEM";
    private static final String AADHAAR_REGEX = "^\\d{12}$";
    private static final String VEHICLE_REGEX = "^[A-Z]{2}[0-9]{1,2}[A-Z]{1,3}[0-9]{4}$";

    private final List<Block> chain = new ArrayList<>();
    private final Map<String, String> vehicleOwners = new ConcurrentHashMap<>();
    private final Map<String, Set<String>> ownerVehicles = new ConcurrentHashMap<>();
    private final Set<String> registeredAadhaars = ConcurrentHashMap.newKeySet();
    private final int difficulty = 4;

    @PostConstruct
    public void init() {
        createGenesisBlock();
    }

    public synchronized void registerUser(String aadhaarNumber) {
        String normalizedAadhaar = normalizeAadhaar(aadhaarNumber);

        if (!registeredAadhaars.add(normalizedAadhaar)) {
            throw new ApiException(HttpStatus.CONFLICT, "Aadhaar already registered.");
        }

        ownerVehicles.putIfAbsent(normalizedAadhaar, ConcurrentHashMap.newKeySet());
    }

    public synchronized boolean login(String aadhaarNumber) {
        String normalizedAadhaar = normalizeAadhaar(aadhaarNumber);
        return registeredAadhaars.contains(normalizedAadhaar);
    }

    public synchronized Transaction registerVehicle(String vehicleRegistrationNumber, String ownerAadhaar) {
        String normalizedVehicle = normalizeVehicleNumber(vehicleRegistrationNumber);
        String normalizedOwner = normalizeAadhaar(ownerAadhaar);

        ensureUserExists(normalizedOwner);

        if (vehicleOwners.containsKey(normalizedVehicle)) {
            throw new ApiException(HttpStatus.CONFLICT, "Vehicle is already registered on-chain.");
        }

        Transaction transaction = new Transaction(
                transactionId(normalizedVehicle, SYSTEM_ISSUER, normalizedOwner),
                normalizedVehicle,
                SYSTEM_ISSUER,
                normalizedOwner,
                Instant.now()
        );

        vehicleOwners.put(normalizedVehicle, normalizedOwner);
        ownerVehicles.computeIfAbsent(normalizedOwner, key -> ConcurrentHashMap.newKeySet()).add(normalizedVehicle);
        appendBlock(List.of(transaction));

        return transaction;
    }

    public synchronized Transaction transferVehicle(
            String vehicleRegistrationNumber,
            String fromAadhaar,
            String toAadhaar
    ) {
        String normalizedVehicle = normalizeVehicleNumber(vehicleRegistrationNumber);
        String normalizedFrom = normalizeAadhaar(fromAadhaar);
        String normalizedTo = normalizeAadhaar(toAadhaar);

        ensureUserExists(normalizedFrom);
        ensureUserExists(normalizedTo);

        String currentOwner = vehicleOwners.get(normalizedVehicle);
        if (currentOwner == null) {
            throw new ApiException(HttpStatus.NOT_FOUND, "Vehicle is not registered.");
        }

        if (!Objects.equals(currentOwner, normalizedFrom)) {
            throw new ApiException(HttpStatus.FORBIDDEN, "Transfer denied. Sender is not current owner.");
        }

        if (Objects.equals(normalizedFrom, normalizedTo)) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "Source and destination Aadhaar cannot be same.");
        }

        Transaction transaction = new Transaction(
                transactionId(normalizedVehicle, normalizedFrom, normalizedTo),
                normalizedVehicle,
                normalizedFrom,
                normalizedTo,
                Instant.now()
        );

        vehicleOwners.put(normalizedVehicle, normalizedTo);
        ownerVehicles.computeIfAbsent(normalizedFrom, key -> ConcurrentHashMap.newKeySet()).remove(normalizedVehicle);
        ownerVehicles.computeIfAbsent(normalizedTo, key -> ConcurrentHashMap.newKeySet()).add(normalizedVehicle);
        appendBlock(List.of(transaction));

        return transaction;
    }

    public synchronized List<Block> getChain() {
        return List.copyOf(chain);
    }

    public synchronized List<Transaction> getTransactions() {
        return chain.stream()
                .flatMap(block -> block.getTransactions().stream())
                .sorted(Comparator.comparing(Transaction::getTimestamp).reversed())
                .toList();
    }

    public synchronized String getVehicleOwner(String vehicleRegistrationNumber) {
        String normalizedVehicle = normalizeVehicleNumber(vehicleRegistrationNumber);
        String owner = vehicleOwners.get(normalizedVehicle);
        if (owner == null) {
            throw new ApiException(HttpStatus.NOT_FOUND, "Vehicle is not registered.");
        }

        return owner;
    }

    public synchronized List<String> getVehiclesByOwner(String aadhaarNumber) {
        String normalizedAadhaar = normalizeAadhaar(aadhaarNumber);
        ensureUserExists(normalizedAadhaar);
        return ownerVehicles.getOrDefault(normalizedAadhaar, Set.of()).stream().sorted().toList();
    }

    public synchronized boolean isChainValid() {

        Block currentBlock;
        Block previousBlock;

        for (int i = 1; i < chain.size(); i++) {

            currentBlock = chain.get(i);
            previousBlock = chain.get(i - 1);

            String calculatedHash = calculateBlockHash(
                    currentBlock.getIndex(),
                    currentBlock.getPreviousHash(),
                    currentBlock.getTimestamp(),
                    currentBlock.getNonce(),
                    currentBlock.getMerkleRoot()
            );

            if (!currentBlock.getHash().equals(calculatedHash)) {
                return false;
            }

            if (!previousBlock.getHash().equals(currentBlock.getPreviousHash())) {
                return false;
            }
        }

        return true;
    }

    private void createGenesisBlock() {
        Transaction genesis = new Transaction(
                transactionId("GENESIS", SYSTEM_ISSUER, SYSTEM_ISSUER),
                "GENESIS",
                SYSTEM_ISSUER,
                SYSTEM_ISSUER,
                Instant.now()
        );

        appendBlock(List.of(genesis));
    }

    private void appendBlock(List<Transaction> transactions) {
        String previousHash = chain.isEmpty() ? GENESIS_PREVIOUS_HASH : chain.get(chain.size() - 1).getHash();
        int index = chain.size();
        Instant now = Instant.now();
        String merkleRoot = merkleRoot(transactions);

        long nonce = 0;
        String hash;
        String targetPrefix = "0".repeat(difficulty);
        do {
            hash = calculateBlockHash(index, previousHash, now, nonce, merkleRoot);
            nonce++;
        } while (!hash.startsWith(targetPrefix));

        Block block = new Block(
                index,
                previousHash,
                hash,
                merkleRoot,
                nonce - 1,
                now,
                transactions
        );

        chain.add(block);
    }

    private String normalizeAadhaar(String aadhaarNumber) {
        String normalized = aadhaarNumber == null ? "" : aadhaarNumber.trim();
        if (!normalized.matches(AADHAAR_REGEX)) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "Aadhaar number must be exactly 12 digits.");
        }
        return normalized;
    }

    private String normalizeVehicleNumber(String vehicleRegistrationNumber) {
        String normalized = vehicleRegistrationNumber == null
                ? ""
                : vehicleRegistrationNumber.replaceAll("[^A-Za-z0-9]", "").toUpperCase();

        if (!normalized.matches(VEHICLE_REGEX)) {
            throw new ApiException(
                    HttpStatus.BAD_REQUEST,
                    "Invalid vehicle registration number. Example: KA01AB1234"
            );
        }

        return normalized;
    }

    private void ensureUserExists(String aadhaarNumber) {
        if (!registeredAadhaars.contains(aadhaarNumber)) {
            throw new ApiException(HttpStatus.NOT_FOUND, "Aadhaar is not registered.");
        }
    }

    private String transactionId(String vehicleRegistrationNumber, String fromAadhaar, String toAadhaar) {
        return sha256(vehicleRegistrationNumber + fromAadhaar + toAadhaar + Instant.now().toEpochMilli());
    }

    private String calculateBlockHash(int index, String previousHash, Instant timestamp, long nonce, String merkleRoot) {
        return sha256(index + previousHash + timestamp + nonce + merkleRoot);
    }

    private String merkleRoot(List<Transaction> transactions) {
        if (transactions.isEmpty()) {
            return sha256("EMPTY");
        }

        List<String> layer = transactions.stream().map(Transaction::getTransactionId).toList();
        List<String> currentLayer = new ArrayList<>(layer);

        while (currentLayer.size() > 1) {
            List<String> nextLayer = new ArrayList<>();

            for (int i = 0; i < currentLayer.size(); i += 2) {
                String left = currentLayer.get(i);
                String right = (i + 1 < currentLayer.size()) ? currentLayer.get(i + 1) : left;
                nextLayer.add(sha256(left + right));
            }

            currentLayer = nextLayer;
        }

        return currentLayer.get(0);
    }

    private String sha256(String value) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hashBytes = digest.digest(value.getBytes(StandardCharsets.UTF_8));
            return HexFormat.of().formatHex(hashBytes);
        } catch (Exception exception) {
            throw new ApiException(HttpStatus.INTERNAL_SERVER_ERROR, "Could not hash blockchain payload.");
        }
    }
}
