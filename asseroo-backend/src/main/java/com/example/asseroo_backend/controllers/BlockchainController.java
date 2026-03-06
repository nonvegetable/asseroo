package com.example.asseroo_backend.controllers;

import com.example.asseroo_backend.blockchain.Block;
import com.example.asseroo_backend.blockchain.AsserooChain;
import com.example.asseroo_backend.blockchain.TransactionOutput;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/blockchain")
public class BlockchainController{

    @GetMapping("/chain")
    public static List<Block> getChain(){
        return AsserooChain.chain;
    }

    @PostMapping("/add")
    public String addBlock(@RequestBody String data){
        Block previousBlock = AsserooChain.chain.get(AsserooChain.chain.size() - 1);

        Block newBlock = new Block(data, previousBlock.hash, "Sender", "Receiver");

        AsserooChain.chain.add(newBlock);

        return "Block added successfully";
    }

    @GetMapping("/block")
    public static Block getBlock(){
        return AsserooChain.chain.get(AsserooChain.chain.size() - 1);
    }
}
