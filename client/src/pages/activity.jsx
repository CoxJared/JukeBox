import React, { Component } from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';

import titanicRising from '../images/tempAlbumCovers/titanicrising-weyesblood.jpg';
import Star from '../images/star.png';


const styles = (theme) => ({
  ...theme.styleSpreading,
  container: {
      margin:'40px',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'left',
      alignItems: 'left',
  },
    title: {
        fontSize: 30,
        fontWeight: 300,
        color: '#aaa',
    },

    text: {
      fontSize: 20,
      fontWeight: 300,
      color: '#aaa',
      margin: '5px',
    },

    year: {
      fontSize: 30,
      fontWeight: 300,
      color: 'rgb(112, 110, 110)',
      margin: '0 10px'
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
        margin: '10px',
        objectFit: 'cover',
        height: '300px'
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
    },
    userName: {
      margin: '10px 10px 0 0',
      fontSize: 15,
        fontWeight: 500,
        color: '#aaa',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'left',
        alignItems: 'center',
    },

    avatar:{
      width:'20px',
      height:'20px',
    },

    albumInfo: {
      backgroundColor: '#212122',
      padding: '5px 15px',
      margin: '10px',
      borderRadius: 10
    },

    starRating:{
      margin: '0',
      color:'green',
    },

    textBox:{
      fontSize: 15,
      fontWeight: 500,
      color: '#aaa',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'left',
      alignItems: 'center',
      margin: '0 0 10px 0',
    },

    faves: {
      fontSize: 20,
      fontWeight: 300,
      color: 'rgb(112, 110, 110)',
    },

    Star:{
      height: '10px',
      width:'10px,'
    }

});





export class activity extends Component {

  render() {
    const {classes} = this.props;
    return(
      <Grid container
      direction="row"
      justify="flex-start"
      alignItems="flex-start"> 
      <Paper elevation={3} className = {classes.albumInfo}>
        <div className={classes.container}>
          <img className={classes.albumImage} src={titanicRising} alt="Titanic Rising Album Cover"/>

          <div>
            <h2 className = {classes.userName}> 
              <Avatar src="/no-image.png" className = {classes.avatar} /> 
              <span> Owen Cox </span> 
            </h2>

            <img className = {classes.Star} src= {Star} alt="Star"/>

            <h1 className = {classes.textBox}>
            <h1 className={classes.title}>Titanic Rising </h1>
            <h1 className={classes.year}> 2019</h1> 
            </h1>
            <h2 className = {classes.text}>
              Great album lotta good songs super pleasent on the ears blahblahblahblah love the album artwork very nice and cool and wet.
            </h2>
            <h2 className = {classes.textBox}>
            <h2 className= {classes.text}> Favourite Tracks:</h2>
            <h2 className = {classes.faves}> Movies, Alot's Gonna Change, Evertime </h2>
            </h2>

          </div>
        </div>
      </Paper>
      </Grid>
    );
  }

}

export default withStyles(styles)(activity);