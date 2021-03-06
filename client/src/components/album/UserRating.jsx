import React, { Component } from 'react';
import PropTypes from 'prop-types';

//redux
import {
    getUserAlbumRating,
    submitUserAlbumRating
} from '../../redux/actions/albumActions';
import { connect } from 'react-redux';

//MUI
import withStyles from '@material-ui/core/styles/withStyles';
import { Typography } from '@material-ui/core';
import ReviewForm from './ReviewForm';

const styles = (theme) => ({
    ...theme.styleSpreading,
    container: {
        width: 300,
        height: '100%',
        paddingTop: 40
    },
    ratingTitle: {
        // width: '100%',
        margin: '0 auto',
        fontSize: 20,
        textAlign: 'center'
    },
    stars: {
        margin: '0px auto ',
        width: 200,
        display: 'flex'
    },
    halfStar: {
        height: 40,
        width: 20
    }
});

const ratings = [
    '0.5',
    '1.0',
    '1.5',
    '2.0',
    '2.5',
    '3.0',
    '3.5',
    '4.0',
    '4.5',
    '5.0'
];

function mouseInElement(mouse, element) {
    return (
        mouse.pageX >= element.x &&
        mouse.pageX <= element.x + element.width &&
        mouse.pageY >= element.y &&
        mouse.pageY <= element.y + element.height
    );
}

export class UserRating extends Component {
    constructor() {
        super();
        this.state = {
            albumRating: '0.5',
            hoverRating: '0.5',
            hoveringOnStars: false
        };
    }

    updateRating(rating) {
        this.setState({ albumRating: rating });
        const album = {
            name: this.props.albumName,
            artist: this.props.artist
        };
        this.props.submitUserAlbumRating(album, rating);
    }

    getRatings(album, userHandle) {
        if (album && userHandle) {
            this.props.getUserAlbumRating(album, userHandle);
        }
    }

    componentDidMount() {
        const { user, albums } = this.props;
        const album = {
            name: this.props.albumName,
            artist: this.props.artist
        };
        this.getRatings(album, user.credentials.handle);
        let handleMouseMove = (event) => {
            try {
                let starsContainer = document
                    .getElementById('stars')
                    .getBoundingClientRect();

                event = event || window.event; // IE-ism
                if (mouseInElement(event, starsContainer)) {
                    if (!this.state.hoveringOnStars) {
                        this.setState({ hoveringOnStars: true });
                    }
                    ratings.forEach((rating) => {
                        let starContainer = document
                            .getElementById(`starid-${rating}`)
                            .getBoundingClientRect();
                        if (mouseInElement(event, starContainer)) {
                            this.setState({ hoverRating: rating });
                        }
                    });
                } else {
                    if (this.state.hoveringOnStars) {
                        this.setState({ hoveringOnStars: false });
                    }
                }
            } catch {}
        };
        document.onmousemove = handleMouseMove;
    }

    render() {
        const { classes, albums } = this.props;
        const userRatingFromDB = this.props.albums.userRating.value;
        let albumRating = this.state.hoveringOnStars
            ? this.state.hoverRating
            : userRatingFromDB;
        if (albumRating === '' || albumRating === undefined) {
            albumRating = '0.0';
        }

        const title =
            albums.loading.rating === undefined || albums.loading.rating
                ? 'Loading...'
                : userRatingFromDB === undefined || userRatingFromDB === ''
                ? 'Unrated'
                : 'My Rating';

        const stars = (
            <div className={classes.stars} id="stars">
                {ratings.map((rating) => (
                    <div
                        className={`${
                            rating % 1 === 0 ? 'right' : 'left'
                        }Star  ${classes.halfStar}`}
                        id={`starid-${rating}`}
                        style={
                            rating > albumRating
                                ? {
                                      filter: 'grayscale(100%)',
                                      opacity: '0.1'
                                  }
                                : {}
                        }
                        onClick={() => {
                            this.updateRating(rating);
                        }}
                    />
                ))}
            </div>
        );

        return (
            <div className={classes.container}>
                <Typography color="primary" className={classes.ratingTitle}>
                    {title}
                </Typography>
                {stars}
            </div>
        );
    }
}

UserRating.propTypes = {
    getUserAlbumRating: PropTypes.func.isRequired,
    albums: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    user: state.user,
    albums: state.albums
});

const mapActionsToProps = (state) => ({
    getUserAlbumRating: state.getUserAlbumRating,
    submitUserAlbumRating: state.submitUserAlbumRating
});

export default connect(mapStateToProps, {
    getUserAlbumRating,
    submitUserAlbumRating
})(withStyles(styles)(UserRating));
