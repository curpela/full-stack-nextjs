import React from "react";
import Head from "next/head";
import Router from "next/router";
import Link from "next/link"
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/react-hooks";
import { CREATE_USER } from "../graphql/User/mutations/createUser";
import Nav from "../components/Layout/Nav";

const signup = () => {
  const [createUser, { client }] = useMutation(CREATE_USER);
  const { register, handleSubmit, errors, reset, setError } = useForm();

  const onSubmit = async (data: any): Promise<void> => {
    // attempt to create user
    const response = await createUser({
      variables: {
        data,
      },
    });

    // check for errors
    if (response.errors && response.errors[0].message) {
      return setError(
        "registrationError",
        "notMatch",
        response.errors[0].message
      );
    }

    // set token to storage
    localStorage.setItem("token", response.data.createUser.token);
    // reset form fields
    reset();
    // update isLoggedIn to true
    client && client.writeData({ data: { isLoggedIn: true } });
    // route to dashboard

    Router.push("/dashboard");
  };

  return (
    <div className="register">
      <Head>
        <title>Notes &#124; Register</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <div className="form-container">
        <div className="form__message">
          <span>
            Already have an account? Login{" "}
            <Link href="/login">
              <button
                onClick={(e) => {
                  e.preventDefault();
                }}
                className="form__message-link"
              >
                here
              </button>
            </Link>
          </span>
        </div>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          {errors.registrationError && <p>{errors.registrationError}</p>}
          <div className="name">
            <div className="form__field firstLast">
              <input
                className="form__field--input"
                type="text"
                name="firstName"
                placeholder="First name"
                ref={register({ required: true, maxLength: 80 })}
              />
              {errors.firstName && (
                <p className="form__error">First name required</p>
              )}
            </div>

            <div className="form__field firstLast">
              <input
                className="form__field--input"
                type="text"
                name="lastName"
                placeholder="Last name"
                ref={register({ required: true, maxLength: 80 })}
              />
              {errors.lastName && (
                <p className="form__error">Last name required</p>
              )}
            </div>
          </div>
          <div className="form__field">
            <input
              className="form__field--input"
              type="text"
              name="username"
              placeholder="Username"
              ref={register({ required: true, maxLength: 80 })}
            />
            {errors.username && (
              <p className="form__error">Username required</p>
            )}
          </div>

          <div className="form__field">
            <input
              className="form__field--input"
              type="text"
              name="email"
              placeholder="Email"
              ref={register({
                required: true,
                pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              })}
            />
            {errors.email && (
              <p className="form__error">Please enter a valid email</p>
            )}
          </div>

          <div className="form__field">
            <input
              className="form__field--input"
              type="password"
              name="password"
              placeholder="Password"
              ref={register({
                required: true,
                minLength: 8,
                pattern: /[A-Za-z]{3}/,
              })}
            />
            {errors.password && (
              <p className="form__error">
                Password must be at least 8 characters and contain one uppercase
                letter and one number
              </p>
            )}
          </div>
          <button type="submit" className="form__btn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default signup;
