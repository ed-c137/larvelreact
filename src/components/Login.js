import React from "react";
import axios from "axios";
import apiClient from "../services/api";
import { Redirect } from "react-router-dom";

const Login = (props) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [toHome, setToHome] = React.useState(false);
  const [authError, setAuthError] = React.useState(false);
  const [unknownError, setUnknownError] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setAuthError(false);
    setUnknownError(false);
    // axios
    //   .post("/login", {
    //     email: email,
    //     password: password,
    //   })
    //   .then((response) => {
    //     console.log(response);
    //   });

    apiClient.get("sanctum/csrf-cookie").then((response) => {
      apiClient
        .post("/login/", {
          email: email,
          password: password,
        })
        .then((response) => {
          if (response.status === 204) {
            props.login();
            setToHome(true);
          }
        })
        .catch((error) => {
          if (error.response && error.response.status === 422) {
            setAuthError(true);
          } else {
            setUnknownError(true);
            console.error(error);
          }
        });
    });
  };
  if (toHome === true) {
    return <Redirect to="/books" />;
  }
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
