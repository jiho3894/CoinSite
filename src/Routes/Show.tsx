import ReactPlayer from "react-player";
import { useQuery } from "react-query";
import { priceHistory } from "../Api";
import { CoinChart } from "./Coins";

interface YoutubeKey {
  links: {
    youtube: string;
  };
}

const Show = ({ coinId }: CoinChart) => {
  const { isLoading, data } = useQuery<YoutubeKey>(
    ["priceHistory", coinId],
    () => priceHistory(coinId)
  );
  const key = data?.links.youtube;
  return (
    <div>
      {isLoading ? (
        "Loading..."
      ) : (
        <div>
          {key === undefined ? (
            "유튜브 영상이 없습니다."
          ) : (
            <ReactPlayer url={key} playing={true} width="inherit" />
          )}
        </div>
      )}
    </div>
  );
};

export default Show;
