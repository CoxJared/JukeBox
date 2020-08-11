import React, { Component } from 'react';

import withStyles from '@material-ui/core/styles/withStyles';

import titanicRising from '../images/tempAlbumCovers/titanicrising-weyesblood.jpg';


const styles = (theme) => ({
  ...theme.styleSpreading,
  container: {
      margin: ' 20px auto 0 auto',
      justifyContent: 'center'
  }
});

const albumStyles = {
  container: {
      marginTop: 40
  },
  title: {
      fontSize: 35,
      fontWeight: 300,
      color: '#aaa',
      margin: '20px 0'
  },
  albums: {
      height: 180,
      display: 'flex'
  },
  album: {
      height: '100%',
      margin: '0 25px 0 0'
  },
  albumImage: {
      objectFit: 'cover',
      height: '100%'
  },
  albumName: {
      fontSize: 15,
      color: '#fff',
      fontWeight: 300,
      margin: '2px 0'
  },
  albumArtist: {
      fontSize: 15,
      fontWeight: 500,
      color: '#b9b950'
  }
};

export class activity extends Component {

  render() {
    return(
      <div style={albumStyles.container}>
        <h1 style={albumStyles.title}>Review for Titanic Rising </h1>
        <h2>Testing</h2> 
      </div>
    );
  }

}

export default withStyles(styles)(activity);