import React from "react";
import Router from "./Routes/Router";
import { useRecoilValue } from "recoil";
import { isDarkAtom, ThemeEnums } from "./recoil/atoms";
import { GlobalStyle } from "./style/GlobalStyle";
import { Darktheme, lightTheme } from "./style/theme";
import { ThemeProvider } from "styled-components";

const App = ():JSX.Element => {
  const theme: ThemeEnums = useRecoilValue(isDarkAtom);
  const { LIGHT } = ThemeEnums;
  return (
    <>
      <ThemeProvider theme={theme === LIGHT ? Darktheme : lightTheme}>
        <GlobalStyle />
        <Router />
      </ThemeProvider>
    </>
  );
}

export default App;
