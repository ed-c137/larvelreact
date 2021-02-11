import logo from "./logo.svg";
import "./App.css";
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";
import Books from "./components/Books";
import Login from "./components/Login";
import apiClient from "./services/api";

function App() {
  const [loggedIn, setLoggedIn] = React.useState(
    sessionStorage.getItem("loggedIn") == "true" || false
  );
  const login = () => {
    setLoggedIn(true);
    sessionStorage.setItem("loggedIn", true);
  };

  const logout = () => {
    apiClient.post("/logout").then((response) => {
      if (response.status === 204) {
        setLoggedIn(false);
      }
    });
  };
  const authLink = loggedIn ? (
    <button onClick={logout}>Logout</button>
  ) : (
    <NavLink to="/login">Login</NavLink>
  );
  return (
    <Router>
      <div>
        <NavLink to="/books">Books</NavLink>
        {authLink}
        {/* <NavLink to="/login">Login</NavLink> */}
      </div>
      <Switch>
        <Route
          path="/books"
          render={(props) => <Books {...props} loggedIn={loggedIn} />}
        />
        <Route
          path="/login"
          render={(props) => <Login {...props} login={login} />}
        />
      </Switch>
    </Router>
  );
}

export default App;
