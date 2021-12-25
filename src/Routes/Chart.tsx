import { useParams } from "react-router-dom";

const Chart = () => {
  const param  = useParams();
  console.log(param);
  return <h1>chart</h1>;
};

export default Chart;
