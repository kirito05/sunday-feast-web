import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";



export const metadata = {
  title: "Grazing Goat: Where freshness leaps off the plate",
  description: "Grazing Goat is a web marketplace that serves fresh, delicious Mutton",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
      >
        {children}
      </body>
    </html>
  );
}
