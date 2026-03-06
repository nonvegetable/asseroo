package com.example.asseroo_backend.blockchain;

import java.security.PublicKey;
import com.example.asseroo_backend.blockchain.utility.StringUtil;

public class TransactionOutput {

    public String id;
    public PublicKey recipient;
    public float value;
    public String parentTransactionId;

    public TransactionOutput(PublicKey recipient, float value, String parentTransactionId) {
        this.recipient = recipient;
        this.value = value;
        this.parentTransactionId = parentTransactionId;

        this.id = StringUtil.applySha256(
            StringUtil.getStringFromKey(recipient) +
            Float.toString(value) +
            parentTransactionId
        );
    }

    public boolean isMine(PublicKey publicKey) {
        return publicKey.equals(recipient);
    }
}