require('dotenv').config()
import React, { useState } from "react";
import { NextPage, NextPageContext } from "next";
import Head from "next/head";
import Nav from "../components/Layout/Nav";
import "../styles/base.scss";
import NavAuth from "../components/Layout/NavAuth";
import nextCookie from "next-cookies";
import ListingGenerator from "../components/ListingGenerator/ListingGenerator";

interface Props {
  isAuthenticated: boolean;
}


const Home: NextPage<Props> = ({ isAuthenticated }) => {
  const [authTab, setAuthTab] = useState("");

  return (
    <div style={{ background: "#F2F3F7" }}>
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        ></link>
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        ></link>
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        ></link>
        <link rel="manifest" href="/site.webmanifest"></link>
        <link
          rel="mask-icon"
          href="/safari-pinned-tab.svg"
          color="#0e1977"
        ></link>
        <meta name="msapplication-TileColor" content="#0e1977"></meta>
        <meta name="theme-color" content="#0e1977"></meta>
      </Head>
      {isAuthenticated ? <NavAuth /> : <Nav />}
      
      <ListingGenerator  authTab={authTab} setAuthTab={setAuthTab} />

    </div>
  );
};

Home.getInitialProps = async (ctx: NextPageContext) => {
  const auth = nextCookie(ctx).token;
  return { isAuthenticated: auth ? true : false };
};

export default Home;
