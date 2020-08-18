import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AlbumSkeleton from '../components/skeletons/AlbumSkeleton';
import ReviewForm from '../components/album/ReviewForm';
import { Link } from 'react-router-dom';

//redux
import {
    addAlbum,
    getAlbumRatings,
    getUserAlbumRating,
    setAlbum
} from '../redux/actions/albumActions';

//MUI
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import AlbumRating from '../components/album/AlbumRatingChart';
import UserRating from '../components/album/UserRating';
import { connect } from 'react-redux';
import AlbumReviews from '../components/album/AlbumReviews';

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
    albumInfoGrid: {
        display: 'flex',
        flexGrow: 1
    },
    albumInfoHalf: {
        position: 'relative',
        width: '50%'
    },
    albumName: {
        color: '#fff',
        fontSize: 40,
        lineHeight: '1.1em'
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
    ratingsTitle: {
        color: '#e9e950',
        fontSize: 15,
        fontWeight: 400,
        width: 900,
        textAlign: 'left',
        margin: '30px 0 10px 0'
    }
});

export class album extends Component {
    constructor(props) {
        super(props);

        this.state = { trackListOpened: false, addedToDb: false };
    }

    componentDidMount() {
        if (this.props.location.state) {
            const { album, artist } = this.props.location.state;
            this.loadAlbumData(album, artist);
        } else {
            this.setState({ album: this.props.albums.album });
        }
    }

    addInfoToDatabase() {}

    async loadAlbumData(albumName, artist) {
        const ROOT_URL = 'https://ws.audioscrobbler.com';
        const _api_key = this.props.user.API_KEY;
        const ALBUM_URL = `${ROOT_URL}/2.0/?method=album.getinfo&api_key=${_api_key}&artist=${artist}&album=${albumName}&format=json`;
        const response = await fetch(ALBUM_URL);
        if (response.ok) {
            const data = await response.json();

            this.setState({ album: data.album });

            let album = data.album;
            let newAlbum = {
                name: album.name,
                artist: album.artist,
                image: album.image.find((img) => img.size === 'mega')['#text'],
                mbid: album.mbid || ''
            };
            this.props.setAlbum(newAlbum);
            this.props.addAlbum(newAlbum);
            this.props.getUserAlbumRating(
                album,
                this.props.user.credentials.handle
            );
        }
    }

    handleTrackListExpansion = () => {
        this.setState({ trackListOpened: !this.state.trackListOpened });
    };

    render() {
        const { classes } = this.props;
        const { album } = this.state;
        const albums = this.props.albums;

        //TODO update dis
        const ratings = [2, 3, 5, 4, 7, 22, 33, 94, 36, 54, 30];

        if (albums.loading.album === undefined || albums.loading.album) {
            return <AlbumSkeleton />;
        }

        if (album) {
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
                        <Grid
                            container
                            spacing={0}
                            className={classes.albumInfoGrid}
                        >
                            <Grid item xs={6} className={classes.albumInfoHalf}>
                                <Typography className={classes.albumName}>
                                    {album.name}
                                </Typography>
                                <Link
                                    to={{
                                        pathname: '/artist/' + album.artist,
                                        state: { artist: album.artist }
                                    }}
                                    className="albumLink"
                                >
                                    <Typography
                                        className={classes.artist}
                                        color="primary"
                                    >
                                        {album.artist}
                                    </Typography>
                                </Link>
                                <Typography className={classes.albumText}>
                                    listeners: {album.listeners}
                                </Typography>
                                <Typography className={classes.albumText}>
                                    playcount: {album.playcount}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <UserRating
                                    albumName={this.props.location.state.album}
                                    artist={this.props.location.state.artist}
                                />
                            </Grid>
                        </Grid>
                    </Paper>
                    <h1 className={classes.ratingsTitle}>Reviews</h1>
                    <AlbumRating
                        ratings={ratings}
                        albumName={this.props.location.state.album}
                        artist={this.props.location.state.artist}
                    />
                    <h1
                        className={classes.ratingsTitle}
                        style={{ cursor: 'pointer' }}
                        onClick={this.handleTrackListExpansion}
                    >
                        Tracklist...
                    </h1>
                    <div
                        className={classes.tracks}
                        style={{
                            height: this.state.trackListOpened ? 'auto' : 0
                        }}
                    >
                        {songs}
                    </div>
                    <h1 className={classes.ratingsTitle}>Reviews</h1>
                    {this.props.user.authenticated ? <ReviewForm /> : <div />}
                    <AlbumReviews
                        albumName={this.props.location.state.album}
                        artist={this.props.location.state.artist}
                    />
                </Grid>
            );
        } else {
            return <AlbumSkeleton />;
        }
    }
}

album.propTypes = {
    addAlbum: PropTypes.func.isRequired,
    getAlbumRatings: PropTypes.func.isRequired,
    getUserAlbumRating: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    user: state.user,
    albums: state.albums
});

export default connect(mapStateToProps, {
    addAlbum,
    getAlbumRatings,
    getUserAlbumRating,
    setAlbum
})(withStyles(styles)(album));
