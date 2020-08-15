import React, { Component } from 'react';
import axios from 'axios'
import { withStyles } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper'
import { Typography } from '@material-ui/core';
import AlbumShowcase from '../components/albums/AlbumShowcase';
import { albums } from '../util/randomAlbums';
import Avatar from '@material-ui/core/Avatar';
import PropTypes from 'prop-types';


import { connect } from 'react-redux';

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
            fav_albums: [],
        }
    }

    render() {
        const {
            classes,
            user: {credentials}
        } = this.props;

        let favAlbums = albums.slice(0,10); // TODO grab from profile  
//        console.log(F)
        console.log(this.props)
//        console.log(credentials)

        return(
            <Grid  
                container
                spacing={1}
                className={classes.container}
                direction="row"
                justify="center"
                alignItems="center"
            >
                <Avatar className={classes.userImage} src={credentials.imageUrl}/>
                <Paper className={classes.userInfo}>
                    <Typography className={classes.userName}>{credentials.handle}</Typography>
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

user.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    user: state.user,
});


export default connect(
    mapStateToProps    
)(withStyles(styles)(user));