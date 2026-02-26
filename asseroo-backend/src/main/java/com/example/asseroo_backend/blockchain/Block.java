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
    private int nonce;

    public Block(String data, String previousHash, String sender, String reciever) {
        this.data = data;
        this.previousHash = previousHash;
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

    public void mineBlock(int difficulty){
        String target = new String(new char[difficulty]).replace('\0', '0');
        while(!hash.substring(0, difficulty).equals(target)){
            nonce++;
            hash = calculateHash();
        }

        System.out.println("Block mined:" + hash);
    }

}