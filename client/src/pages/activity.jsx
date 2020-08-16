import React, { Component } from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';

import titanicRising from '../images/tempAlbumCovers/titanicrising-weyesblood.jpg';
import closer from '../images/tempAlbumCovers/closer.jpg';
import inrainbows from '../images/tempAlbumCovers/inrainbows.jpeg';
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
      margin: '15px',
      borderRadius: 10,
      width: '1500px'
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
    },

    Rating:{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'left',
      alignItems: 'center',
      margin:'5px',
    }
});

function displayStars({rating,classes}){
  if (rating == 1){
      return <div className = {classes.Rating}>
        <img className = {classes.Star} src= {Star} alt = ''/>
        </div>
      ;
  }
  else if (rating == 2){
      return <div className = {classes.Rating}>
      <img className = {classes.Star} src= {Star} alt = ''/>
      <img className = {classes.Star} src= {Star} alt = ''/>
      </div>
      ;
  }
  else if (rating == 3){
      return <div className = {classes.Rating}>
      <img className = {classes.Star} src= {Star} alt = ''/>
      <img className = {classes.Star} src= {Star} alt = ''/>
      <img className = {classes.Star} src= {Star} alt = ''/>
      </div>
      ;
  }
  else if (rating == 4){
      return <div className = {classes.Rating}>
      <img className = {classes.Star} src= {Star} alt = ''/>
      <img className = {classes.Star} src= {Star} alt = ''/>
      <img className = {classes.Star} src= {Star} alt = ''/>
      <img className = {classes.Star} src= {Star} alt = ''/>
      </div>
      ;
  }
  else if (rating == 5){
      return  <div className = {classes.Rating}>
      <img className = {classes.Star} src= {Star} alt = ''/>
      <img className = {classes.Star} src= {Star} alt = ''/>
      <img className = {classes.Star} src= {Star} alt = ''/>
      <img className = {classes.Star} src= {Star} alt = ''/>
      <img className = {classes.Star} src= {Star} alt = ''/>;
      </div>
  }
  else{
    return <div className = {classes.Rating}> No rating</div>
  }
  }



function WriteReview  ({title, year, albumCover, review, faves ,user, rate,  classes}) {
  // const {classes} = this.props;
  return(
    <Paper elevation={3} className = {classes.albumInfo}>
        <div className={classes.container}>
          <img className={classes.albumImage} src={albumCover} alt= {title}/>

          <div>
            <h2 className = {classes.userName}> 
              <Avatar src="/no-image.png" className = {classes.avatar} /> 
              <span> {user} </span> 
            </h2>

            {displayStars({rating:rate ,classes})}

            <h1 className = {classes.textBox}>
            <h1 className={classes.title}> {title} </h1>
            <h1 className={classes.year}> {year} </h1> 
            </h1>
            <h2 className = {classes.text}>
              {review}
            </h2>
            <h2 className = {classes.textBox}>
            <h2 className= {classes.text}> Favourite Tracks:</h2>
            <h2 className = {classes.faves}> {faves} </h2>
            </h2>

          </div>
        </div>
    </Paper>
  )
}

export class activity extends Component {

  render() {
    const {classes} = this.props;
    return(
    <Grid container
    direction="row"
    justify="flex-start"
    alignItems="flex-start"> 

        < WriteReview title = 'Titanic Rising' year = '2019' albumCover = {titanicRising} review = 'Good Stuff' faves = 'Movies' user = 'Owen Cox' rate = '5' classes = {classes}/>
        < WriteReview title = 'In Rainbows' year = '2007' albumCover = {inrainbows} review = 'Overrated garbage!!' faves = 'Nothing' user = 'Mochi' rate = '4' classes = {classes}/>
        < WriteReview title = 'Closer' year = '1980' albumCover = {closer} review = 'Such a Classic!' faves = 'Closer idk didnt listen' user = 'Jared' rate = '1' classes = {classes}/>
        {/* < displayStars rating = '5' classes = {classes}/> */}
    </Grid>
    );
  }

}
export default withStyles(styles)(activity);