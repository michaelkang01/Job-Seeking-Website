import React from "react";
import "tailwindcss/tailwind.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Navbar from "./components/Navbar";
import Search from "./pages/Search";
import SearchProfiles from "./pages/SearchProfiles";
import { AuthProvider } from "./context/AuthContext";
import SignInCallback from "./pages/SignInCallback";

import Jobsapplied from "./pages/Jobsapplied";

import Application from "./pages/Application";
import ChatSystem from "./pages/ChatSystem";


const App = () => {
  const main = (
    <div>
      <Navbar />
      {/* A <Switch> looks through its children <Route>s and
        renders the first one that matches the current URL. */}
      <Switch>
        <Route path="/signin/callback">
          <SignInCallback />
        </Route>
        <Route path="/signin">
          <SignIn />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/search">
          <Search />
        </Route>
        <Route path="/applied">
          <Jobsapplied />
        </Route>
        <Route path="/searchprofiles">
          <SearchProfiles/>
        </Route>
        <Route path="/messages">
          <ChatSystem />
        </Route>
        <Route exact
          path="/application/:id">
          <Application />
        </Route>
        <Route path="/">
          <Welcome />
        </Route>
      </Switch>
    </div>
  );
  return (
    <Router>
      <AuthProvider>{main}</AuthProvider>
    </Router>
  );
};

export default App;
