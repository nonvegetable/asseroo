package com.example.asseroo_backend.blockchain;

import org.springframework.stereotype.Component;
import jakarta.annotation.PostConstruct;

import java.util.ArrayList;

@Component
public class AsserooChain {

    public static ArrayList<Block> chain = new ArrayList<>();
    private int difficulty = 5;

    @PostConstruct
    public void init() {

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
