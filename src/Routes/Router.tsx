import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Coin from "../Components/Coin";
import Coins from "../Components/Coins";
import Header from "./Header";

const Router = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Header/>
      <Routes>
        <Route path="/" element={<Coins />} />
        <Route path="/:coinId/*" element={<Coin />} />
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
