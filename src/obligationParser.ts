import {
  ObligationCollateral,
  ObligationLiquidity,
} from "@solendprotocol/solend-sdk/dist/state/obligation";
import { BN } from "bn.js";
import { ObligationInfo, STSOL_RESERVE } from "./consts";

const parseDeposits = (deposits: ObligationCollateral[]) => {
  const parsedDeposits = [];
  let containsStSolDeposit = false;
  for (let i = 0; i < deposits.length; i++) {
    const deposit = deposits[i];
    const { depositReserve } = deposit;
    const depositedAmount = deposit.depositedAmount.toString();
    const marketValue = deposit.marketValue.toString();

    // Check if this deposit is stSOL
    if (depositReserve.toString() === STSOL_RESERVE) {
      containsStSolDeposit = true;
    }

    parsedDeposits.push({
      depositReserve: depositReserve.toString(),
      depositedAmount,
      marketValue,
    });
  }
  return { parsedDeposits, containsStSolDeposit };
};

const parseBorrows = (borrows: ObligationLiquidity[]) =>
  borrows.map((borrow: ObligationLiquidity) => {
    const { borrowReserve } = borrow;
    const cumulativeBorrowRateWads = borrow.cumulativeBorrowRateWads.toString();
    //converting from Wads into something that makes sense to humans
    const borrowedAmount = borrow.borrowedAmountWads
      .div(new BN(10).pow(new BN(18)))
      .toString();
    const marketValue = borrow.marketValue.toString();
    return {
      borrowReserve: borrowReserve.toString(),
      cumulativeBorrowRateWads,
      borrowedAmount,
      marketValue,
    };
  });

export const parseObligationDos = (obligation: ObligationInfo | null) => {
  if (!obligation) return null;
  const info = obligation.info;
  const { owner } = info;
  const depositedValue = info.depositedValue.toString();
  const borrowedValue = info.borrowedValue.toString();
  const allowedBorrowValue = info.allowedBorrowValue.toString();
  const unhealthyBorrowValue = info.unhealthyBorrowValue.toString();
  const { parsedDeposits, containsStSolDeposit } = parseDeposits(info.deposits);
  const borrows = parseBorrows(info.borrows);
  // the null will be used to filter out accoutns that don't have StSol collateral
  return containsStSolDeposit
    ? {
        owner,
        depositedValue,
        borrowedValue,
        allowedBorrowValue,
        unhealthyBorrowValue,
        deposits: parsedDeposits,
        borrows,
      }
    : null;
};
