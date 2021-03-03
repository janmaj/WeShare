import React, { useEffect } from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import { connect } from "react-redux";

import theme from "./theme";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Feed from "./pages/Feed";
import Home from "./pages/Home";
import * as actions from "./store/actions";

function App({ attemptAutoLogin, isAuth, ...props }) {
  useEffect(attemptAutoLogin, [attemptAutoLogin]);

  return (
    <div>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Switch>
            <Route path="/login" exact render={() => <Login />} />
            <Route path="/signup" exact render={() => <Signup />} />
            <Route
              path="/"
              exact
              render={() => (isAuth ? <Feed /> : <Home />)}
            />
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    attemptAutoLogin: () => dispatch(actions.autoLogin()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
