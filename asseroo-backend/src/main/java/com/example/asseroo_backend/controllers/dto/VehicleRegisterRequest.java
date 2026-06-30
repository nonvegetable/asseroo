package com.example.asseroo_backend.controllers.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public class VehicleRegisterRequest {

    @NotBlank(message = "Vehicle registration number is required")
    @Pattern(
            regexp = "^[A-Za-z]{2}[\\s-]?[0-9]{1,2}[\\s-]?[A-Za-z]{1,3}[\\s-]?[0-9]{4}$",
            message = "Vehicle registration number is invalid"
    )
    private String vehicleRegistrationNumber;

    @NotBlank(message = "Owner Aadhaar number is required")
    @Pattern(regexp = "^\\d{12}$", message = "Owner Aadhaar number must be exactly 12 digits")
    private String ownerAadhaarNumber;

    public String getVehicleRegistrationNumber() {
        return vehicleRegistrationNumber;
    }

    public void setVehicleRegistrationNumber(String vehicleRegistrationNumber) {
        this.vehicleRegistrationNumber = vehicleRegistrationNumber;
    }

    public String getOwnerAadhaarNumber() {
        return ownerAadhaarNumber;
    }

    public void setOwnerAadhaarNumber(String ownerAadhaarNumber) {
        this.ownerAadhaarNumber = ownerAadhaarNumber;
    }
}
