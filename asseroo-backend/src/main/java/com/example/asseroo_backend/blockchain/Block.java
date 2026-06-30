package com.example.asseroo_backend.blockchain;

import java.time.Instant;
import java.util.List;

public class Block {
    private final int index;
    private final String previousHash;
    private final String hash;
    private final String merkleRoot;
    private final long nonce;
    private final Instant timestamp;
    private final List<Transaction> transactions;

    public Block(
            int index,
            String previousHash,
            String hash,
            String merkleRoot,
            long nonce,
            Instant timestamp,
            List<Transaction> transactions
    ) {
        this.index = index;
        this.previousHash = previousHash;
        this.hash = hash;
        this.merkleRoot = merkleRoot;
        this.nonce = nonce;
        this.timestamp = timestamp;
        this.transactions = List.copyOf(transactions);
    }

    public int getIndex() {
        return index;
    }

    public String getPreviousHash() {
        return previousHash;
    }

    public String getHash() {
        return hash;
    }

    public String getMerkleRoot() {
        return merkleRoot;
    }

    public long getNonce() {
        return nonce;
    }

    public Instant getTimestamp() {
        return timestamp;
    }

    public List<Transaction> getTransactions() {
        return transactions;
    }
}