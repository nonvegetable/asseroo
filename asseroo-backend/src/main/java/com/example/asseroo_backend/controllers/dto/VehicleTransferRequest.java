package com.example.asseroo_backend.controllers.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public class VehicleTransferRequest {

    @NotBlank(message = "Vehicle registration number is required")
    @Pattern(
            regexp = "^[A-Za-z]{2}[\\s-]?[0-9]{1,2}[\\s-]?[A-Za-z]{1,3}[\\s-]?[0-9]{4}$",
            message = "Vehicle registration number is invalid"
    )
    private String vehicleRegistrationNumber;

    @NotBlank(message = "Sender Aadhaar number is required")
    @Pattern(regexp = "^\\d{12}$", message = "Sender Aadhaar number must be exactly 12 digits")
    private String fromAadhaarNumber;

    @NotBlank(message = "Recipient Aadhaar number is required")
    @Pattern(regexp = "^\\d{12}$", message = "Recipient Aadhaar number must be exactly 12 digits")
    private String toAadhaarNumber;

    public String getVehicleRegistrationNumber() {
        return vehicleRegistrationNumber;
    }

    public void setVehicleRegistrationNumber(String vehicleRegistrationNumber) {
        this.vehicleRegistrationNumber = vehicleRegistrationNumber;
    }

    public String getFromAadhaarNumber() {
        return fromAadhaarNumber;
    }

    public void setFromAadhaarNumber(String fromAadhaarNumber) {
        this.fromAadhaarNumber = fromAadhaarNumber;
    }

    public String getToAadhaarNumber() {
        return toAadhaarNumber;
    }

    public void setToAadhaarNumber(String toAadhaarNumber) {
        this.toAadhaarNumber = toAadhaarNumber;
    }
}
