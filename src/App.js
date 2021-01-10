import React from 'react';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import ThemeProvider from '@material-ui/styles/ThemeProvider';

import theme from './theme';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Feed from './pages/Feed';

function App() {
  return (
    <div>
      <CssBaseline />
      <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <Route path="/login" exact render={() => <Login />} />
          <Route path="/signup" exact render={() => <Signup />} />
          <Route path="/" exact render={() => <Feed />} />
        </Switch>
      </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
