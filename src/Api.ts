const BASE_URL = `https://api.coinpaprika.com/v1`;

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
  const endDate = Math.floor(Date.now() / 1000);
  const startDate = endDate - 60 * 60 * 24 * 7 * 4;
  const response = await fetch(
    `${BASE_URL}/coins/${coinId}/ohlcv/historical?start=${startDate}&end=${endDate}`
  );
  return await response.json();
};
