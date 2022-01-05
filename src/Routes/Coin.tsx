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
import { Button } from "react-bootstrap";
import Show from "./Show";
import Price from "./Price";

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
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
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
  height: 10vh;
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
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 14px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
    font-weight: 600;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
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
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: flex-end;
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
  return (
    <Container>
      <BtnContainer>
        <Link to="/">
          <Button variant="info">Back</Button>
        </Link>
      </BtnContainer>
      <Title>
        <Img
          alt=""
          src={`https://cryptoicon-api.vercel.app/api/icon/${info?.symbol.toLocaleLowerCase()}`}
        />
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
              <span>Rank:</span>
              <span>{info?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Price:</span>
              <span>{price?.quotes.USD.price.toFixed(2)}$</span>
            </OverviewItem>
          </Overview>
          <Description>
            {info?.description.substring(0,300)}
          </Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{price?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{price?.max_supply}</span>
            </OverviewItem>
          </Overview>
          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`} state={{ name: state.name }}>
                Chart
              </Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`} state={{ name: state.name }}>
                Price
              </Link>
            </Tab>
            <Tab isActive={showMatch !== null}>
              <Link to={`/${coinId}/show`} state={{ name: state.name }}>
                Youtube
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
