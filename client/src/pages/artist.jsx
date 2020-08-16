import React, { Component } from 'react';
import axios from 'axios';
import tempAlbumImage from '../images/logo.png';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
// import GridList from '@material-ui/core/GridLIst';
import { GridList, GridListTile, GridListTileBar } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import withStyles from '@material-ui/core/styles/withStyles';
import { album } from './album';
import AlbumGrid from '../components/albums/AlbumGrid';

const _api_key = process.env.REACT_APP_LASTFM_API_KEY;

const styles = (theme) => ({
    ...theme.styleSpreading,
    container: {
        height: 300,
        width: 900,
        marginTop: 50,
        marginLeft: 100
    },
    artistInfo: {
        width: 570,
        height: 350,
        marginLeft: 20,
        marginBottom: 20,
        backgroundColor: '#212122',
        padding: '5px 15px',
        borderRadius: 10
    },
    albumImage: {
        width: 270,
        height: 300
    },
    albumList: {
        width: 900,
        backgroundColor: '#212122',
        padding: '5px 15px',
        borderRadius: 10,
        marginBottom: 20
    },
    trackList: {
        width: 900,
        backgroundColor: '#212122',
        padding: '5px 15px',
        borderRadius: 10
    },
    artistName: {
        color: '#fff',
        fontSize: 45,
        fontWeight: 450
    },
    infoText: {
        fontSize: 20
    },
    tracks: {
        //        width: 900,
        overflow: 'hidden'
    },
    track: {
        height: 20,
        width: 900,
        borderBottom: '1px solid #555',
        padding: '12px 0'
    },
    trackRowHead: {
        backgroundColor: '#212122',
        fontSize: 40,
        fontWeight: 300,
        color: '#fff'
    },
    trackName: {
        fontWeight: 300,
        fontSize: 20,
        color: '#aaa'
    },
    trackListeners: {
        fontWeight: 200,
        fontSize: 20,
        color: '#aaa'
    },
    trackPlaycount: {
        color: '#aaa',
        fontWeight: 200,
        fontSize: 20
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

export class artist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            images: [],
            genres: [],
            bio: '',
            tracks: [],
            albums: [],
            albumListOpened: true,
            trackListOpened: true,
            hasLoaded: false
        };
    }

    async componentDidMount() {
        const { mbid } = this.props.match.params;
        await this.setState({ mbid });
        // this.search_album();
        this.get_artist_info();
        this.get_top_albums();
        this.get_top_tracks();

        // this.get_spotify_artist_info();
        // this.setState({hasLoaded: false})
    }

    async get_spotify_artist_info() {
        // ///////// SPOTIFY
        // FIXME temp token from Spotify docs
        const token =
            'BQD2q8bXaDvKyAVQZz9Gm0j9KrrbdY7QQjE68SGgpE2wB8qejDh3Djmuc7ABoshyLbDtTyEtrwfryg6tBavTeoHqJ3GBH5Pmb43b0h6V7prRFqMhfnm5ZmlQe19d2twK960LO2K4MclK40Zq1NEhzOCberM';

        let config = {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            }
        };
        // Get's 'Radiohead'
        const ARTIST_ID = '4Z8W4fKeB5YxbusRsdQVPb';
        const EXAMPLE_URL = 'https://api.spotify.com/v1/artists/' + ARTIST_ID;
        // axios.get(`http://www.reddit.com/r/${this.props.subreddit}.json`)
        axios.get(EXAMPLE_URL, config).then((res) => {
            this.setState({
                images: res.data.images,
                genres: res.data.genres,
                name: res.data.name
            });
        });
        this.get_spotify_albums(EXAMPLE_URL, config);
        // axios.get(`http://www.reddit.com/r/${this.props.subreddit}.json`)
    }

    async get_spotify_albums(ARTIST_URL, config) {
        axios.get(ARTIST_URL + '/albums', config).then((res) => {
            this.setState({ albums: res.data.items });
            this.setState({ hasLoaded: true });
        });
    }

    /// Functions for LastFM grabbing
    async get_artist_info() {
        const ARTIST_URL = this.return_url('getinfo');

        axios.get(ARTIST_URL).then((res) => {
            // TODO need to handle redirects if artist cannot be found

            this.setState({
                images: res.data.artist.images,
                genres: res.data.artist.genres,
                name: res.data.artist.name,
                bio: res.data.artist.bio.summary
            });
            this.setState({ hasLoaded: true });
        });
    }

    async get_top_albums() {
        const ARTIST_URL = this.return_url('getTopAlbums');

        axios.get(ARTIST_URL).then((res) => {
            // TODO need to handle redirects if artist cannot be found
            const albums = res.data.topalbums.album.map((obj) => obj);
            this.setState({ albums });
            this.setState({ hasLoaded: true });
        });
    }

    async get_top_tracks() {
        const ARTIST_URL = this.return_url('gettoptracks');

        axios.get(ARTIST_URL).then((res) => {
            // TODO need to handle redirects if artist cannot be found
            const top_tracks = res.data.toptracks.track.map((obj) => obj);
            this.setState({ tracks: top_tracks });
            this.setState({ hasLoaded: true });
        });
    }

    return_url(method) {
        const ROOT_URL = 'http://ws.audioscrobbler.com';
        //const ARTIST_URL = ROOT_URL + '/2.0/?method=artist.'+ method +'&artist='+ artist_name +'&api_key=' + _api_key +'&format=json';
        const ARTIST_URL =
            ROOT_URL +
            '/2.0/?method=artist.' +
            method +
            '&mbid=' +
            this.state.mbid +
            '&api_key=' +
            _api_key +
            '&format=json';
        return ARTIST_URL;
    }

    handleAlbumListExpansion = () => {
        this.setState({ albumListOpened: !this.state.albumListOpened });
    };
    handleTrackListExpansion = () => {
        this.setState({ trackListOpened: !this.state.trackListOpened });
    };

    render() {
        const { classes } = this.props;
        let { hasLoaded } = this.state;
        let ArtistInfo;
        let AlbumElements;
        let AlbumImage;
        let Tracks;

        if (hasLoaded) {
            AlbumImage = (
                <div>
                    {this.state.albums[0] ? (
                        // Show most  popular album
                        <img
                            className={classes.albumImage}
                            src={this.state.albums[0].image[3]['#text']}
                        ></img>
                    ) : (
                        <div>Loading</div>
                    )}
                </div>
            );

            // AlbumElements = this.state.albums.map((album) => (
            //     <GridListTile cols={1} style={{ height: '300' }}>
            //         <img src={album.image[3]['#text']} />
            //         <GridListTileBar
            //             title={album.name}
            //             subtitle={<span>by: {this.state.name}</span>}
            //         ></GridListTileBar>
            //     </GridListTile>
            // ));

            ArtistInfo = (
                <div>
                    {this.state.name ? (
                        <Typography className={classes.artistName}>
                            {this.state.name}
                        </Typography>
                    ) : (
                        <h3>Loading...</h3>
                    )}
                    <p className={classes.infoText} style={{ color: 'white' }}>
                        {this.state.bio}
                    </p>
                </div>
            );
            Tracks = this.state.tracks.map((track, i) => (
                <TableRow key={track.name} classes={classes.trackRowHead}>
                    <TableCell
                        component="th"
                        scope="row"
                        className={classes.trackName}
                    >
                        {track.name}
                    </TableCell>
                    <TableCell className={classes.trackPlaycount}>
                        {track.playcount}
                    </TableCell>
                    <TableCell className={classes.trackListeners}>
                        {track.listeners}
                    </TableCell>
                </TableRow>
            ));
        } else {
            ArtistInfo = <h1>Is loading....</h1>;
        }

        return (
            <Grid
                container
                spacing={1}
                className={classes.container}
                direction="row"
                justify="center"
                alginItems="center"
                className={classes.container}
            >
                {AlbumImage}
                <Paper className={classes.artistInfo}>{ArtistInfo}</Paper>

                <AlbumGrid
                    albums={this.state.albums.map((album) => ({
                        artist: this.state.name,
                        name: album.name,
                        image: album.image[3]['#text'] || tempAlbumImage
                    }))}
                    title="Albums"
                />

                <Paper className={classes.trackList}>
                    <Typography
                        color="primary"
                        onClick={this.handleTrackListExpansion}
                    >
                        Track List
                    </Typography>
                    <TableContainer
                        component={Paper}
                        style={{
                            height: this.state.trackListOpened ? 'auto' : 0,
                            backgroundColor: '#212122'
                        }}
                    >
                        <Table
                            className={classes.tracks}
                            aria-label="a dense table"
                        >
                            <TableHead>
                                <TableRow className={classes.trackRowHead}>
                                    <TableCell
                                        component="th"
                                        scope="row"
                                        className={classes.trackName}
                                    >
                                        Track Name
                                    </TableCell>
                                    <TableCell
                                        className={classes.trackPlaycount}
                                    >
                                        Playcounts
                                    </TableCell>
                                    <TableCell
                                        className={classes.trackListeners}
                                    >
                                        Listeners
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>{Tracks}</TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Grid>
        );
    }
}
export default withStyles(styles)(artist);
