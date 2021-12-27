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
import Price from "./Price";

const Container = styled.div`
  padding: 0px 20px;
  width: 480px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
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
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
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
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
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
  }
`;

interface RouteState {
  state: {
    name: string;
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
}

interface PriceData {
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
  /* const [loading, setLoding] = useState(true);
  const [info, setInfo] = useState<InfoData>();
  const [price, setPrice] = useState<PriceData>(); */
  /* useEffect(() => {
    (async () => {
      const infoData = await (
        await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
      ).json();
      const priceData = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
      ).json();
      setInfo(infoData);
      setPrice(priceData);
      setLoding(false);
    })();
  }, [coinId]); */
  console.log(price?.quotes.USD.price);
  return (
    <Container>
      <Title>{state?.name || "Nothing"}</Title>
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
              <span>Symbol:</span>
              <span>{info?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Price:</span>
              <span>{price?.quotes.USD.price.toFixed(2)}$</span>
            </OverviewItem>
          </Overview>
          <Description>{info?.description}</Description>
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
          </Tabs>
          <Routes>
            <Route path="chart" element={<Chart coinId={coinId} />} />
            <Route path="price" element={<Price />} />
          </Routes>
        </>
      )}
    </Container>
  );
};
export default Coin;
