import { Connection, PublicKey } from "@solana/web3.js";
import { OBLIGATION_SIZE, parseObligation } from "@solendprotocol/solend-sdk";
import { parseObligationDos } from "./obligationParser";
import { LENDING_MARKET_PID, SOLEND_PID, RPC_URL } from "./consts";
import { getReserveData } from "./getReservesInfo";
import { formatObligationData } from "./formatObligationData";
import fs from "fs";

const writeArrayToJson = async (arr: any[], fileName: string) => {
  const jsonContent = JSON.stringify(arr);
  fs.writeFile(fileName, jsonContent, "utf8", function (err: any) {
    if (err) {
      console.log("An error occured while writing JSON Object to File.");
      return console.log(err);
    }
    console.log("JSON file has been saved.");
  });
};

export const getObligations = async (connection: Connection) => {
  const resp = await connection.getProgramAccounts(new PublicKey(SOLEND_PID), {
    commitment: connection.commitment,
    filters: [
      {
        memcmp: {
          offset: 10,
          bytes: LENDING_MARKET_PID,
        },
      },
      {
        dataSize: OBLIGATION_SIZE,
      },
    ],
    encoding: "base64",
  });
  console.log("fetched raw obligations");
  console.log("parsing obligations");
  return resp.map((account) =>
    parseObligationDos(parseObligation(account.pubkey, account.account))
  );
};

const run = async () => {
  const connection = new Connection(RPC_URL);

  console.log("fetching obligations...");

  const obligations = await getObligations(connection);

  console.log(`received ${obligations.length} obligations`);

  console.log("filtering obligations...");
  //filtering for accounts with  stSOL deposits
  const stSolObligations = obligations.filter(
    (obligation) => obligation != null
  );
  console.log(`have ${stSolObligations.length} filtered obligations`);

  console.log("fetching reserve info...");
  const reserveInfo = await getReserveData();
  console.log("reserve info fetched");

  console.log("formatting obligations...");
  const formattedObligations = formatObligationData(
    stSolObligations,
    reserveInfo
  );
  console.log(`${formattedObligations.length} rows formatted`);

  writeArrayToJson(formattedObligations, "finale_obligations.json");
};

run();
