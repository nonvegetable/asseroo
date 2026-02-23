package com.example.asseroo_backend.blockchain;

import org.springframework.stereotype.Component;
import jakarta.annotation.PostConstruct;

import java.util.ArrayList;

@Component
public class AsserooChain {

    public static ArrayList<Block> chain = new ArrayList<>();

    @PostConstruct
    public void init() {

        chain.add(new Block("100 coins transferred","0","System","Vighnesh"));
        chain.add(new Block("25 coins transferred", chain.get(chain.size() - 1).hash,"Vighnesh", "Satvik"));
        chain.add(new Block("100 coins transferred", chain.get(chain.size() - 1).hash,"Satvik", "Kavish"));

        System.out.println("========== BLOCKCHAIN ==========");

        for (Block block : chain) {
            System.out.println("Hash: " + block.hash);
            System.out.println("Previous: " + block.previousHash);
            System.out.println("--------------------------------");
        }
    }
}
