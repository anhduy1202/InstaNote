"use client"
import "./globals.css";
import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import { Inter } from "next/font/google";
import awsconfig from "../src/aws-exports";
Amplify.configure({ ...awsconfig, ssr: true });

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Authenticator.Provider>
          {children}
        </Authenticator.Provider>
      </body>
    </html>
  );
}
