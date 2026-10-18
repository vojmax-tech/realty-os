import { JetBrains_Mono } from "next/font/google";

/* Labels on the landing. Headings use Inter (set in app/layout), like the rest of the app. */
export const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});
