import React, { Component } from 'react';
import PropTypes from 'prop-types';

//redux
import { addAlbum, getAlbumRatings } from '../redux/actions/albumActions';

//MUI
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import AlbumRating from '../components/AlbumRatingChart';
import UserAvatar from '../components/layout/UserAvatar';
import UserRating from '../components/UserRating';
import { connect } from 'react-redux';

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
    }
});

const _api_key = process.env.REACT_APP_LASTFM_API_KEY;

export class album extends Component {
    constructor(props) {
        super(props);
        const { album, artist } = props.location.state;
        this.state = { trackListOpened: false, addedToDb: false };
        this.getInfoFromApiRequest(album, artist);
    }

    addInfoToDatabase() {
        this.setState({ addedToDb: true });
        let album = this.state.album;
        let newAlbum = {
            name: album.name,
            artist: album.artist,
            image: album.image.find((img) => img.size === 'mega')['#text'],
            mbid: album.mbid || ''
        };
        this.props.addAlbum(newAlbum);
        this.props.getAlbumRatings(newAlbum);
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

    render() {
        const { classes } = this.props;
        const { album } = this.state;

        const ratings = [2, 3, 5, 4, 7, 22, 33, 94, 36, 54, 30];

        if (album) {
            if (!this.state.addedToDb) {
                this.addInfoToDatabase();
            }
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
                                <Typography
                                    className={classes.artist}
                                    color="primary"
                                >
                                    {album.artist}
                                </Typography>
                                <Typography className={classes.albumText}>
                                    listeners: {album.listeners}
                                </Typography>
                                <Typography className={classes.albumText}>
                                    playcount: {album.playcount}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <UserRating />
                            </Grid>
                        </Grid>
                    </Paper>
                    <AlbumRating ratings={ratings} />
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

album.propTypes = {
    addAlbum: PropTypes.func.isRequired,
    getAlbumRatings: PropTypes.func.isRequired
};

// const mapActionsToProps = {
//     addAlbum
// };

export default connect(null, { addAlbum, getAlbumRatings })(
    withStyles(styles)(album)
);
