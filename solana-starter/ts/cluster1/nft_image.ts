import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createGenericFile, createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi"
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys"
import { readFile } from "fs/promises"
import bs58 from "bs58";
import wallet from "./Turbine3-wallet.json"

// Create a devnet connection
const umi = createUmi('https://api.devnet.solana.com');

// Import our keypair from the wallet file
const keypair = umi.eddsa.createKeypairFromSecretKey(bs58.decode(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(irysUploader({ address: "https://devnet.irys.xyz/" }));
umi.use(signerIdentity(signer));

(async () => {
  try {
    //1. Load image
    //2. Convert image to generic file.
    //3. Upload image

    const image = await readFile("/Users/aryan/Work/Practice/Turbine3/class-work/solana-starter/ts/cluster1/Generug v2.png");

    const file = createGenericFile(image, "Generug v2.png", { contentType: "image/png" });

    const [myUri] = await umi.uploader.upload([file]);
    console.log("Your image URI: ", myUri);
  }
  catch (error) {
    console.log("Oops.. Something went wrong", error);
  }
})();
