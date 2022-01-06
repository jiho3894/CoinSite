import { atom } from "recoil";

export enum ThemeEnums {
  LIGHT = "0",
  DARK = "1",
}

const { LIGHT, DARK } = ThemeEnums;

export const getTheme = (): ThemeEnums => {
  const theme = localStorage.getItem("theme");
  if (theme === DARK) {
    return DARK;
  }
  return LIGHT;
};

export const isDarkAtom = atom<ThemeEnums>({
  key: "themeMode",
  default: getTheme(),
});
