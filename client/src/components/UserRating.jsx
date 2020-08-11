import React, { Component } from 'react';
import star from '../images/star.png';

//MUI
import withStyles from '@material-ui/core/styles/withStyles';
import { mergeClasses } from '@material-ui/styles';

const styles = (theme) => ({
    ...theme.styleSpreading,
    container: {
        width: 300,
        height: '100%'
    },
    stars: {
        margin: 70,
        width: 250,
        display: 'flex'
    },
    halfStar: {
        height: 50,
        width: 25
    }
});

export class UserRating extends Component {
    constructor() {
        super();
        this.state = {
            albumRating: '3.5'
        };
    }

    updateRating(rating) {
        console.log('new rating', rating);
        this.setState({ albumRating: rating });
    }

    render() {
        const { classes } = this.props;
        const { albumRating } = this.state;

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
        const stars = (
            <div className={classes.stars}>
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
                        color="primary"
                    />
                ))}
            </div>
        );

        return <div> {stars}</div>;
    }
}

export default withStyles(styles)(UserRating);
