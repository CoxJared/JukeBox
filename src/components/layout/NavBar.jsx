import React, { Component } from 'react';

//MUI
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const col = '#FFF05E';

const navbarStyle = {
  container: {
    // borderRight: '1px solid #FFF05E'
    marginTop: 150
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
        <Button style={navbarStyle.button}>home</Button>
        <Button style={navbarStyle.button}>explore</Button>
        <Button style={navbarStyle.button}>lists</Button>
        <Button style={navbarStyle.button}>activity</Button>
        <Button style={navbarStyle.button}>concerts</Button>
        <Button style={navbarStyle.button}></Button>
      </Grid>
    );
  }
}

export default NavBar;
