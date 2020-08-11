import React, { Component } from 'react';

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
            ) / 10;

        let max = Math.max(...ratings);
        let HEIGHT = 140;

        let elements = ratings.map((rating) => (
            <div
                className={this.props.classes.ratingBar}
                style={{ height: HEIGHT }}
            >
                <div
                    className={this.props.classes.ratingBarTop}
                    //Added plus one so the bars never have 0 height which would look weird
                    style={{ height: (HEIGHT * (max - rating)) / max + 1 }}
                />
            </div>
        ));
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
        const { ratings } = this.props;

        const albumRatingChart = this.createBarChartElements(ratings);

        return <div>{albumRatingChart}</div>;
    }
}

export default withStyles(styles)(AlbumRatingChart);
