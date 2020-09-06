import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
    likeAlbum,
    heardAlbum,
    addListenLater
} from '../../redux/actions/albumActions';
import { connect } from 'react-redux';

import { FiClock, FiHeart, FiHeadphones} from "react-icons/fi";
import {IconContext} from "react-icons";
import withStyles from '@material-ui/core/styles/withStyles';

// MUI
import Grid from '@material-ui/core/Grid';

const styles = (theme) => ({
    ...theme.styleSpreading,
    container: {
        width: 300,
        height: 80,
        justifyContent: 'center',
        marginTop: '5px',
        marginRight: '5px',
        borderRadius: '10px',
        backgroundColor: '#737475',
    },
    action_button:{
        textAlign: 'center',
        width: 80,
        padding: '5px auto 5px auto',
        // margin: '5px auto 5px',
        cursor: 'pointer',
        min_width: 50,
        max_width: 300,
    },
    button_text: {
        fontSize: '20px',
        fontWeight: 'bold',
        color: '#acadad',

    },
});

export class UserPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            albumName: this.props.albumName,
            artist: this.props.artist,
            hasHeard: 0,
            hasFav: 0,
            hasLater: 0
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
                <IconContext.Provider value={{color: '#acadad', height:'50px'}}>
                <div className={classes.action_button}
                    onClick={this.addToHeard}
                >
                    { (this.state.hasHeard) ?
                        <FiHeadphones size={48} style={{ fill: '#e9e950'}}/> :
                        <FiHeadphones size={48} />
                    }
                    <p className={classes.button_text}>Heard</p>
                </div>
                <div 
                    className={classes.action_button}
                    onClick={this.likeAlbum}
                >
                    { (this.state.hasFav) ?
                        <FiHeart size={48} style={{ fill: '#e9e950'}}/> :
                        <FiHeart size={48} />
                    }
                    <p className={classes.button_text}>Fav</p>
                </div>
                    <div className={classes.action_button}
                        onClick={this.addToLater}>
                        { (this.state.hasLater) ?
                            <FiClock size={48} style={{ fill: '#e9e950'}}/> :
                            <FiClock size={48} />
                        }
                        <p className={classes.button_text}> Later</p>
                </div>
                </IconContext.Provider>
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