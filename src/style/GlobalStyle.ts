import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro&display=swap');
${reset}
  * {
    box-sizing: border-box;
    margin:0;
    border:0;
    &::-webkit-scrollbar {
    width: 8px;
    height: 5px;
    border-radius: 50px;
  }
  &::-webkit-scrollbar-thumb {
    background: linear-gradient(#6c5ce7, #00cec9);
    border-radius: 50px;
  }
  }
  body {
    font-family: 'Source Sans Pro', sans-serif;
    background-color: ${(props) => props.theme.bgColor};
    color: ${(props) => props.theme.textColor};
  }
  a{
    text-decoration: none;
    color: inherit;
  }
`;
