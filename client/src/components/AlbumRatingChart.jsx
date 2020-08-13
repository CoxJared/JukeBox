import React, { Component } from 'react';
import PropTypes from 'prop-types';

//redux
import { getAlbumRatings } from '../redux/actions/albumActions';
import { connect } from 'react-redux';

//MUI
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
    ...theme.styleSpreading,
    ratingsChart: {
        width: '100%',
        position: 'relative',
        backgroundColor: '#19191b',
        display: 'flex',
        padding: 15,
        marginTop: 20
    },
    ratingBar: {
        width: 50,
        backgroundColor: '#e9e950',
        margin: '0 3px'
    },
    ratingBarTop: {
        width: 50,
        backgroundColor: '#19191b'
    },
    ratingsTitle: {
        color: '#e9e950',
        fontSize: 15,
        fontWeight: 400,
        position: 'absolute',
        top: 10,
        left: 15
    },
    avgRatingContainer: {
        width: 200,
        height: 200,
        margin: 20
    },
    avgRating: {
        color: '#fff',
        fontSize: 45,
        fontWeight: 500,
        width: '100%',
        textAlign: 'center'
    },
    ratingsCount: {
        color: '#aaa',
        fontSize: 15,
        width: '100%',
        textAlign: 'center'
    }
});

export class AlbumRatingChart extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.getAlbumRatingsFromDb();
    }

    getAlbumRatingsFromDb() {
        let album = {
            name: this.props.albumName,
            artist: this.props.artist
        };
        let user = this.props.user;
        this.props.getAlbumRatings(album, user.credentials.userHandle);
    }

    createBarChartElements = (ratings) => {
        const { classes } = this.props;

        const ratingCount = ratings.reduce(
            (acc, ratings) => (acc += ratings),
            0
        );
        const avgRating =
            Math.round(
                (ratings.reduce((acc, rating, i) => (acc += rating * i), 0) /
                    ratingCount) *
                    10
            ) / 20;

        let max = Math.max(...ratings);
        let HEIGHT = 140;

        let elements =
            ratingCount !== 0 ? (
                ratings.map((rating) => (
                    <div
                        className={this.props.classes.ratingBar}
                        style={{ height: HEIGHT }}
                    >
                        <div
                            className={this.props.classes.ratingBarTop}
                            //Added plus one so the bars never have 0 height which would look weird
                            style={{
                                height: (HEIGHT * (max - rating)) / max + 20
                            }}
                        />
                    </div>
                ))
            ) : (
                <div />
            );
        return (
            <div
                className={this.props.classes.ratingsChart}
                style={{ height: HEIGHT }}
            >
                {elements}
                <h1 className={classes.ratingsTitle}>Ratings</h1>
                <div className={classes.avgRatingContainer}>
                    <Typography className={classes.avgRating}>
                        {avgRating}
                    </Typography>
                    <Typography className={classes.ratingsCount}>
                        {ratingCount} ratings
                    </Typography>
                </div>
            </div>
        );
    };

    render() {
        const { albums } = this.props;

        const ratings = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        let dbRatings = this.props.albums.albumRatings.ratings;
        if (dbRatings) {
            dbRatings.forEach((rating) => {
                let index = Number(rating.value) * 2;
                ratings[index]++;
            });
        }

        if (albums.loading.ratings === undefined || albums.loading.ratings) {
            return <h1>loading</h1>;
        }

        const albumRatingChart = this.createBarChartElements(ratings);

        return <div>{albumRatingChart}</div>;
    }
}

AlbumRatingChart.propTypes = {
    getAlbumRatings: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    user: state.user,
    albums: state.albums
});

export default connect(mapStateToProps, { getAlbumRatings })(
    withStyles(styles)(AlbumRatingChart)
);
