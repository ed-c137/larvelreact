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

function App() {
  return (
    <Router>
      <div>
        <NavLink to="/books">Books</NavLink>
      </div>
      <Switch>
        <Route path="/books" component={Books} />
      </Switch>
    </Router>
  );
}

export default App;
