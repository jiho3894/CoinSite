const BASE_URL = `https://api.coinpaprika.com/v1`;

export const fetchData = () => {
  return fetch(`${BASE_URL}/coins`).then((response) => response.json());
};

export const infoData = (coinId?: string) => {
  return fetch(`${BASE_URL}/coins/${coinId}`).then((response) =>
    response.json()
  );
};

export const priceData = (coinId?: string) => {
  return fetch(`${BASE_URL}/tickers/${coinId}`).then((response) =>
    response.json()
  );
};

export const priceHistory = (coinId?: string) => {
  return fetch(`${BASE_URL}/coins/${coinId}`).then((response) =>
    response.json()
  );
};

export const fetchCoinHistory = (coinId?: string) => {
  const endDate = Math.floor(Date.now() / 1000);
  const startDate = endDate - 60 * 60 * 24 * 7;
  return fetch(
    `${BASE_URL}/coins/${coinId}/ohlcv/historical?start=${startDate}&end=${endDate}`
  ).then((response) => response.json());
};
