const BASE_URL = `https://api.coinpaprika.com/v1`;

export const fetchData = () => {
  return fetch(`${BASE_URL}/coins`).then(
    response => response.json()
  );
}

export const infoData = (coinId ?: string) => {
  return fetch(`${BASE_URL}/coins/${coinId}`).then(
    response => response.json()
  );
}

export const priceData = (coinId ?: string) => {
  return fetch(`${BASE_URL}/tickers/${coinId}`).then(
    response => response.json()
  );
}