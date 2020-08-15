import React, { Component } from 'react';
import axios from 'axios'
import { withStyles } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper'
import { Typography } from '@material-ui/core';
import AlbumShowcase from '../components/albums/AlbumShowcase';
import { albums } from '../util/randomAlbums';
import { album } from './album';
import UserRating from '../components/UserRating';


const _api_key = process.env.REACT_APP_LASTFM_API_KEY;

const styles = (theme) => ({
    ...theme.styleSpreading,
    container: {
        height: 300,
        width: 900,
        marginTop: 50,
        marginLeft: 100
    },
    userInfo: {
        width: 570,
        height: 350,
        marginLeft: 20,
        marginBottom: 20,
        backgroundColor: '#212122',
        padding: '5px 15px',
        borderRadius: 10
    },
    userImage: {
        width: 280,
        height: 280
    },
    userName: {
        color: '#fff',
        fontSize: 45,
        fontWeight: 450
    },
    infoText: {
        fontSize: 20
    },
    userReviews: {
        width: 900,
        height: 500,
        marginLeft: 20,
        marginTop: 20,
        marginBottom: 20,
        backgroundColor: '#212122',
        padding: '5px 15px',
        borderRadius:10
    },
    sectionTitle: {
        color: '#b9b950',
        fontSize: 35
    },
    reviewContainer: {
        width: 850,
        height: 200,
        backgroundColor: '#212122'
    },
    reviewImage:{
        height: 120,
        display: 'inline-block'
    },
    reviewAlbumTitle: {
        color: 'white',
        position: 'relative',
        fontSize: 15, 
        fontWeight: 300,
        margin: '2px 0'
    },
    reviewArtist: {
        fontSize: 15,
        fontWeight: 500,
        color: '#b9b950'
    },
    reviewText: {
        fontSize: 20,
        fontWeight: 200,
        color: 'white'
    },
    reviewRatingTitle: {
        margin: '0 auto',
        fontSize: 15,
        textAlign: 'center'
    }
});

function Review(props){
    return(
        <Grid container className={props.classes.reviewContainer}>
            <Grid item xs= {2}>
                <img className={props.classes.reviewImage} src={props.album.image} height='100%'></img>
                <h1 className={props.classes.reviewAlbumTitle}> Review of Titanic Rising</h1>
                <h1 className={props.classes.reviewArtist}> Weyes Blood</h1>
            </Grid>
            <Grid item>
                {/* <h1 className={props.classes.reviewRatingTitle}>My Rating: </h1> */}
                <p className={props.classes.reviewText}>My review is worthless. I copied my opinion off Pitchfork and Melon</p>
            </Grid>
        </Grid>
    )
}

export class user extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'Jar-jar Binks',
            fav_albums: []
        }
    }

    render() {
        const {classes} = this.props;
        let favAlbums = albums.slice(0,10); // TODO grab from profile  
//        console.log(F)

        return(
            <Grid  
                container
                spacing={1}
                className={classes.container}
                direction="row"
                justify="center"
                alignItems="center"
            >
                <img className={classes.userImage}
                    src='data:image/jpeg;base64,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' 
                ></img>
                <Paper className={classes.userInfo}>
                    <Typography className={classes.userName}>{this.state.name}</Typography>
                    <p className={classes.infoText} style={{color:'white'}}>Test bio goes here</p>
                </Paper>
                <AlbumShowcase albums={favAlbums} title={'Favourite Albums'} />
                <Paper className={classes.userReviews}>
                    <Typography className={classes.sectionTitle}> Recent Reviews</Typography>
                    <Review album={favAlbums[0]} classes={classes}/>
                    <Review album={favAlbums[1]} classes={classes}/>
                </Paper> 
                <Paper className={classes.friendsList}>
                    <h1> Friends go here</h1>
                </Paper>

            </Grid>
        )
    }
}

export default withStyles(styles)(user);