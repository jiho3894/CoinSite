import { useQuery } from "react-query";
import styled from "styled-components";
import { priceData } from "../Api";
import { PriceData } from "./Coin";
import { CoinChart } from "./Coins";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Price = ({ coinId }: CoinChart) => {
  const { isLoading, data } = useQuery<PriceData>(["pricelist", coinId], () =>
    priceData(coinId)
  );
  const setData = data?.quotes.USD;
  const volumUpDown = setData?.volume_24h_change_24h.toString().match("-");
  const percent15M = setData?.percent_change_15m.toString().match("-");
  const percent24h = setData?.percent_change_24h.toString().match("-");
  const percent7d = setData?.percent_change_7d.toString().match("-");
  const percent30d = setData?.percent_change_30d.toString().match("-");
  return (
    <>
      {isLoading ? (
        "Loading..."
      ) : (
        <Container>
          <span>Price : {setData?.price}</span>
          {volumUpDown === null ? (
            <span style={{ color: "green" }}>
              volum{setData?.volume_24h_change_24h}
            </span>
          ) : (
            <span style={{ color: "red" }}>
              volum{setData?.volume_24h_change_24h}
            </span>
          )}

          {percent15M === null ? (
            <span style={{ color: "green" }}>
              15m {setData?.percent_change_15m}
            </span>
          ) : (
            <span style={{ color: "red" }}>
              15m {setData?.percent_change_15m}
            </span>
          )}

          {percent24h === null ? (
            <span style={{ color: "green" }}>
              24h {setData?.percent_change_24h}
            </span>
          ) : (
            <span style={{ color: "red" }}>
              24h {setData?.percent_change_24h}
            </span>
          )}

          {percent7d === null ? (
            <span style={{ color: "green" }}>
              7d {setData?.percent_change_7d}
            </span>
          ) : (
            <span style={{ color: "red" }}>
              7d {setData?.percent_change_7d}
            </span>
          )}

          {percent30d === null ? (
            <span style={{ color: "green" }}>
              30d {setData?.percent_change_30d}
            </span>
          ) : (
            <span style={{ color: "red" }}>
              30d {setData?.percent_change_30d}
            </span>
          )}
        </Container>
      )}
    </>
  );
};

export default Price;
