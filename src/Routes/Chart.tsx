import ApexChart from "react-apexcharts";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import { fetchCoinHistory } from "../Api";
import { isDarkAtom } from "../atoms";

interface CoinChart {
  coinId?: string;
}

interface Ihistory {
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
    () => fetchCoinHistory(coinId)
  );
  return (
    <>
      {isLoading ? (
        "Loading..."
      ) : (
        <ApexChart
          type="line"
          series={[
            {
              name: coinId,
              data: data?.map((price) => price.close),
            },
          ]}
          options={{
            theme: {
              mode: isDark ? "dark" : "light",
            },
            grid: {
              show: false,
            },
            chart: {
              width: 600,
              height: 600,
              background: "transparent",
              toolbar: {
                show: false,
              },
            },
            stroke: {
              curve: "smooth",
              width: 3,
            },
            yaxis: {
              show: false,
            },
            xaxis: {
              labels: {
                show: false,
              },
              axisTicks: {
                show: false,
              },
              axisBorder: {
                show: false,
              },
              categories: data?.map((date) => date.time_close),
              type: "datetime",
            },
            fill: {
              type: "gradient",
              gradient: {
                gradientToColors: ["#1abc9c"],
                stops: [0, 100],
              },
            },
            colors: ["#8e44ad"],
            tooltip: {
              y: {
                formatter: (value) => `${value.toFixed(2)}$`,
              },
            },
          }}
        />
      )}
    </>
  );
};

export default Chart;
