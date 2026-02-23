package com.example.asseroo_backend.blockchain;
import com.example.asseroo_backend.blockchain.utility.StringUtil;
import java.util.Date;

public class Block{
    public String hash;
    public String previousHash;
    private String sender;
    private String reciever;
    private long timeStamp;
    private String data;

    public Block(String data, String previousHash, String sender, String reciever) {
        this.data = data;
        this.previousHash = previousHash;
        this.sender = sender;
        this.reciever = reciever;
        this.timeStamp = new Date().getTime();
        this.hash = calculateHash();
	}

    public String calculateHash() {
        String calculatedhash = StringUtil.applySha256( 
                previousHash +
                Long.toString(timeStamp) +
                data 
                );
        return calculatedhash;
    }

}