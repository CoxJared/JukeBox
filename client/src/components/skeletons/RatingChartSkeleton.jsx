import React, { Component } from 'react';

//MUI
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import { ThemeProvider } from '@material-ui/core';

const styles = (theme) => ({
    ...theme.styleSpreading,
    ratingsChart: {
        width: 900,
        position: 'relative',
        backgroundColor: '#19191b',
        display: 'flex',
        padding: 15,
        margin: '20px 0 0 100px'
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
        color: '#bbb',
        fontSize: 25,
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

export class RatingChartSkeleton extends Component {
    state = {
        ratings: [1, 2, 0, 1, 2, 3, 5, 8, 5, 2, 1, 0]
    };
    componentDidMount() {
        const loading = setInterval(this.updateState, 800);
    }

    updateState = () => {
        let temp = this.state.ratings;
        temp.unshift(temp.pop());
        this.setState({ rating: temp });
    };
    render() {
        const HEIGHT = 140;
        const max = 9;
        let elements = this.state.ratings.map((rating) => (
            <div
                className={this.props.classes.ratingBar}
                style={{ height: HEIGHT }}
            >
                <div
                    className={this.props.classes.ratingBarTop}
                    //Added plus one so the bars never have 0 height which would look weird
                    style={{
                        height: (HEIGHT * (max - rating)) / max - 2
                    }}
                />
            </div>
        ));

        const { classes } = this.props;
        return (
            <div
                className={this.props.classes.ratingsChart}
                style={{ height: 140 }}
            >
                {elements}
                <div className={classes.avgRatingContainer}>
                    <Typography className={classes.avgRating}>
                        Loading...
                    </Typography>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(RatingChartSkeleton);
