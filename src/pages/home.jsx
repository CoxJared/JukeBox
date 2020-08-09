import React, { Component } from 'react';
import NavBar from '../components/layout/NavBar';

import Grid from '@material-ui/core/Grid';
import SearchBar from '../components/layout/SearchBar';
import AlbumShowcase from '../components/layout/albums/AlbumShowcase';

const homeStyles = {
  container: {
    margin: ' 50px auto 0 auto',
    justifyContent: 'center'
  }
};

export class home extends Component {
  render() {
    return (
      <Grid container spacing={2} style={homeStyles.container}>
        <Grid item sm={2}>
          <NavBar />
        </Grid>
        <Grid item sm={7}>
          <SearchBar />
          <AlbumShowcase />
        </Grid>
      </Grid>
    );
  }
}

export default home;
