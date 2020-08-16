import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//MUI
import withStyles from '@material-ui/core/styles/withStyles';
import { Paper } from '@material-ui/core';

const ALBUM_WIDTH = 170;
const ALBUM_TITLE_HEIGHT = 20;

const styles = (theme) => ({
    ...theme.styleSpreading,
    container: {
        backgroundColor: '#212122',
        marginTop: 50,
        width: '100%',
        padding: 20,
        justifyContent: 'center'
    },
    albumsTitle: {
        fontSize: 35,
        fontWeight: 350,
        color: '#ccc',
        margin: '0px 0 20px 18px'
    },
    albums: {
        // height: 600,
        display: 'flex',
        flexWrap: 'wrap',
        width: ALBUM_WIDTH * 6,
        position: 'relative',
        transition: '.8s ease-in-out',
        margin: 'auto'
    },
    album: {
        height: ALBUM_WIDTH + 30,
        width: `${ALBUM_WIDTH}px`
    },
    albumLink: {
        '& :hover': {
            opacity: 0.9
        }
    },
    albumImage: {
        objectFit: 'cover',
        width: '90%'
    },
    albumName: {
        fontSize: 12,
        color: '#fff',
        fontWeight: 300,
        margin: '1px 0'
    },
    albumArtist: {
        fontSize: 12,
        fontWeight: 500,
        color: '#b9b950'
    }
});

export class AlbumGrid extends Component {
    render() {
        const { albums, classes } = this.props;
        const albumElements = albums.map((album) => (
            <Link
                to={{
                    pathname: '/album',
                    state: {
                        album: album.name,
                        artist: album.artist
                    }
                }}
                style={{ textDecoration: 'none' }}
                className={classes.albumLink}
            >
                <div className={classes.album}>
                    <img
                        src={album.image}
                        className={classes.albumImage}
                        alt={`${album.name}`}
                    />
                    <h1 className={classes.albumName}>{album.name}</h1>
                    <h2 className={classes.albumArtist}>{album.artist}</h2>
                </div>
            </Link>
        ));

        return (
            <Paper className={classes.container}>
                <h1 className={classes.albumsTitle}>{this.props.title}</h1>
                <div className={classes.albums}>{albumElements}</div>
            </Paper>
        );
    }
}

export default withStyles(styles)(AlbumGrid);
