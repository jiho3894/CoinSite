import ReactPlayer from "react-player";
import { useQuery } from "react-query";
import YouTube from "react-youtube";
import { priceHistory } from "../Api";

interface CoinChart {
  coinId?: string;
}

interface YoutubeKey {
  links: {
    youtube : string;
  }
}

const Price = ({ coinId }: CoinChart) => {
  const { isLoading, data } = useQuery<YoutubeKey>(["priceHistory", coinId], () =>
    priceHistory(coinId)
  );
  const key = data?.links.youtube;
  return (
    <div>
      {isLoading ? (
        "Loading..."
      ) : (
        <div>
          {key === undefined ? "유튜브 영상이 없습니다." : <ReactPlayer url={key} playing={true} width="inherit"/>}
        </div>
      )}
    </div>
  );
};

export default Price;
