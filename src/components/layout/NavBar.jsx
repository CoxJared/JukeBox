import React, { Component } from 'react';

//MUI
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const navbarStyle = {
  container: {},
  button: {
    color: '#fff',
    fontSize: 20
  }
};

export class NavBar extends Component {
  render() {
    return (
      <Grid container direction="column" justify="center" alignItems="center">
        <Button style={navbarStyle.button}>home</Button>
        <Button style={navbarStyle.button}>explore</Button>
        <Button style={navbarStyle.button}>lists</Button>
        <Button style={navbarStyle.button}>activity</Button>
      </Grid>
    );
  }
}

export default NavBar;
