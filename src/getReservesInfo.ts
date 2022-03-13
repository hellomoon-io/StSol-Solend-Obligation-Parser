import fetch from "isomorphic-fetch";

const fetchReserveData = async () => {
  const url =
    "https://api.solend.fi/v1/markets/configs?ids=4UpD2fh7xH3VP9QQaXtsS1YY3bxzWhtfpks7FatyKvdY";
  const response = await fetch(url);
  const data = await response.json();
  if (data && data[0] && data[0].reserves) {
    return data;
  } else {
    console.log({ data });
    throw "Error fetching reserve data";
  }
};

const parseReserveData = (data: any) => {
  let reserves = new Map<string, any>();
  data[0].reserves.forEach((reserve: any) => {
    if (reserve.address) {
      reserves.set(reserve.address, reserve);
    }
  });
  return reserves;
};
/**
 * Gets information on solend reserves from their api
 */
export const getReserveData = async () => {
  const data = await fetchReserveData();
  return parseReserveData(data);
};

getReserveData();
