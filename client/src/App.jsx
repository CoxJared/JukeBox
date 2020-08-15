import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import home from './pages/home';
import search from './pages/search';
import artist from './pages/artist';
import activity from './pages/activity';
import user from './pages/user';
import settings from './pages/settings';
import themeObject from './util/theme';
import NavBar from './components/layout/NavBar';
import SearchBar from './components/layout/SearchBar';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

//redux
import { Provider } from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED } from './redux/types';
import { logoutUser, getUserData } from './redux/actions/userActions';

//MUI
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { MuiThemeProvider } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import UserAvatar from './components/layout/UserAvatar';
import album from './pages/album';

const theme = createMuiTheme(themeObject);

const appStyles = {
    container: {
        margin: ' 20px auto 0 auto',
        justifyContent: 'center'
        // height: '10000px'
    }
};

axios.defaults.baseURL =
    'https://us-central1-jukebox-84350.cloudfunctions.net/api';

const token = localStorage.FBIdToken;
if (token) {
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp * 1000 < Date.now()) {
        store.dispatch(logoutUser());
        window.location.href = '/login';
    } else {
        store.dispatch({ type: SET_AUTHENTICATED });
        axios.defaults.headers.common['Authorization'] = token;
        store.dispatch(getUserData());
    }
}

function App(props) {
    return (
        <MuiThemeProvider theme={theme}>
            <Provider store={store}>
                <Router>
                    <Grid container spacing={4} style={appStyles.container}>
                        <Grid item sm={2}>
                            <UserAvatar />
                            <NavBar />
                        </Grid>
                        <Grid item sm={8}>
                            <SearchBar />
                            <Switch>
                                <Route exact path="/" component={home} />
                                <Route
                                    exact
                                    path="/artist/:mbid"
                                    component={artist}
                                />
                                <Route
                                    path="/search/:search_query"
                                    component={search}
                                />
                                <Route exact path="/album" component={album} />
                                <Route
                                    exact
                                    path="/activity"
                                    component={activity}
                                />
                                <Route
                                    exact
                                    path="/user"
                                    component={user}
                                />
                                <Route
                                    exact
                                    path="/settings"
                                    component={settings}
                                />
                            </Switch>
                        </Grid>
                    </Grid>
                </Router>
            </Provider>
        </MuiThemeProvider>
    );
}

export default App;
