import { useQuery } from "react-query";
import styled from "styled-components";
import { priceData } from "../Api";
import { PriceData } from "./Coin";
import { CoinChart } from "./Coins";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  @media screen and (max-width: 769px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-around;
  background-color: whitesmoke;
  color: black;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 20px;
  span {
    font-weight: 600;
  }
`;

const Span = styled.span`
  color: ${(props) => props.theme.accentColor};
`;

const Price = ({ coinId }: CoinChart) => {
  const { isLoading, data } = useQuery<PriceData>(
    ["pricelist", coinId],
    () => priceData(coinId),
    {
      refetchInterval: 5000,
    }
  );
  const setData = data?.quotes.USD;
  const volumUpDown = setData?.volume_24h_change_24h.toString().match("-");
  const percent24h = setData?.percent_change_24h.toString().match("-");
  const percent7d = setData?.percent_change_7d.toString().match("-");
  const percent30d = setData?.percent_change_30d.toString().match("-");
  const percent1y = setData?.percent_change_1y.toString().match("-");
  return (
    <>
      {isLoading ? (
        "Loading..."
      ) : (
        <Container>
          <Overview>
            <OverviewItem>
              <Span>
                Live Price : {setData?.price.toFixed(2)}$
              </Span>
            </OverviewItem>
          </Overview>
          <Overview>
            <OverviewItem>
              {volumUpDown === null ? (
                <span style={{ color: "green" }}>
                  Today Volum {setData?.volume_24h_change_24h}%
                </span>
              ) : (
                <span style={{ color: "red" }}>
                  Today Volum {setData?.volume_24h_change_24h}%
                </span>
              )}
            </OverviewItem>
          </Overview>
          <Overview>
            <OverviewItem>
              {percent24h === null ? (
                <span style={{ color: "green" }}>
                  Change 24 h : {setData?.percent_change_24h}%
                </span>
              ) : (
                <span style={{ color: "red" }}>
                  Change 24 h : {setData?.percent_change_24h}%
                </span>
              )}
            </OverviewItem>
          </Overview>
          <Overview>
            <OverviewItem>
              {percent7d === null ? (
                <span style={{ color: "green" }}>
                  Change 7 Day : {setData?.percent_change_7d}%
                </span>
              ) : (
                <span style={{ color: "red" }}>
                  Change 7 Day : {setData?.percent_change_7d}%
                </span>
              )}
            </OverviewItem>
          </Overview>
          <Overview>
            <OverviewItem>
              {percent30d === null ? (
                <span style={{ color: "green" }}>
                  Change 1 Month : {setData?.percent_change_30d}%
                </span>
              ) : (
                <span style={{ color: "red" }}>
                  Change 1 Month : {setData?.percent_change_30d}%
                </span>
              )}
            </OverviewItem>
          </Overview>
          <Overview>
            <OverviewItem>
              {percent1y === null ? (
                <span style={{ color: "green" }}>
                  Change 1 Year : {setData?.percent_change_1y}%
                </span>
              ) : (
                <span style={{ color: "red" }}>
                  Change 1 Year : {setData?.percent_change_1y}%
                </span>
              )}
            </OverviewItem>
          </Overview>
          <Overview>
            <OverviewItem>
              <Span>
                Best Price : {setData?.ath_price.toFixed(2)}$
              </Span>
            </OverviewItem>
          </Overview>
          <Overview>
            <OverviewItem>
              <Span>
                Best Price Date : {setData?.ath_date.substring(0, 10)}
              </Span>
            </OverviewItem>
          </Overview>
        </Container>
      )}
    </>
  );
};

export default Price;
