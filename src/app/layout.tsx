import StyledComponentsRegistry from "./registry";
import { Inter, Hedvig_Letters_Serif, Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "700"] });
const hedvig = Hedvig_Letters_Serif({
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata = {
  title: "Solace Candidate Assignment",
  description: "Show us what you got",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
