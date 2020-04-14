import React from "react";
import App from "next/app";
import { ApolloProvider } from "@apollo/react-hooks";
import { withApollo } from "../config/apollo.config.js";

interface Props {
  Component: any,
  pageProps: any,
  apollo: any
}
class MyApp extends App<Props> {
  render() {
    const { Component, pageProps, apollo } = this.props;
    return (
      <ApolloProvider client={apollo}>
        <Component {...pageProps} />
      </ApolloProvider>
    );
  }
}

// Wraps all components in the tree with the data provider
export default withApollo(MyApp);
