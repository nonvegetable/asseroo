package com.example.asseroo_backend.blockchain;

import com.example.asseroo_backend.blockchain.utility.StringUtil;

import org.springframework.stereotype.Component;
import jakarta.annotation.PostConstruct;

import java.util.ArrayList;
import java.security.Security;
import java.util.Base64;

@Component
public class AsserooChain {

    public static ArrayList<Block> chain = new ArrayList<>();
    public static HashMap<String,TransactionOutputs> UTXOs = new HashMap<String,TransactionOutputs>();
    private int difficulty = 5;
    public static Wallet walletA;
    public static Wallet walletB;

    @PostConstruct
    public void init() {

        Security.addProvider(new org.bouncycastle.jce.provider.BouncyCastleProvider()); 

        walletA = new Wallet();
        walletB = new Wallet();

        System.out.println("Private and public keys:");
		System.out.println(StringUtil.getStringFromKey(walletA.privateKey));
		System.out.println(StringUtil.getStringFromKey(walletA.publicKey));
		//Create a test transaction from WalletA to walletB 
		Transaction transaction = new Transaction(walletA.publicKey, walletB.publicKey, 5, null);
		transaction.generateSignature(walletA.privateKey);
		//Verify the signature works and verify it from the public key
		System.out.println("Is signature verified");
		System.out.println(transaction.verifiySignature());

        chain.add(new Block("100 coins transferred","0","System","Vighnesh"));
        chain.add(new Block("25 coins transferred", chain.get(chain.size() - 1).hash,"Vighnesh", "Satvik"));
        chain.add(new Block("100 coins transferred", chain.get(chain.size() - 1).hash,"Satvik", "Kavish"));

        System.out.println("========== BLOCKCHAIN ==========");
        chain.forEach(block -> {
            System.out.println("Hash: " + block.hash);
            System.out.println("Previous: " + block.previousHash);
            System.out.println("--------------------------------");
        });

        System.out.println("Is chain valid? " + isChainValid());
    }

    public boolean isChainValid() {

        Block currentBlock;
        Block previousBlock;

        for(int i = 1; i < chain.size(); i++) {

            currentBlock = chain.get(i);
            previousBlock = chain.get(i - 1);

            if(!currentBlock.hash.equals(currentBlock.calculateHash())) {
                System.out.println("Current Hashes not equal");
                return false;
            }

            if(!previousBlock.hash.equals(currentBlock.previousHash)) {
                System.out.println("Previous Hashes not equal");
                return false;
            }
        }

        return true;
    }
}
