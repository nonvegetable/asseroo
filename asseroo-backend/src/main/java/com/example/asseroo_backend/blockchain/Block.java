package com.example.asseroo_backend.blockchain;

import com.example.asseroo_backend.blockchain.utility.StringUtil;

import java.util.Date;
import java.util.ArrayList;

public class Block{
    public String hash;
    public String previousHash;
    private String sender;
    private String reciepient;
    private long timeStamp;
    private String data;
    private int nonce;

    private String merkleRoot;
    private ArrayList<Transaction> transactions = new ArrayList<>();

    public Block(String data, String previousHash, String sender, String reciepient) {

        this.previousHash = previousHash;
        this.timeStamp = new Date().getTime();
        this.hash = calculateHash();
	}

	public String calculateHash() {
		String calculatedhash = StringUtil.applySha256( 
				previousHash +
				Long.toString(timeStamp) +
				Integer.toString(nonce) + 
				merkleRoot
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

    public boolean addTransaction(Transaction transaction){
        if(transaction == null) return false;

        if(previousHash != "0"){
            if(transaction.processTransaction() != true){
                System.out.println("Transaction not processed");
                return false;
            }

            transactions.add(transaction);
            System.out.println("Transaction not processed");

            return true;
        }

        return true;
    }
}