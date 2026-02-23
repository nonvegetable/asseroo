package com.example.asseroo_backend.blockchain;
import java.util.ArrayList;
import com.google.gson.GsonBuilder;

public class AsserooChain {

	public static ArrayList<Block> chain = new ArrayList<Block>();

	public static void main(String[] args) {
		
		chain.add(new Block("100 coins transferred","0","System","Vighnesh"));
		// System.out.println("Hash for block 1 : " + genesisBlock.hash);
		
		chain.add(new Block("25 coins transferred", chain.get(chain.size() - 1).hash,"Vighnesh", "Satvik"));
		// System.out.println("Hash for block 2 : " + secondBlock.hash);
		
		chain.add(new Block("100 coins transferred", chain.get(chain.size() - 1).hash,"Satvik", "Kavish"));
		// System.out.println("Hash for block 3 : " + thirdBlock.hash);

		String chainJson = new GsonBuilder().setPrettyPrinting().create().toJson(chain);		
		System.out.println(chainJson);

		
	}


	public static Boolean isValid(){
		Block currentBlock;
		Block previousBlock;

		for(int i = 1; i < chain.size(); i++){
			currentBlock = chain.get(i);
			previousBlock = chain.get(i - 1);

			// if(currentBlock.previousHash != previousBlock.previousHash){
			// 	return false;
			// }

			if(!currentBlock.hash.equals(currentBlock.calculateHash())){
				System.out.println("Current Hashes not equal");	
				return false;
			}

			if(!previousBlock.hash.equals(currentBlock.previousHash)){
				System.out.println("Previous Hashes not equal");	
				return false;
			}
		}

		return true;
	}
}