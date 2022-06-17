const BASE_URL = `https://api.coinpaprika.com/v1`;
const BASE_URL2 = "https://ohlcv-api.nomadcoders.workers.dev";

export const fetchData = async () => {
  const response = await fetch(`${BASE_URL}/coins`);
  return await response.json();
};

export const infoData = async (coinId?: string) => {
  const response = await fetch(`${BASE_URL}/coins/${coinId}`);
  return await response.json();
};

export const priceData = async (coinId?: string) => {
  const response = await fetch(`${BASE_URL}/tickers/${coinId}`);
  return await response.json();
};

export const priceHistory = async (coinId?: string) => {
  const response = await fetch(`${BASE_URL}/coins/${coinId}`);
  return await response.json();
};

export const fetchCoinHistory = async (coinId?: string) => {
  const response = await fetch(`${BASE_URL2}?coinId=${coinId}`);
  return await response.json();
};
