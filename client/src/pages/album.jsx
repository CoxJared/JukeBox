import React, { Component } from 'react';

//MUI
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';

const styles = (theme) => ({
    ...theme.styleSpreading,
    container: {
        height: 300,
        width: 900,
        marginTop: 50,
        marginLeft: 100
    },
    albumImage: {
        width: 270
    },
    albumInfo: {
        width: 570,
        height: 260,
        marginLeft: 20,
        backgroundColor: '#212122',
        padding: '5px 15px',
        borderRadius: 10
    },
    albumName: {
        color: '#fff',
        fontSize: 45,
        fontWeight: 450
    },
    artist: {
        fontSize: 20
    },
    albumText: {
        color: '#bbb'
    },
    tracklistExpansion: {
        marginTop: 10,
        fontSize: 15,
        fontWeight: 500,
        textAlign: 'left',
        float: 'left',
        width: '100%',
        cursor: 'pointer'
    },
    tracks: {
        width: 900,
        overflow: 'hidden'
    },
    track: {
        height: 20,
        width: 900,
        borderBottom: '1px solid #555',
        padding: '12px 0'
    },
    trackNumber: {
        display: 'inline',
        fontSize: 20,
        fontWeight: 200,
        color: '#aaa',
        marginRight: 10
    },
    trackName: {
        display: 'inline',
        fontWeight: 300,
        fontSize: 20,
        color: '#aaa'
    },
    trackLength: {
        display: 'inline',
        float: 'right',
        fontWeight: 200,
        // top: 0,
        textAlign: 'right',
        width: 300,
        fontSize: 20,
        color: '#aaa'
    },
    ratingsChart: {
        width: '100%',
        position: 'relative',
        backgroundColor: '#212122',
        display: 'flex',
        padding: 15,
        marginTop: 20
    },
    ratingBar: {
        width: 50,
        backgroundColor: '#e9e950',
        margin: '0 3px'
    },
    ratingBarTop: {
        width: 50,
        backgroundColor: '#212122'
    },
    ratingsTitle: {
        color: '#e9e950',
        fontSize: 15,
        fontWeight: 400,
        position: 'absolute',
        top: 10,
        left: 15
    },
    avgRatingContainer: {
        width: 200,
        height: 200,
        margin: 20
    },
    avgRating: {
        color: '#fff',
        fontSize: 45,
        fontWeight: 500,
        width: '100%',
        textAlign: 'center'
    },
    ratingsCount: {
        color: '#aaa',
        fontSize: 15,
        width: '100%',
        textAlign: 'center'
    }
});

const _api_key = process.env.REACT_APP_LASTFM_API_KEY;

export class album extends Component {
    constructor(props) {
        super(props);
        const { album, artist } = props.location.state;
        this.state = { trackListOpened: false };
        this.getInfoFromApiRequest(album, artist);
    }

    async getInfoFromApiRequest(albumName, artist) {
        const ROOT_URL = 'http://ws.audioscrobbler.com';
        const ALBUM_URL = `${ROOT_URL}/2.0/?method=album.getinfo&api_key=${_api_key}&artist=${artist}&album=${albumName}&format=json`;
        const response = await fetch(ALBUM_URL);
        if (response.ok) {
            const data = await response.json();
            this.setState({
                album: data.album
            });
        }
    }

    handleTrackListExpansion = () => {
        this.setState({ trackListOpened: !this.state.trackListOpened });
    };

    createBarChartElements = (ratings) => {
        const { classes } = this.props;

        const ratingCount = ratings.reduce(
            (acc, ratings) => (acc += ratings),
            0
        );
        const avgRating =
            Math.round(
                (ratings.reduce((acc, rating, i) => (acc += rating * i), 0) /
                    ratingCount) *
                    10
            ) / 10;

        let max = Math.max(...ratings);
        let HEIGHT = 140;
        console.log(max);
        console.log((HEIGHT / max) * (max - ratings[0]));
        console.log((HEIGHT / max) * (max - ratings[1]));
        console.log((HEIGHT / max) * (max - ratings[2]));
        console.log((HEIGHT / max) * (max - ratings[3]));
        console.log((HEIGHT / max) * (max - ratings[4]));
        console.log((HEIGHT / max) * (max - ratings[5]));

        let elements = ratings.map((rating) => (
            <div
                className={this.props.classes.ratingBar}
                style={{ height: HEIGHT }}
            >
                <div
                    className={this.props.classes.ratingBarTop}
                    style={{ height: (HEIGHT * (max - rating)) / max }}
                />
            </div>
        ));
        return (
            <div
                className={this.props.classes.ratingsChart}
                style={{ height: HEIGHT }}
            >
                {elements}
                <h1 className={classes.ratingsTitle}>Ratings</h1>
                <div className={classes.avgRatingContainer}>
                    <Typography className={classes.avgRating}>
                        {avgRating}
                    </Typography>
                    <Typography className={classes.ratingsCount}>
                        {ratingCount} ratings
                    </Typography>
                </div>
            </div>
        );
    };

    render() {
        const { classes } = this.props;
        const { album } = this.state;

        const ratings = [2, 3, 5, 4, 7, 22, 33, 94, 36, 54, 30];
        const ratingElements = this.createBarChartElements(ratings);
        console.log(ratingElements);

        if (album) {
            console.log(album);
            let image = album.image.find((img) => img.size === 'mega')['#text'];

            const songs = album.tracks.track.map((song, i) => (
                <div className={classes.track}>
                    <h1 className={classes.trackNumber}>{i}</h1>
                    <h1 className={classes.trackName}>{song.name}</h1>
                    <h1 className={classes.trackLength}>
                        {Math.floor(song.duration / 60)}:
                        {String(song.duration % 60).split('').length === 2
                            ? song.duration % 60
                            : '0' + (song.duration % 60)}
                    </h1>
                </div>
            ));

            return (
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    className={classes.container}
                >
                    <img className={classes.albumImage} src={image} />
                    <Paper className={classes.albumInfo}>
                        <Typography className={classes.albumName}>
                            {album.name}
                        </Typography>
                        <Typography className={classes.artist} color="primary">
                            {album.artist}
                        </Typography>
                        <Typography className={classes.albumText}>
                            listeners: {album.listeners}
                        </Typography>
                        <Typography className={classes.albumText}>
                            playcount: {album.playcount}
                        </Typography>
                    </Paper>
                    {ratingElements}
                    <Typography
                        color="primary"
                        className={classes.tracklistExpansion}
                        onClick={this.handleTrackListExpansion}
                    >
                        Tracklist
                    </Typography>
                    <div
                        className={classes.tracks}
                        style={{
                            height: this.state.trackListOpened ? 'auto' : 0
                        }}
                    >
                        {songs}
                    </div>
                </Grid>
            );
        } else {
            return <div />;
        }
    }
}

export default withStyles(styles)(album);
