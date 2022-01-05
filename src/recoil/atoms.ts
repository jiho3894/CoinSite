import { atom } from "recoil";

export enum ThemeEnums {
  LIGHT = "0",
  DARK = "1",
};

const { LIGHT, DARK } = ThemeEnums;

export const getTheme = (): ThemeEnums => {
  const theme = localStorage.getItem("theme");
  console.log(theme);

  if (theme === DARK) {
    return DARK;
  }

  // localStorage에 있는 값이 DARK가 아니라면, 모든 경우에도 LIGHT를 return 합니다.
  return LIGHT;
};

export const isDarkAtom = atom<ThemeEnums>({
  key: "themeMode",
  default: getTheme(),
  // 기본값은 localStorage에 있는 값에 따라서 설정 해줍니다.
});
