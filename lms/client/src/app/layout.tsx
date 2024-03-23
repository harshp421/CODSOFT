"use client"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import { Poppins } from "next/font/google";
import { Josefin_Sans } from "next/font/google";
import { Providers } from "./Provider";
import { Toaster } from "@/components/ui/toaster"
import { SessionProvider } from "next-auth/react";
import NextAuthSessionProvider from "./_app";
import React, { FC } from "react";
import { useLoadUserQuery } from "@/redux/feature/api/apiSlice";
import Loader from "@/components/ui/Loader";

const poppins=Poppins({
  subsets: ["latin"],
  weight: ["400", "500","600", "700"],
  variable: "--font-Poppins",
})
const josefin_sans=Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "500","600", "700"],
  variable: "--font-Josefin_Sans",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <html lang="en">
      <body className={`${poppins.variable}  ${josefin_sans.variable}`} >
       <Providers>
       <NextAuthSessionProvider >
         <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
        <Custome>
        {children}
        </Custome>
        <Toaster />
        </ThemeProvider>
        </NextAuthSessionProvider>
       </Providers>
        </body>
    </html>
  );
}

const Custome:FC<{children:React.ReactNode}>=({children})=>{
 const {isLoading}=useLoadUserQuery({});
  return(
  <>
   {
    isLoading?<Loader/>:<>{children}</>
   }
  </>
 )
}