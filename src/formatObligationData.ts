/**
 * Formats obligation data to be written to csv
 * @param stSolData
 * @param reserveInfo
 * @returns
 */
export const formatObligationData = (
  stSolData: any[],
  reserveInfo: Map<string, any>
) => {
  let csvData = [];
  for (let obligation of stSolData) {
    let owner = obligation["owner"];
    for (let deposit of obligation["deposits"]) {
      let reserve_info = reserveInfo.get(deposit["depositReserve"]);
      csvData.push({
        owner: owner,
        type: "deposit",
        amount: deposit["depositedAmount"],
        reserve: deposit["depositReserve"],
        mint: reserve_info["liquidityToken"]["mint"],
        symbol: reserve_info["liquidityToken"]["symbol"],
        decimals: reserve_info["liquidityToken"]["decimals"],
        name: reserve_info["liquidityToken"]["name"],
      });
    }
    for (let borrow of obligation["borrows"]) {
      let reserve_info = reserveInfo.get(borrow["borrowReserve"]);
      csvData.push({
        owner: owner,
        type: "borrow",
        amount: borrow["borrowedAmount"],
        reserve: borrow["borrowReserve"],
        mint: reserve_info["liquidityToken"]["mint"],
        symbol: reserve_info["liquidityToken"]["symbol"],
        decimals: reserve_info["liquidityToken"]["decimals"],
        name: reserve_info["liquidityToken"]["name"],
      });
    }
  }
  return csvData;
};
