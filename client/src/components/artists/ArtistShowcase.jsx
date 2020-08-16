import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import tempImage from '../../images/logo.png';

//MUI
import withStyles from '@material-ui/core/styles/withStyles';
import { Button, Paper } from '@material-ui/core';

const ARTIST_WIDTH = 200;

const styles = (theme) => ({
    ...theme.styleSpreading,
    container: {
        marginTop: 50,
        width: '100%',
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
    artists: {
        height: 220,
        display: 'flex',
        position: 'relative',
        transition: '.8s ease-in-out'
    },
    artist: {
        height: ARTIST_WIDTH + 20,
        width: ARTIST_WIDTH,
        margin: '0 0px 0 0',
        textDecoration: 'none',
        '& :hover': {
            opactiy: 0.5
        }
    },
    artistImage: {
        objectFit: 'cover',
        width: '80%'
    },
    artistName: {
        fontSize: 17,
        color: '#b9b950',
        fontWeight: 500,
        margin: '2px 0',
        width: '80%',
        textAlign: 'center'
    },
    artistArtist: {
        fontSize: 12,
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

export class ArtistShowcase extends Component {
    state = {
        position: 0
    };

    moveArtistsLeft = () => {
        let position = this.state.position;
        position += 5;
        this.setState({ position });
    };

    moveArtistsRight = () => {
        let position = this.state.position;
        position -= 5;
        this.setState({ position });
    };

    render() {
        const { classes, artists } = this.props;
        const { position } = this.state;
        const artistElements = artists.map((artist) => (
            <Link
                to={{
                    pathname: '/artist/' + artist.mbid,
                    state: { artist: artist }
                }}
                className="albumLink"
            >
                <div className={classes.artist}>
                    <img
                        src={
                            artist.image.find((img) => img.size == 'mega')[
                                '#text'
                            ] !== ''
                                ? artist.image.find(
                                      (img) => img.size == 'mega'
                                  )['#text']
                                : tempImage
                        }
                        className={classes.artistImage}
                        alt={`${artist.name || tempImage}`}
                    />
                    <h1 className={classes.artistName}>{artist.name}</h1>
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
                        onClick={this.moveArtistsLeft}
                    >
                        left
                    </Button>
                    <Button
                        disabled={
                            position ===
                            -((Math.floor(artists.length / 5) - 1) * 5)
                        }
                        className={classes.rightButton}
                        onClick={this.moveArtistsRight}
                    >
                        right
                    </Button>
                </div>
                <div
                    className={classes.artists}
                    style={{
                        left: `${position * ARTIST_WIDTH + 20}px`,
                        width: ARTIST_WIDTH * artists.length
                    }}
                >
                    {artistElements}
                </div>
            </Paper>
        );
    }
}

export default withStyles(styles)(ArtistShowcase);
