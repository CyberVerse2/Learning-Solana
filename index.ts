import { Keypair, PublicKey } from '@solana/web3.js';
import { config } from 'dotenv';
config();
import { getDomainKeySync, NameRegistryState } from '@bonfida/spl-name-service';
import { getKeypairFromEnvironment } from '@solana-developers/helpers';
import { Connection, clusterApiUrl, LAMPORTS_PER_SOL } from '@solana/web3.js';

// lesson 1

// const keypair = Keypair.generate();
// const keypair = getKeypairFromEnvironment('SECRET_KEY');

// console.log(`The public key is: ${keypair.publicKey.toBase58()}`);
// console.log(`The secret key is: ${keypair.secretKey}`);

// lesson 2
// Reading from the Solana Blockchain
// const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
const connection = new Connection('https://api.mainnet-beta.solana.com', 'confirmed');

console.log('✅ Connected to the devnet cluster');
// const address = new PublicKey('GQBsSLhgahJwY4Y591o32wXQVSQUgbSkqzLsAvPxQEZ9');
const { pubkey } = getDomainKeySync('shaq.sol');
const owner = await NameRegistryState.retrieve(connection, pubkey);
console.log(`The owner of the sns domain 'shaq.sol' is ${owner.registry.owner}`);
const address = new PublicKey(pubkey);
const balance = await connection.getBalance(address);
const balanceInSol = balance / LAMPORTS_PER_SOL;
console.log(`The balance of the account at ${address} is ${balanceInSol} SOL`);
