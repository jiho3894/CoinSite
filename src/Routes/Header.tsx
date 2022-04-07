import { useCallback } from "react";
import { FaMoon } from "react-icons/fa";
import { IoMdSunny } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { isDarkAtom, ThemeEnums } from "../recoil/atoms";

const ToggleBtnContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 80px;
  position: fixed;
  top: 0;
  right: 0;
  background-color: ${(props) => props.theme.op};
`;

const FlexStart = styled.div`
  width: 100%;
  height: 55px;
  display: flex;
  align-items: center;
`;

const FlexEnd = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const Back = styled.div`
  width: 40px;
  height: 40px;
  margin-right: 20px;
  stroke-width: 2px;
  stroke-linecap: round;
`;

const ToggleBtn = styled.button`
  background-color: ${(props) => props.theme.textColor};
  color: ${(props) => props.theme.bgColor};
  width: 40px;
  height: 40px;
  border-radius: 100%;
  @media screen and (max-width: 769px) {
    width: 35px;
    height: 35px;
  }
`;

const GitHub = styled.button`
  width: 40px;
  height: 40px;
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

const Header = () => {
  const location = useLocation();
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
  const goLink = () => {
    window.location.href = "https://github.com/jiho3894/CoinSite";
  };
  return (
    <ToggleBtnContainer>
      <FlexStart>
        <GitHub onClick={goLink} />
        <div className="ToggleTheme" onClick={handleChangeTheme}>
          <ToggleBtn>{theme === LIGHT ? <FaMoon /> : <IoMdSunny />}</ToggleBtn>
        </div>
      </FlexStart>
      <FlexEnd>
        {location.pathname.length !== 1 ? (
          <Link to="/">
            <Back>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Back>
          </Link>
        ) : null}
      </FlexEnd>
    </ToggleBtnContainer>
  );
};

export default Header;
