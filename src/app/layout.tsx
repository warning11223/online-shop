import { Inter } from "next/font/google";
import { Metadata } from "next";
import "./globals.css";
import StoreProvider from "@/components/StoreProvider";
import {ToastContainer} from "react-toastify";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
      <body className={`${inter.variable}`}>
      <StoreProvider>
          {children}
      </StoreProvider>
      <ToastContainer />
      </body>
      </html>
  );
}
