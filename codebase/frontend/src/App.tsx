import React from 'react';
import "tailwindcss/tailwind.css"
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Welcome from "./pages/Welcome";
import SignIn from "./pages/SignIn";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/signin">
            <SignIn />
          </Route>
          <Route path="/">
            <Welcome />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
