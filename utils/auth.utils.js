import { Component } from "react";
import cookie from "js-cookie";
import Router from "next/router";
import redirect from "./redirect";
import nextCookie from "next-cookies";
import { useApolloClient } from "@apollo/react-hooks";

/*
 * @Util setToken
 * @Desc Creates a cookie named token with a provided jwt token
 * @Access Public
 * @Param String (JWT TOKEN)
 */
function setToken(token) {
  cookie.set("token", token);
}

/*
 * @Util logOut
 * @Desc Removes current user token and redirects them to login route
 * @Access Public
 */
function logOut() {
  cookie.remove("token");
  Router.push("/");
}

/*
 * @Util getDisplayName
 * @Desc Gets the display name of a JSX component for dev tools
 * @Access Private
 * @Param Component
 */
const _getDisplayName = Component =>
  Component.displayName || Component.name || "Component";

/*
 * @Util withAuthSync
 * @Desc HOF that privatizes a page requiring a jwt token to access it
 * @Access Public
 * @Param Component
 */
function withAuthSync(WrappedComponent) {
  return class extends Component {
    static displayName = `withAuthSync(${_getDisplayName(WrappedComponent)})`;

    static async getInitialProps(context) {
      const token = auth(context);

      const componentProps =
        WrappedComponent.getInitialProps &&
        (await WrappedComponent.getInitialProps(context));

      return { ...componentProps, token };
    }

    constructor(props) {
      super(props);

      this.syncLogout = this.syncLogout.bind(this);
    }

    componentDidMount() {
      window.addEventListener("storage", this.syncLogout);
    }

    componentWillUnmount() {
      window.removeEventListener("storage", this.syncLogout);
      window.localStorage.removeItem("logout");
    }

    syncLogout(event) {
      if (event.key === "logout") {
        Router.push("/login");
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
}

// @TODO - DO NOT REMOVE COMMENTS
// Create token validation util
// get cookie
// parse cookie
// sgasdfgsdfgsdfgsdfgsdfgsd <--- TOKEN
// jwt verify (token, secret) - GOOD
// return token or error - ERROR REDIRECT TO LOGIN

/*
 * @Util auth
 * @Desc 1) Checks to see if the current client is authenticated (SSR)
 * 		2) (This is good to have as isAuth wont work when trying to authenticate a client in getInitialProps)
 * @Access Public
 */
function auth(context) {
  const { token } = nextCookie(context);

  if (!token) {
    redirect(context, "/login");
  }

  return token;
}

/*
 * @Util isAuth
 * @Desc Checks to see if the current client is authenticated, returns a boolean
 * @Access Public
 */
function isAuth() {
  const client = useApolloClient();
  return client.cache.data.data.ROOT_QUERY.isLoggedIn;
}

export { setToken, logOut, isAuth, auth, withAuthSync };
