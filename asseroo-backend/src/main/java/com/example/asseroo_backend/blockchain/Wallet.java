package com.example.asseroo_backend.blockchain;

import com.example.asseroo_backend.blockchain.utility.StringUtil;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.security.spec.ECGenParameterSpec;
import java.security.*;

public class Wallet{
    public PrivateKey privateKey;
    public PublicKey publicKey;

    public Wallet(){
        generateKeyPair();
    }


    public void generateKeyPair(){
        try {
        KeyPairGenerator keyGen = KeyPairGenerator.getInstance("ECDSA","BC");
        SecureRandom random = SecureRandom.getInstance("SHA1PRNG");
        ECGenParameterSpec ecSpec = new ECGenParameterSpec("prime192v1");
 
        keyGen.initialize(ecSpec, random); 
            KeyPair keyPair = keyGen.generateKeyPair();
            
            privateKey = keyPair.getPrivate();
            publicKey = keyPair.getPublic();
		}catch(Exception e) {
			throw new RuntimeException(e);
		}
    }

    public float getBalance(){
        float total = 0;

        for(Map.Entry<String, TransactionOutput> item : AsserooChain.UTXOs.entrySet()){
            TransactionOutput utxo = item.getValue();

            if(utxo.isMine(publicKey)){
                total += utxo.value;
            }
        }

        return total;
    }

    public Transaction sendFunds(PublicKey _recipient, float value){
        if(getBalance() < value){
            System.out.println("There are not enough funds to transact");
            return null;
        }

        ArrayList<TransactionInput> inputs = new ArrayList<>();

        float total = 0;

        for (Map.Entry<String, TransactionOutput> item: AsserooChain.UTXOs.entrySet()){
            TransactionOutput UTXO = item.getValue();
            if(UTXO.isMine(publicKey)){
                total += UTXO.value;
            }
        }
		
		Transaction newTransaction = new Transaction(publicKey, _recipient , value, inputs);
		newTransaction.generateSignature(privateKey);
		
		for(TransactionInput input: inputs){
			AsserooChain.UTXOs.remove(input.transactionOutputId);
		}
		return newTransaction;

    }
}