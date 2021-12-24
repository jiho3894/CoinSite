import { useParams } from "react-router-dom";

const Coin = () => {
  const { coinId } = useParams();
  return <div>Coin: {coinId}</div>;
};
export default Coin;
