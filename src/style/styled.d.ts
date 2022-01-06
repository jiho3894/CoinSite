import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    isDark ?: boolean;
    textColor: string;
    bgColor: string;
    accentColor?: string;
    cardBgColor: string;
    op?:string;
  }
}
