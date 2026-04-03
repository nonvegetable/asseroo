package com.example.asseroo_backend.blockchain;

import java.time.Instant;

public class Transaction {
    private final String transactionId;
    private final String vehicleRegistrationNumber;
    private final String fromAadhaar;
    private final String toAadhaar;
    private final Instant timestamp;

    public Transaction(
            String transactionId,
            String vehicleRegistrationNumber,
            String fromAadhaar,
            String toAadhaar,
            Instant timestamp
    ) {
        this.transactionId = transactionId;
        this.vehicleRegistrationNumber = vehicleRegistrationNumber;
        this.fromAadhaar = fromAadhaar;
        this.toAadhaar = toAadhaar;
        this.timestamp = timestamp;
    }

    public String getTransactionId() {
        return transactionId;
    }

    public String getVehicleRegistrationNumber() {
        return vehicleRegistrationNumber;
    }

    public String getFromAadhaar() {
        return fromAadhaar;
    }

    public String getToAadhaar() {
        return toAadhaar;
    }

    public Instant getTimestamp() {
        return timestamp;
    }
}