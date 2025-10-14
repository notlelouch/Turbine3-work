import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createGenericFile, createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi"
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys"
import bs58 from "bs58";
import wallet from "./Turbine3-wallet.json"

// Create a devnet connection
const umi = createUmi('https://api.devnet.solana.com');

const keypair = umi.eddsa.createKeypairFromSecretKey(bs58.decode(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(irysUploader({ address: "https://devnet.irys.xyz/" }));
umi.use(signerIdentity(signer));

(async () => {
    try {
        // Follow this JSON structure
        // https://docs.metaplex.com/programs/token-metadata/changelog/v1.0#json-structure
        // Your image URI:  https://gateway.irys.xyz/B8KUcnmfXgRyZCTCEesgcEQLPXyNx4wLn68ExJg3oVms
        const imageUri = "https://gateway.irys.xyz/B8KUcnmfXgRyZCTCEesgcEQLPXyNx4wLn68ExJg3oVms";
        
        const metadata = {
            name: "Generug v2",
            symbol: "GENRUG",
            description: "A unique NFT featuring the Generug v2 design",
            image: imageUri,
            attributes: [
                {trait_type: 'Version', value: 'v2'},
                {trait_type: 'Type', value: 'Generug'}
            ],
            properties: {
                files: [
                    {
                        type: "image/png",
                        uri: imageUri
                    },
                ]
            },
            creators: []
        };
        
        const myUri = await umi.uploader.uploadJson(metadata);
        console.log("Your metadata URI: ", myUri);
    }
    catch(error) {
        console.log("Oops.. Something went wrong", error);
    }
})();
