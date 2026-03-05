package com.example.asseroo_backend.controllers;

import com.example.asseroo_backend.blockchain.Block;
import com.example.asseroo_backend.blockchain.AsserooChain;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/blockchain")
public class BlockchainController{

    private final AsserooChain chain;

    @GetMapping("/chain")
    public static List<Block> getChain(){
        return AsserooChain.chain;
    }

    @PostMapping("/add")
    public String addBlock(@RequestBody String data){
        Block previousBlock = AsserooChain.chain.get(AsserooChain.chain.size() - 1);

        Block newBlock = new Block(data, previousBlock.getHash(), "Sender", "Receiver");

        AsserooChain.chain.add(newBlock);

        return "Block added successfully";
    }

    @GetMapping("/block")
    public static Block getBlock(){
        return AsserooChain.chain.get(AsserooChain.chain.size());
    }
}
