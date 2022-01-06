import Router from "./Routes/Router";
import { useRecoilValue } from "recoil";
import { isDarkAtom, ThemeEnums } from "./recoil/atoms";
import { GlobalStyle } from "./style/GlobalStyle";
import { Darktheme, lightTheme } from "./style/theme";
import { ThemeProvider } from "styled-components";

const App = () => {
  const theme: ThemeEnums = useRecoilValue(isDarkAtom);
  const { DARK } = ThemeEnums;
  return (
    <>
      <ThemeProvider theme={theme === DARK ? Darktheme : lightTheme}>
        <GlobalStyle />
        <Router />
      </ThemeProvider>
    </>
  );
};

export default App;
