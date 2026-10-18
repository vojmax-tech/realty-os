import type { Metadata } from "next";
import { ReactNode } from "react";
import { DemoDataProvider } from "@/lib/demo-data";

export const metadata: Metadata = {
  title: "RealtyOS demo workspace",
  description: "The RealtyOS agent dashboard, running on fictional leads. Nothing here is saved.",
  robots: { index: false, follow: true },
};

/* The real admin screens, on fictional data, with no sign-in. See lib/demo-data.tsx. */
export default function ShowcaseLayout({ children }: { children: ReactNode }) {
  return <DemoDataProvider>{children}</DemoDataProvider>;
}
