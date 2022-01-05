import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { IoMdSunny } from 'react-icons/io';
import { FaMoon } from 'react-icons/fa';
import { fetchData } from "../Api";
import { Helmet } from "react-helmet";
import { EffectCallback, useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { isDarkAtom, ThemeEnums } from "../recoil/atoms";

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
  const [theme, setTheme] = useRecoilState<ThemeEnums>(isDarkAtom);
  const { LIGHT, DARK } = ThemeEnums;
  const { isLoading, data } = useQuery<CoinInterface[]>("allCoin", fetchData);
  const [counter, setCounter] = useState(50);
  const handleChangeTheme = useCallback((): void => {
    if (theme === DARK) {
      localStorage.setItem('theme', LIGHT);
      setTheme(LIGHT);
      return;
    }

    localStorage.setItem('theme', DARK);
    setTheme(DARK);
  }, [DARK, LIGHT, setTheme, theme]);
  const handleScroll = () => {
    const scrollHeight = document.body.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight) {
      setCounter(counter + 100);
    }
  };
  useEffect((): ReturnType<EffectCallback> => {
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("touchmove", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("touchmove", handleScroll);
    };
  });
  return (
    <Container>
      <Helmet>
        <title>나락의 지름길</title>
      </Helmet>
      <Link to="/">
        <ToggleBtnContainer>
          <ToggleBtn >
          <div
      className='ToggleTheme'
      onClick={handleChangeTheme}
    >
      {
        theme === LIGHT ? <FaMoon /> : <IoMdSunny />
        // 테마가 라이트모드 / 다크모드일때마다 아이콘을 다르게 렌더링 해줍니다.
        // 취향에 따라 아이콘을 설정해주세요 :)
      }
    </div>
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
