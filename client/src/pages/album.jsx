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
    }
});

const _api_key = process.env.REACT_APP_LASTFM_API_KEY;

export class album extends Component {
    constructor(props) {
        super(props);
        const { album, artist } = props.location.state;
        this.state = {};
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

    render() {
        const { classes } = this.props;
        const { album } = this.state;

        if (album) {
            console.log(album);
            let image = album.image.find((img) => img.size === 'mega')['#text'];
            console.log(image);

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
                </Grid>
            );
        } else {
            return <div />;
        }
    }
}

export default withStyles(styles)(album);
