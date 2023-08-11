import { Inter, Poppins } from "next/font/google";

export const InterFont = Inter({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-inter",
});
export const PoppinsFont = Poppins({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const typography = {
  fonts: {
    inter: InterFont.style.fontFamily,
    poppins: PoppinsFont.style.fontFamily,
  },
};
