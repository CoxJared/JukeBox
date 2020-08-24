import React, { Component } from 'react';

//MUI
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const navbarStyle = {
    container: {
        // borderRight: '1px solid #FFF05E'
        marginTop: 10
    },
    button: {
        color: '#888',
        fontSize: 20,
        margin: '5px 0'
    }
};

export class NavBar extends Component {
    render() {
        return (
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
                style={navbarStyle.container}
            >
                <Button style={navbarStyle.button} component={Link} to="/">
                    home
                </Button>
                <Button
                    style={navbarStyle.button}
                    component={Link}
                    to="/explore"
                >
                    explore
                </Button>
                <Button style={navbarStyle.button} component={Link} to="/lists">
                    lists
                </Button>
                <Button
                    style={navbarStyle.button}
                    component={Link}
                    to="/activity"
                >
                    activity
                </Button>
                <Button style={navbarStyle.button}>concerts</Button>
                <Button style={navbarStyle.button} component={Link} to="/user">
                    Profile
                </Button>
                <Button
                    style={navbarStyle.button}
                    component={Link}
                    to="/settings"
                >
                    Settings
                </Button>
            </Grid>
        );
    }
}

export default NavBar;
