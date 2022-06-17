import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import {
  Route,
  Routes,
  useLocation,
  useMatch,
  useParams,
} from "react-router-dom";
import styled from "styled-components";
import { infoData, priceData } from "../Api";
import Chart from "./Chart";
import Show from "./Show";
import Price from "./Price";

const Img = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 15px;
`;

const Container = styled.div`
  padding: 0px 20px;
  max-width: 1200px;
  height: 100vh;
  margin: 0 auto;
  @media screen and (max-width: 1200px) {
    width: 100%;
  }
  @media screen and (max-width: 769px) {
    width: 100%;
  }
`;

const Title = styled.h1`
  font-size: 50px;
  color: ${(props) => props.theme.accentColor};
  height: 220px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-around;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px;
  border-radius: 10px;
  width: 100%;
  margin-top: 7px;
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 20px;
  width: 50%;
  span:first-child {
    font-size: 18px;
    line-height: 18px;
    font-weight: 500;
    text-transform: uppercase;
    margin-bottom: 5px;
    font-weight: 600;
  }
  span:last-child {
    font-size: 18px;
    font-weight: 600;
    padding-bottom: 4px;
  }
  p {
    font-size: 30px;
    font-weight: 600;
    color: gold;
  }
  @media screen and (max-width: 769px) {
    span:first-child {
      font-size: 15px;
    }
    span:last-child {
      font-size: 13px;
    }
    p {
      font-size: 18px;
      font-weight: 600;
      color: gold;
    }
  }
`;

const SiteLink = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  width: 100%;
  height: 80px;
  margin-top: 7px;
  background-color: ${(props) => props.theme.accentColor};
`;

const Site = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  span {
    font-size: 30px;
    font-weight: 700;
  }
  @media screen and (max-width: 769px) {
    span {
      font-size: 20px;
    }
  }
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin: 25px 0px;
  gap: 5px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
    font-weight: 550;
    font-size: 16px;
  }
  @media screen and (max-width: 769px) {
    a {
      font-size: 13px;
    }
  }
`;

const CoinPercent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 769px) {
    span:first-child {
      font-size: 12px;
    }
  }
`;

interface RouteState {
  state: {
    name: string;
    links: string;
  };
}

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  contract: string;
  platform: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
  links: {
    youtube: string;
    source_code: string;
    website: string;
  };
}

export interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

const Coin = () => {
  const { coinId } = useParams();
  const { state } = useLocation() as RouteState;
  const priceMatch = useMatch(`${coinId}/price`);
  const chartMatch = useMatch(`${coinId}/chart`);
  const showMatch = useMatch(`${coinId}/show`);
  const { isLoading: infoLoding, data: info } = useQuery<InfoData>(
    ["info", coinId],
    () => infoData(coinId),
    {
      refetchInterval: 5000,
    }
  );
  const { isLoading: priceLoding, data: price } = useQuery<PriceData>(
    ["price", coinId],
    () => priceData(coinId)
  );
  const isPriceUp = price?.quotes.USD.percent_change_24h
    ? price?.quotes.USD.percent_change_24h > 0
    : false;
  const percent24h = price?.quotes.USD.percent_change_24h.toString().match("-");
  const sourceCode = info?.links.source_code;
  const webSite = info?.links.website;
  return (
    <Container>
      <Title>
        {info && (
          <Img
            alt=""
            src={`https://cryptocurrencyliveprices.com/img/${info?.id}.png`}
          />
        )}
        {state?.name || "Nothing"}
      </Title>
      {infoLoding || priceLoding ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Helmet>
            <title>{state?.name || "Nothing"}</title>
          </Helmet>
          <Overview>
            <OverviewItem>
              <span>Rank</span>
              <p>{info?.rank}</p>
            </OverviewItem>
            <OverviewItem>
              <span>Price</span>
              <CoinPercent>
                {percent24h === null ? (
                  <span style={{ color: "green" }}>
                    {isPriceUp ? "🔺 " : "🔻 "}
                    {price?.quotes.USD.percent_change_24h} %
                  </span>
                ) : (
                  <span style={{ color: "red" }}>
                    {isPriceUp ? "🔺 " : "🔻 "}
                    {price?.quotes.USD.percent_change_24h} %
                  </span>
                )}
                <span>&nbsp;{`/ ${price?.quotes.USD.price.toFixed(2)}`}$</span>
              </CoinPercent>
            </OverviewItem>
          </Overview>
          <Overview>
            <OverviewItem>
              <span>Total Suply</span>
              <span>{price?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply</span>
              <span>{price?.max_supply}</span>
            </OverviewItem>
          </Overview>
          <SiteLink>
            <Site>
              <a
                href={`${sourceCode}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Source Code</span>
              </a>
            </Site>
            <Site>
              <a href={`${webSite}`} target="_blank" rel="noopener noreferrer">
                <span>WebSite</span>
              </a>
            </Site>
          </SiteLink>
          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`} state={{ name: state.name }}>
                Chart
              </Link>
            </Tab>
            <Tab isActive={showMatch !== null}>
              <Link to={`/${coinId}/show`} state={{ name: state.name }}>
                Youtube
              </Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`} state={{ name: state.name }}>
                Price & Detail
              </Link>
            </Tab>
          </Tabs>
          <Routes>
            <Route path="chart" element={<Chart coinId={coinId} />} />
            <Route path="price" element={<Price coinId={coinId} />} />
            <Route path="show" element={<Show coinId={coinId} />} />
          </Routes>
        </>
      )}
    </Container>
  );
};
export default Coin;
