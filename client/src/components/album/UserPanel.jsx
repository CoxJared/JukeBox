import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
    getUserAlbumRating,
    submitUserAlbumRating
} from '../../redux/actions/albumActions';
import { connect } from 'react-redux';

import { FiClock, FiHeart, FiHeadphones} from "react-icons/fi";
import withStyles from '@material-ui/core/styles/withStyles';

// MUI
import Grid from '@material-ui/core/Grid';

const styles = (theme) => ({
    ...theme.styleSpreading,
    container: {
//        text_align: 'c<FiHeadphones/>enter',
        // right: 0/,
        width: 300,
        // border-radius: '50px',
        marginTop: '5px',
        marginRight: '5px',
        borderRadius: '10px',
        backgroundColor: '#9ab',
    },
    action_button:{
        text_align: 'center',
        // border: '5px solid #ee3e80',
        height: 40,
        width: 80,
        padding: '0 auto 3px auto',
        margin: '3px auto 3px',
        cursor: 'pointer',
        min_width: 50,
        max_width: 300,
        max_height: 60,
    },
});

export class UserPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            albumName: this.props.albumName,
            artist: this.props.artist
        };
        this.addToHeard = this.addToHeard.bind(this);
    }

    componentDidMount() {
        console.log("MOUNTERD");
        console.log(this.props)
    }

    addToHeard(){
        // this.props.albumName
        console.log(this.state);
        // this.props.artist
    }

    addToLike() {

    }

    addToLater() {

    }

    render() {
        const {classes} = this.props;
        return(
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                className={classes.container} 
            >
                <div className={classes.action_button}
                    onClick={this.addToHeard}
                >
                    <FiHeadphones/>
                    <span >Heard</span>
                </div>
                <div className={classes.action_button}>
                    <span><FiHeart/>Like</span>
                </div>
                <div className={classes.action_button}>
                    <span><FiClock/>Later</span>
                </div>
            </Grid>
        );
    }
}

UserPanel.propTypes = {
    albums: PropTypes.object.isRequired
};

const mapStateToProps=  (state) => ({
    user: state.user,
    albums:state.albums
});
const mapActionsToProps = (state) => ({
    getUserAlbumRating: state.getUserAlbumRating,
    submitUserAlbumRating: state.submitUserAlbumRating
});

export default connect(mapStateToProps, {
    getUserAlbumRating,
    submitUserAlbumRating
}) (withStyles(styles)(UserPanel));