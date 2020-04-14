import React from "react";
import Head from "next/head";
import Router from "next/router";
import { useForm } from "react-hook-form";
import { setToken } from "../../utils/auth.utils";
import { useMutation } from "@apollo/react-hooks";
import { LOGIN_USER } from "../../graphql/User/mutations/loginUser";
import "./Login.scss";

interface Props {
  authTab?: string, 
  setAuthTab: (authTab: string) =>void, 
  address?: string, 
  addressSlug?: string, 
  images?: string[], 
  videos?: string[]
}

const Login: React.FC<Props> = ({authTab, setAuthTab}) => {
  const [loginUser, { client }] = useMutation(LOGIN_USER);
  const { register, handleSubmit, setError, errors, reset } = useForm();

  const onSubmit = async (data: any): Promise<void> => {
    // attempt to login user
    const response = await loginUser({
      variables: {
        data
      },
      // errorPolicy: "all"
    });

    if (response.errors && response.errors[0].message) {
      return setError(
        "invalidCredentials",
        "notMatch",
        response.errors[0].message
      )
    }

    
    // set token in cookie
    setToken(response.data.loginUser.token);
    // reset form fields
    reset();
    // update isLoggedIn to true
    client && client.writeData({ data: { isLoggedIn: true } });
    // route to dashboard
    Router.push("/explore");
    
    
  };

  return (
    <div className="login">
      <Head>
        <title>Notes &#124; Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="form-container">
        <div className="form__message">
          <span>
            Don't have an account? Create one{" "}
            <button
              onClick={e => (e.preventDefault(), setAuthTab("register"))}
              className="form__message-link"
            >
              here
            </button>
          </span>
        </div>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          {/* <button className="form__sso-btn">Sign in with google</button>
          <button className="form__sso-btn">Sign in with facebook</button>
          <div className="form__divider">
            <span>OR</span>
          </div> */}

          {errors.invalidCredentials && (
            <p className="form__error">{errors.invalidCredentials}</p>
          )}

          <div className="form__field">
            <input
              className="form__field--input"
              placeholder="Username or Email"
              type="text"
              name="emailOrUsername"
              ref={register({
                required: true,
                pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              })}
            />
            {errors.email && (
              <p className="form__error">Please enter a valid email</p>
            )}
          </div>

          <div className="form__field">
            <input
              className="form__field--input"
              placeholder="Password"
              type="password"
              name="password"
              ref={register({ required: true })}
            />
            {errors.password && (
              <p className="form__error">Please enter a password</p>
            )}
          </div>

          <button className="form__btn" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
