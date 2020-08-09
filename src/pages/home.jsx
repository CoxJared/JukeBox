import React, { Component } from 'react';
import NavBar from '../components/layout/NavBar';

import Grid from '@material-ui/core/Grid';
import SearchBar from '../components/layout/SearchBar';
import AlbumShowcase from '../components/albums/AlbumShowcase';

const homeStyles = {
  container: {
    margin: ' 50px auto',
    justifyContent: 'center'
  }
};

export class home extends Component {
  render() {
    return (
      <Grid container spacing={2} style={homeStyles.container}>
        <Grid item sm={3}>
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
