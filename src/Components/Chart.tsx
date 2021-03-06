import ApexChart from "react-apexcharts";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import { fetchCoinHistory } from "../Api";
import { isDarkAtom } from "../recoil/atoms";
import { CoinChart } from "./Coins";

export interface Ihistory {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

const Chart = ({ coinId }: CoinChart) => {
  const isDark = useRecoilValue(isDarkAtom);
  const { isLoading, data } = useQuery<Ihistory[]>(
    ["coinHistory", coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 3000,
    }
  );
  return (
    <>
      {isLoading ? (
        "Loading..."
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              name: "Price",
              data:
                data?.map((price) => ({
                  x: price.time_open,
                  y: [price.open, price.high, price.low, price.close],
                })) ?? [],
            },
          ]}
          options={{
            theme: {
              mode: isDark ? "dark" : "light",
            },
            chart: {
              type: "candlestick",
              height: 200,
              background: "transparent",
              foreColor: isDark ? "white" : "black",
              animations: {
                enabled: true,
                easing: "easeinout",
                speed: 800,
                animateGradually: {
                  enabled: true,
                  delay: 150,
                },
                dynamicAnimation: {
                  enabled: true,
                  speed: 350,
                },
              },
            },
            xaxis: {
              type: "datetime",
              labels: {
                style: {
                  colors: isDark === "0" ? "white" : "black",
                },
              },
            },
            yaxis: {
              tooltip: {
                enabled: true,
              },
              tickAmount: 6,
              labels: {
                style: {
                  colors: isDark === "0" ? "white" : "black",
                },
                formatter: (val) => {
                  return val.toFixed(2);
                },
              },
            },
          }}
        />
      )}
    </>
  );
};

export default Chart;
