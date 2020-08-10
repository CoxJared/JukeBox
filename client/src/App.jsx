import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import home from './pages/home';
import search from './pages/search';
import artist from './pages/artist';
import themeObject from './util/theme';
import Logo from './components/layout/Logo';
import NavBar from './components/layout/NavBar';
import SearchBar from './components/layout/SearchBar';

//MUI
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { MuiThemeProvider } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import UserAvatar from './components/layout/UserAvatar';

const theme = createMuiTheme(themeObject);

const appStyles = {
  container: {
    margin: ' 20px auto 0 auto',
    justifyContent: 'center'
  }
};

function App(props) {
  return (
    <MuiThemeProvider theme={theme}>
      <Router className="App">
        <Grid container spacing={4} style={appStyles.container}>
          <Grid item sm={2}>
            <Logo />
            <UserAvatar />
            <NavBar />
          </Grid>
          <Grid item sm={8}>
            <SearchBar />
            <Switch>
              <Route exact path="/" component={home} />
              <Route path="/artist/:mbid" component={artist} />
              <Route path="/search/:search_query" component={search} />

            </Switch>
          </Grid>
        </Grid>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
