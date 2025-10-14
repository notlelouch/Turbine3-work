import { Keypair, Connection, Commitment } from "@solana/web3.js";
import { createMint } from '@solana/spl-token';
import bs58 from "bs58";
import wallet from "./Turbine3-wallet.json"

// Import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(bs58.decode(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

(async () => {
  try {
    // Start here
    // const mint = ???
    const mint = await createMint(connection, keypair, keypair.publicKey, null, 6)

    console.log(`Mint Address: ${mint}`);
  } catch (error) {
    console.log(`Oops, something went wrong: ${error}`)
  }
})()

//Mint Address: 8LFZSdEr1AbBKesg5e1G7LhJntyzx8wG2KfGCTbkrsg4
