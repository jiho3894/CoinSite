import ReactPlayer from "react-player";
import { useQuery } from "react-query";
import styled from "styled-components";
import { priceHistory } from "../Api";
import { CoinChart } from "./Coins";

const Site = styled.a`
  font-size: 30px;
  color: red;
`;

interface YoutubeKey {
  links: {
    youtube: string;
    website?: string;
  };
}

const Show = ({ coinId }: CoinChart) => {
  const { isLoading, data } = useQuery<YoutubeKey>(
    ["priceHistory", coinId],
    () => priceHistory(coinId)
  );
  const key = data?.links.youtube;
  const webSite = data?.links.website;
  return (
    <div>
      {isLoading ? (
        "Loading..."
      ) : (
        <div>
          {key === undefined ? (
            <Site href={webSite} target='_blank' rel="noopener noreferrer">Not Found Go to Website</Site>
          ) : (
            <ReactPlayer url={key} playing={true} width="inherit" height="50vh"/>
          )}
        </div>
      )}
    </div>
  );
};

export default Show;
