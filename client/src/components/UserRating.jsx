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
            albumRating: '3.5',
            hoverRating: '0.5',
            hoveringOnStars: false
        };
    }

    updateRating(rating) {
        console.log('new rating', rating);
        this.setState({ albumRating: rating });
    }

    checkMouseOverStar = () => {
        let handleMouseMove = (event) => {
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
        };
        document.onmousemove = handleMouseMove;
    };

    render() {
        const { classes } = this.props;
        const albumRating = this.state.hoveringOnStars
            ? this.state.hoverRating
            : this.state.albumRating;
        this.checkMouseOverStar();

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
                        color="primary"
                    />
                ))}
            </div>
        );

        return <div> {stars}</div>;
    }
}

export default withStyles(styles)(UserRating);
