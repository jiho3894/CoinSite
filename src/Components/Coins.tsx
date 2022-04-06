import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchData } from "../Api";
import { Helmet } from "react-helmet";
import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 1200px;
  margin: 0 auto;
  @media screen and (max-width: 769px) {
    max-width: 100%;
    padding: 0px;
  }
`;

const Title = styled.h1`
  font-size: 50px;
  color: ${(props) => props.theme.accentColor};
  height: 230px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  @media screen and (max-width: 769px) {
    font-size: 25px;
    height: 180px;
  }
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const CoinList = styled(motion.ul)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  list-style: none;
  @media screen and (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: 769px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

const Coin = styled(motion.li)`
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
    background-color: ${(props) => props.theme.textColor};
    font-weight: 600;
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Top = styled.div`
  position: fixed;
  right: 30px;
  bottom: 30px;
  width: 60px;
  height: 60px;
  border-radius: 100%;
  font-weight: 700;
  background-color: ${(props) => props.theme.bgColor};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  color: ${(props) => props.theme.accentColor};
  cursor: pointer;
  @media screen and (max-width: 769px) {
    width: 40px;
    height: 40px;
    font-size: 12px;
  }
  &:hover {
    svg {
      transform: translateY(-5px);
      transition: all 0.1s;
    }
  }
`;

export interface CoinChart {
  coinId?: string;
}

interface CoinInterface {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

const container = {
  visible: {
    transition: {
      delayChildren: 0.05,
      staggerChildren: 0.05,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const Coins = () => {
  const { isLoading, data } = useQuery<CoinInterface[]>("allCoin", fetchData);
  const [counter, setCounter] = useState(50);
  const handleScroll = useCallback(() => {
    const { innerHeight } = window;
    const { scrollHeight } = document.body;
    const { scrollTop } = document.documentElement;
    if (Math.round(scrollTop + innerHeight) >= scrollHeight) {
      setCounter(counter + 100);
    }
  }, [counter]);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, true);
    return () => {
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [handleScroll]);
  const onClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <Container>
      <Helmet>
        <title>Charley CoinSite</title>
      </Helmet>
      <Title>Charley Coin</Title>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinList variants={container} initial="hidden" animate="visible">
          {data?.slice(0, counter).map((coin, index) => (
            <Coin key={index} variants={item}>
              <Link to={`/${coin.id}/chart`} state={{ name: coin.name }}>
                <Img
                  alt=""
                  src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`}
                />
                {coin.id} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinList>
      )}
      <Top onClick={onClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 11l7-7 7 7M5 19l7-7 7 7"
          />
        </svg>
      </Top>
    </Container>
  );
};

export default Coins;
