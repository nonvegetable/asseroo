package com.example.asseroo_backend.blockchain;

import com.example.asseroo_backend.blockchain.utility.StringUtil;

import java.security.*;

public class Wallet{
    public PrivateKey privatekey;
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
        for(Map.Entry<String, TransactionOutput> item : chain.UTXOs.entrySet()){
            TransactionOutput.UTXO = item.getValue();
            if(UTXO.isMine()){
                UTXOs.put(UTXO.id, UTXO);
                total += UTXO.value;
            }
        }

        return total;
    }

    public Transaction sendFunds(PublicKey _recipient, float value){
        if(getBalance < value){
            System.out.println("There are not enough funds to transact");
            return null;
        }

        ArrayList<TransactionInput> inputs = new ArrayList<>();

        float total = 0;

        for (Map.Entry<String, TransactionOutput> item: UTXOs.entrySet()){
            TransactionOutput UTXO = item.getValue();
            total += UTXO.value;
            inputs.add(new TransactionInput(UTXO.id));
            if(total > value) break;
		}
		
		Transaction newTransaction = new Transaction(publicKey, _recipient , value, inputs);
		newTransaction.generateSignature(privateKey);
		
		for(TransactionInput input: inputs){
			UTXOs.remove(input.transactionOutputId);
		}
		return newTransaction;

    }
}