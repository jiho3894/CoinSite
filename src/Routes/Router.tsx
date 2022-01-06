import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Coin from "../Components/Coin";
import Coins from "../Components/Coins";
import Header from "./Header";

const Router = () => {
  return (
    <HashRouter basename={process.env.PUBLIC_URL}>
      <Header/>
      <Routes>
        <Route path="/" element={<Coins />} />
        <Route path="/:coinId/*" element={<Coin />} />
      </Routes>
    </HashRouter>
  );
};
export default Router;
