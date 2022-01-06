import { useCallback } from "react";
import { FaMoon } from "react-icons/fa";
import { IoMdSunny } from "react-icons/io";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { isDarkAtom, ThemeEnums } from "../recoil/atoms";

const ToggleBtnContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  position: fixed;
  top: 0;
  right: 0;
  background-color: ${(props) => props.theme.op};
`;

const ToggleBtn = styled.button`
  background-color: ${(props) => props.theme.textColor};
  color: ${(props) => props.theme.bgColor};
  width: 50px;
  height: 50px;
  border-radius: 100%;
  @media screen and (max-width: 769px) {
    width: 35px;
    height: 35px;
  }
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 15px;
  margin-left: 5px;
  @media screen and (max-width: 769px) {
    margin-right: 10px;
    margin-left: 3px;
  }
`;

const GitHub = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 30px;
  border: 0;
  cursor: pointer;
  background-color: white;
  background-repeat: no-repeat;
  background-size: contain;
  background-image: url("https://upload.wikimedia.org/wikipedia/commons/4/4a/GitHub_Mark.png");
  margin: 20px;
  @media screen and (max-width: 769px) {
    width: 35px;
    height: 35px;
    margin: 10px;
  }
`;

const Span = styled.span`
  font-weight: 700;
  font-size: 20px;
  @media screen and (max-width: 769px) {
    font-size: 12px;
  }
`;

const Header = () => {
  const [theme, setTheme] = useRecoilState<ThemeEnums>(isDarkAtom);
  const { LIGHT, DARK } = ThemeEnums;
  const handleChangeTheme = useCallback((): void => {
    if (theme === DARK) {
      localStorage.setItem("theme", LIGHT);
      setTheme(LIGHT);
      return;
    }

    localStorage.setItem("theme", DARK);
    setTheme(DARK);
  }, [DARK, LIGHT, setTheme, theme]);
  return (
    <ToggleBtnContainer>
      <BtnContainer>
        <Link to="/">
          <Span>H O M E &nbsp; |</Span>
        </Link>
      </BtnContainer>
      <BtnContainer>
        <a href="https://api.coinpaprika.com/" target='_blank' rel="noopener noreferrer">
          <Span>A P I &nbsp; |</Span>
        </a>
      </BtnContainer>
      <a href="https://github.com/jiho3894/CoinSite" target='_blank' rel="noopener noreferrer">
        <GitHub />
      </a>
      <div className="ToggleTheme" onClick={handleChangeTheme}>
        <ToggleBtn>{theme === LIGHT ? <FaMoon /> : <IoMdSunny />}</ToggleBtn>
      </div>
    </ToggleBtnContainer>
  );
};

export default Header;
