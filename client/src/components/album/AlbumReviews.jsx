import React, { Component } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

//redux
import { getAlbumReviews } from '../../redux/actions/albumActions';
import { connect } from 'react-redux';

//MUI
import withStyles from '@material-ui/core/styles/withStyles';
import { Paper, Avatar } from '@material-ui/core';

const styles = (theme) => ({
    ...theme.styleSpreading,
    container: {
        width: 900,
        position: 'relative',
        padding: 20
    },
    review: {
        width: 860,
        padding: 20,
        backgroundColor: '#282828'
    },
    user: {
        display: 'flex'
    },
    avatar: {
        width: 40,
        height: 40,
        marginBottom: 20
    },
    userHandle: {
        fontSize: 20,
        color: '#e9e950',
        margin: '10px 10px 0 10px'
    },
    dateTime: {
        fontSize: 10,
        color: '#777',
        marginTop: 20
    },
    body: {
        color: '#ccc'
    },
    loadingPaper: {
        width: 900,
        position: 'relative',
        padding: 20,
        backgroundColor: '#333'
    },
    loadingTitle: {
        color: '#999950',
        fontSize: 20
    }
});

class AlbumReviews extends Component {
    componentDidMount() {
        const albumName = this.props.albumName;
        const artist = this.props.artist;
        this.props.getAlbumReviews({ name: albumName, artist });
    }

    render() {
        dayjs.extend(relativeTime);
        const { reviews } = this.props.albums;
        const { classes } = this.props;
        let reviewElements;
        if (reviews) {
            reviewElements = reviews.map((review) => (
                <Paper className={classes.review}>
                    <div className={classes.user}>
                        <Avatar
                            className={classes.avatar}
                            src={review.userImage}
                        />
                        <h1 className={classes.userHandle}>
                            {review.userHandle}
                        </h1>
                        <h1 className={classes.dateTime}>
                            {dayjs(review.createdAt).fromNow()}
                        </h1>
                    </div>
                    <p className={classes.body}>{review.body}</p>
                </Paper>
            ));
        }
        if (this.props.albums.loading.reviews) {
            return (
                <Paper className={classes.loadingPaper}>
                    <h1 className={classes.loadingTitle}>Loading...</h1>
                </Paper>
            );
        } else {
            return <div className={classes.container}>{reviewElements}</div>;
        }
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
    albums: state.albums
});

export default connect(mapStateToProps, { getAlbumReviews })(
    withStyles(styles)(AlbumReviews)
);
