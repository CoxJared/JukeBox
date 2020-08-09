import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import home from './pages/home';
import themeObject from './util/theme';

//MUI
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { MuiThemeProvider } from '@material-ui/core';

const theme = createMuiTheme(themeObject);

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Router className="App">
        <Switch>
          <Route exact path="/" component={home} />
        </Switch>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
