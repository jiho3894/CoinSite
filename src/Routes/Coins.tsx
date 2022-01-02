import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchData } from "../Api";
import { Helmet } from "react-helmet";
import { EffectCallback, useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atoms";

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
  list-style: none;
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

const Coin = styled.li`
  background-color: ${(props) => props.theme.cardBgColor};
  color: ${(props) => props.theme.textColor};
  border-radius: 15px;
  border: 1px solid ${(props) => props.theme.textColor};
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

const ToggleBtnContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ToggleBtn = styled.button`
  background-color: ${(props) => props.theme.textColor};
  color: ${(props) => props.theme.bgColor};
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
  const isDark = useRecoilValue(isDarkAtom);
  const setDark = useSetRecoilState(isDarkAtom);
  const setToggle = () => setDark((prev) => !prev);
  const { isLoading, data } = useQuery<CoinInterface[]>("allCoin", fetchData);
  const [counter, setCounter] = useState(50);
  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight) {
      setCounter(counter + 200);
    }
  };
  useEffect((): ReturnType<EffectCallback> => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });
  return (
    <Container>
      <Helmet>
        <title>나락의 지름길</title>
      </Helmet>
      <Link to="/">
        <ToggleBtnContainer>
          <ToggleBtn onClick={setToggle}>
            {isDark ? "라이트 모드" : "다크 모드"}
          </ToggleBtn>
        </ToggleBtnContainer>
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
        </CoinList>
      )}
    </Container>
  );
};

export default Coins;
