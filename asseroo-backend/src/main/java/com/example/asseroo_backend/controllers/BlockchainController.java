package com.example.asseroo_backend.controllers;

import com.example.asseroo_backend.blockchain.Block;
import com.example.asseroo_backend.blockchain.AsserooChain;
import com.example.asseroo_backend.blockchain.Transaction;
import com.example.asseroo_backend.controllers.dto.AadhaarAuthRequest;
import com.example.asseroo_backend.controllers.dto.VehicleRegisterRequest;
import com.example.asseroo_backend.controllers.dto.VehicleTransferRequest;

import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class BlockchainController {

    private final AsserooChain asserooChain;

    public BlockchainController(AsserooChain asserooChain) {
        this.asserooChain = asserooChain;
    }

    @PostMapping("/auth/register")
    public Map<String, String> register(@Valid @RequestBody AadhaarAuthRequest request) {
        asserooChain.registerUser(request.getAadhaarNumber());
        return Map.of("message", "Aadhaar registered successfully.");
    }

    @PostMapping("/auth/login")
    public Map<String, Object> login(@Valid @RequestBody AadhaarAuthRequest request) {
        boolean authenticated = asserooChain.login(request.getAadhaarNumber());
        if (!authenticated) {
            return Map.of("authenticated", false, "message", "Aadhaar not registered.");
        }

        List<String> vehicles = asserooChain.getVehiclesByOwner(request.getAadhaarNumber());
        return Map.of(
                "authenticated", true,
                "aadhaarNumber", request.getAadhaarNumber(),
                "vehicles", vehicles
        );
    }

    @PostMapping("/vehicles/register")
    public Transaction registerVehicle(@Valid @RequestBody VehicleRegisterRequest request) {
        return asserooChain.registerVehicle(
                request.getVehicleRegistrationNumber(),
                request.getOwnerAadhaarNumber()
        );
    }

    @PostMapping("/vehicles/transfer")
    public Transaction transferVehicle(@Valid @RequestBody VehicleTransferRequest request) {
        return asserooChain.transferVehicle(
                request.getVehicleRegistrationNumber(),
                request.getFromAadhaarNumber(),
                request.getToAadhaarNumber()
        );
    }

    @GetMapping("/vehicles/{registrationNumber}/owner")
    public Map<String, String> getVehicleOwner(@PathVariable String registrationNumber) {
        String owner = asserooChain.getVehicleOwner(registrationNumber);
        return Map.of(
                "vehicleRegistrationNumber", registrationNumber,
                "ownerAadhaarNumber", owner
        );
    }

    @GetMapping("/users/{aadhaarNumber}/vehicles")
    public Map<String, Object> getVehiclesByOwner(@PathVariable String aadhaarNumber) {
        List<String> vehicles = asserooChain.getVehiclesByOwner(aadhaarNumber);
        return Map.of(
                "aadhaarNumber", aadhaarNumber,
                "vehicles", vehicles
        );
    }

    @GetMapping("/blockchain/chain")
    public List<Block> getChain() {
        return asserooChain.getChain();
    }

    @GetMapping("/blockchain/transactions")
    public List<Transaction> getTransactions() {
        return asserooChain.getTransactions();
    }

    @GetMapping("/blockchain/valid")
    public Map<String, Boolean> isChainValid() {
        return Map.of("valid", asserooChain.isChainValid());
    }
}
