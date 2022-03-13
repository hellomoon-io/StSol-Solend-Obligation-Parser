import { PublicKey } from "@solana/web3.js";
import { Obligation } from "@solendprotocol/solend-sdk/dist/state/obligation";

export type ObligationInfo = {
  pubkey: PublicKey;
  account: {
    executable: boolean;
    owner: PublicKey;
    lamports: number;
    data: Buffer;
    rentEpoch?: number | undefined;
  };
  info: Obligation;
};

export const LENDING_MARKET_PID =
  "4UpD2fh7xH3VP9QQaXtsS1YY3bxzWhtfpks7FatyKvdY";

export const SOLEND_PID = "So1endDq2YkqhipRh3WViPa8hdiSpxWy6z3Z6tMCpAo";

export const STSOL_RESERVE = "5sjkv6HD8wycocJ4tC4U36HHbvgcXYqcyiPRUkncnwWs";

export const RPC_URL = "YOUR RPC URL";
