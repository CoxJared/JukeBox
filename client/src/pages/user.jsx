import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import AlbumShowcase from '../components/albums/AlbumShowcase';
import { albums, jaredPicks } from '../util/randomAlbums';
import Avatar from '@material-ui/core/Avatar';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import AlbumGrid from '../components/albums/AlbumGrid';

import { connect } from 'react-redux';

const _api_key = process.env.REACT_APP_LASTFM_API_KEY;

const styles = (theme) => ({
    ...theme.styleSpreading,
    container: {
        marginTop: 50
    },
    userImage: {
        width: 270,
        height: 270
    },
    userInfo: {
        width: 570,
        height: 260,
        marginLeft: 20,
        backgroundColor: '#212122',
        padding: '5px 15px',
        borderRadius: 10
    },
    userHandle: {
        fontSize: 45,
        color: '#fff',
        fontWeight: 500
    },
    createdAt: {
        fontSize: 20,
        color: '#aaa'
    }
});

export class user extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'testing',
            fav_albums: []
        }
    }

    render() {
        dayjs.extend(relativeTime);
        let {
            user: { credentials: user },
            classes
        } = this.props;
        console.log(this.props.user.credentials);
        return (
            <div className={classes.container}>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    className={classes.container}
                >
                    <Avatar className={classes.userImage} src={user.imageUrl} />
                    <Paper className={classes.userInfo}>

                        <Typography className={classes.userHandle}>
                            {user.handle}
                        </Typography>
                        <Typography className={classes.createdAt}>
                            {dayjs(user.createdAt).fromNow()}
                        </Typography>
                    </Paper>
                </Grid>
                <AlbumShowcase albums={jaredPicks} title="Favourites" />
                <AlbumGrid title="My Music" albums={albums} />
            </div>
        );
    }
}

user.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    user: state.user
});

export default connect(mapStateToProps, null)(withStyles(styles)(user));
