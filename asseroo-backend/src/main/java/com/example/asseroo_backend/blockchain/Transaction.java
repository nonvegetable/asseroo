package com.example.asseroo_backend.blockchain;
import com.example.asseroo_backend.blockchain.utility.StringUtil;

import java.security.*;
import java.util.ArrayList;

public class Transaction{
    public String transactionId;
    public PublicKey sender;
    public PublicKey reciepient;
    public float value;
    public byte[] signature;


    public ArrayList<TransactionInput> inputs = new ArrayList<TransactionInput>();
    public ArrayList<TransactionOutput> outputs = new ArrayList<TransactionOutput>();

    public static int sequence = 0;

    public Transaction(PublicKey from, PublicKey to, float value, ArrayList<TransactionInput> inputs){
        this.from = from;
        this.to = to;
        this.value = value;
        this.inputs = inputs;
    }

    private String calulateHash() {
    sequence++;
    return StringUtil.applySha256(
        StringUtil.getStringFromKey(sender) +
        StringUtil.getStringFromKey(reciepient) +
        Float.toString(value) + sequence
        );
    }

    public void generateSignature(PrivateKey privateKey) {
	String data = StringUtil.getStringFromKey(sender) + StringUtil.getStringFromKey(reciepient) + Float.toString(value)	;
	signature = StringUtil.applyECDSASig(privateKey,data);		
    }

    //Verifies the data we signed hasnt been tampered with
    public boolean verifiySignature() {
        String data = StringUtil.getStringFromKey(sender) + StringUtil.getStringFromKey(reciepient) + Float.toString(value)	;
        return StringUtil.verifyECDSASig(sender, data, signature);
    }

    public boolean processTransaction(){
        if(verifiySignature() == false){
            return false;
        }

        for(TransactionInput i : inputs){
            i.UTXO = AsserooChain.UTXO.get(i.transactionOutputId);
        }

        if(getInputs() < AsserooChain.minimumTransaction){
            System.out.println("#Transaction input is too small" + getInputsValue());
            return false;
        }

        float leftOver = getInputsValue() - value;
        transactionId = calculatedHash();

        outputs.add();
        outputs.add()
    }
}