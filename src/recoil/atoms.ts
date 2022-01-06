import { atom } from "recoil";

export enum ThemeEnums {
  DARK = "0",
  LIGHT = "1",
}

const { DARK, LIGHT } = ThemeEnums;

export const getTheme = (): ThemeEnums => {
  const theme = localStorage.getItem("theme");
  if (theme === LIGHT) {
    return LIGHT;
  }
  return DARK;
};

export const isDarkAtom = atom<ThemeEnums>({
  key: "themeMode",
  default: getTheme(),
});
