import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Coin from "./Coin";
import Coins from "./Coins";

const Router = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Coins />} />
        <Route path="/:coinId/*" element={<Coin />} />
      </Routes>
    </HashRouter>
  );
};
export default Router;
