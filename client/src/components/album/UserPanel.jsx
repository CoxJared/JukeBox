import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
    likeAlbum,
    heardAlbum,
    addListenLater
} from '../../redux/actions/albumActions';
import { connect } from 'react-redux';

import { FiClock, FiHeart, FiHeadphones} from "react-icons/fi";
import withStyles from '@material-ui/core/styles/withStyles';

// MUI
import Grid from '@material-ui/core/Grid';

const styles = (theme) => ({
    ...theme.styleSpreading,
    container: {
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
        this.likeAlbum = this.likeAlbum.bind(this);
        this.addToLater = this.addToLater.bind(this);
    }

    addToHeard(){
        const album = {
            name: this.props.albumName,
            artist: this.props.artist
        };
        this.props.heardAlbum(album);
    }

    likeAlbum() {
        const album = {
            name: this.props.albumName,
            artist: this.props.artist
        };
        this.props.likeAlbum(album);
    }

    addToLater() {
        const album = {
            name: this.props.albumName,
            artist: this.props.artist
        };
        this.props.addListenLater(album);
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
                <div 
                    className={classes.action_button}
                    onClick={this.likeAlbum}
                >
                    <span><FiHeart/>Fav</span>
                </div>
                <div className={classes.action_button}
                    onClick={this.addToLater}>
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

export default connect(mapStateToProps, {
    likeAlbum,
    heardAlbum,
    addListenLater
}) (withStyles(styles)(UserPanel));