import React, { Component } from 'react';

//MUI
import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const styles = (theme) => ({
    ...theme.styleSpreading,
    container: {
        height: 300,
        width: 900,
        marginTop: 50,
        marginLeft: 100
    },
    albumImage: {
        width: 270,
        height: 270,
        backgroundColor: '#414142'
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
        backgroundColor: '#aaa',
        width: 300,
        height: 30,
        marginTop: 20
    },
    artist: {
        backgroundColor: '#b9b950',
        width: 200,
        height: 20,
        marginTop: 20
    },
    albumText: {
        backgroundColor: '#444',
        width: 200,
        height: 20,
        marginTop: 20
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
class AlbumSkeleton extends Component {
    render() {
        const { classes } = this.props;
        return (
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                className={classes.container}
            >
                <div className={classes.albumImage} />
                <Paper className={classes.albumInfo}>
                    <Grid
                        container
                        spacing={0}
                        className={classes.albumInfoGrid}
                    >
                        <Grid item xs={6} className={classes.albumInfoHalf}>
                            <div className={classes.albumName}></div>
                            <div
                                className={classes.artist}
                                color="primary"
                            ></div>
                            <div className={classes.albumText} />
                            <div className={classes.albumText} />
                            {/*<Typography className={classes.albumText}>
                            playcount: {album.playcount}
                        </Typography>  */}
                        </Grid>
                        <Grid item xs={6}>
                            {/* <UserRating
                            albumName={this.props.location.state.album}
                            artist={this.props.location.state.artist}
                        /> */}
                        </Grid>
                    </Grid>
                </Paper>
                {/* <AlbumRating
                ratings={ratings}
                albumName={this.props.location.state.album}
                artist={this.props.location.state.artist}
            />
            <Typography
                color="primary"
                className={classes.tracklistExpansion}
                onClick={this.handleTrackListExpansion}
            > */}
                {/* Tracklist
            </Typography> */}
                {/* <div
                className={classes.tracks}
                style={{
                    height: this.state.trackListOpened ? 'auto' : 0
                }}
            >
                {songs}
            </div> */}
            </Grid>
        );
    }
}

export default withStyles(styles)(AlbumSkeleton);
