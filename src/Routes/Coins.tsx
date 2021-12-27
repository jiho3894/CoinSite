import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchData } from "../Api";
import { Helmet } from "react-helmet";
import { useState } from "react";
import { Button } from "react-bootstrap";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
  @media screen and (max-width: 769px) {
    max-width: 100%;
    padding: 0px;
  }
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  @media screen and (max-width: 769px) {
    font-size: 25px;
  }
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const CoinList = styled.ul`
  margin-right: 2rem;
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

const Coin = styled.li`
  background-color: white;
  color: ${(props) => props.theme.bgColor};
  border-radius: 15px;
  margin-bottom: 10px;
  a {
    padding: 20px;
    transition: color 0.2s ease-in;
    display: flex;
    align-items: center;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

interface CoinInterface {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

const Coins = () => {
  const { isLoading, data } = useQuery<CoinInterface[]>("allCoin", fetchData);
  /* const [coins, setCoins] = useState<CoinInterface[]>([]);
  const [loading, setLoding] = useState(true);
  useEffect(() => {
    (async () => {
      const response = await fetch("https://api.coinpaprika.com/v1/coins");
      const json = await response.json();
      setCoins(json.slice(0, 10));
      setLoding(false);
    })();
  }, []);
  console.log(coins); */
  const [counter, setCounter] = useState(30);
  const onClick = () => {
    setCounter(counter + 30);
  };
  return (
    <Container>
      <Helmet>
        <title>나락의 지름길</title>
      </Helmet>
      <Link to="/">
        <Title>나락 지름길 리스트</Title>
      </Link>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinList>
          {data?.slice(0, counter).map((coin) => (
            <Coin>
              <Link to={`/${coin.id}`} state={{ name: coin.name }}>
                <Img
                  alt=""
                  src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLocaleLowerCase()}`}
                />
                {coin.id} &rarr;
              </Link>
            </Coin>
          ))}
          <div className="d-grid gap-2" onClick={onClick}>
            <Button variant="secondary" size="lg">
              Add List View
            </Button>
          </div>
        </CoinList>
      )}
    </Container>
  );
};
export default Coins;
