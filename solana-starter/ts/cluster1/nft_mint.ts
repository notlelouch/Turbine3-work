import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createSignerFromKeypair, signerIdentity, generateSigner, percentAmount } from "@metaplex-foundation/umi"
import { createNft, mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata";

import wallet from "./Turbine3-wallet.json"
import base58 from "bs58";

const RPC_ENDPOINT = "https://api.devnet.solana.com";
const umi = createUmi(RPC_ENDPOINT);

let keypair = umi.eddsa.createKeypairFromSecretKey(base58.decode(wallet));
const myKeypairSigner = createSignerFromKeypair(umi, keypair);
umi.use(signerIdentity(myKeypairSigner));
umi.use(mplTokenMetadata())

const mint = generateSigner(umi);

(async () => {
    try {
        // Create NFT with metadata URI
        let tx = createNft(umi, {
            mint,
            authority: myKeypairSigner,
            name: "Generug v2",
            symbol: "GENRUG",
            uri: "https://gateway.irys.xyz/GZT96q4Cm7ETAF94xdXF47mra5cWP1GG2ayUMzifJskd",
            sellerFeeBasisPoints: percentAmount(5.5),
        });

        let result = await tx.sendAndConfirm(umi);
        const signature = base58.encode(result.signature);
        
        console.log(`Successfully Minted! Check out your TX here:\nhttps://explorer.solana.com/tx/${signature}?cluster=devnet`);
        console.log("Mint Address: ", mint.publicKey);
    } catch (error) {
        console.log("Oops.. Something went wrong", error);
    }
})();