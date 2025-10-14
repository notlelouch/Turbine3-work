import { Keypair, PublicKey, Connection, Commitment } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount, mintTo } from '@solana/spl-token';
import wallet from "./Turbine3-wallet.json"
import bs58 from "bs58";
import { publicKey } from "@metaplex-foundation/umi";

// Import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(bs58.decode(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

const token_decimals = 1_000_000n;

// Mint address
// const mint = new PublicKey("<mint address>");

const mint = new PublicKey("8LFZSdEr1AbBKesg5e1G7LhJntyzx8wG2KfGCTbkrsg4");

(async () => {
  try {
    // Create an ATA
    const ata = await getOrCreateAssociatedTokenAccount(connection, keypair, mint, keypair.publicKey);
    console.log(`Your ata is: ${ata.address.toBase58()}`);

    // Mint to ATA
    const mintTx = await mintTo(connection, keypair, mint, ata.address, keypair.publicKey, 2938485);
    console.log(`Your mint txid: ${mintTx}`);
  } catch (error) {
    console.log(`Oops, something went wrong: ${error}`)
  }
})()
