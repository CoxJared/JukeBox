import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//MUI
import withStyles from '@material-ui/core/styles/withStyles';
import { Button, Paper } from '@material-ui/core';

const ALBUM_WIDTH = 200;
const ALBUM_TITLE_HEIGHT = 40;

const styles = (theme) => ({
    ...theme.styleSpreading,
    container: {
        marginTop: 50,
        width: ALBUM_WIDTH * 5 + 40,
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: '#212122',
        borderRadius: 10,
        boxShadow: '2px 2px 5px #000',
        padding: 20
    },
    title: {
        fontSize: 35,
        fontWeight: 350,
        color: '#ccc',
        margin: '0px 0 5px '
    },
    albums: {
        height: 220,
        display: 'flex',
        position: 'relative',
        transition: '.8s ease-in-out'
    },
    album: {
        height: `calc(100% - ${ALBUM_TITLE_HEIGHT}px)`,
        width: `${ALBUM_WIDTH}px`,
        margin: '0 0px 0 0'
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
    },
    buttons: {
        height: 30
    },
    leftButton: {
        // position: 'relative',
        width: 20,
        height: 20,
        color: '#770',
        pointer: 'cursor'
    },
    rightButton: {
        float: 'right',
        // position: 'absolute',
        height: 20,
        width: 20,
        color: '#770',
        pointer: 'cursor'
    }
});

export class AlbumShowcase extends Component {
    state = {
        position: 0
    };

    moveAlbumsLeft = () => {
        let position = this.state.position;
        position += 5;
        this.setState({ position });
    };

    moveAlbumsRight = () => {
        let position = this.state.position;
        position -= 5;
        this.setState({ position });
    };

    render() {
        const { classes, albums } = this.props;
        const { position } = this.state;
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
                className="albumLink"
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
                <h1 className={classes.title}>{this.props.title}</h1>
                <div className={classes.buttons}>
                    <Button
                        disabled={position === 0}
                        className={classes.leftButton}
                        onClick={this.moveAlbumsLeft}
                    >
                        left
                    </Button>
                    <Button
                        disabled={
                            position ===
                            -((Math.floor(albums.length / 5) - 1) * 5)
                        }
                        className={classes.rightButton}
                        onClick={this.moveAlbumsRight}
                    >
                        right
                    </Button>
                </div>
                <div
                    className={classes.albums}
                    style={{ left: `${position * ALBUM_WIDTH + 20}px` }}
                >
                    {albumElements}
                </div>
            </Paper>
        );
    }
}

export default withStyles(styles)(AlbumShowcase);
