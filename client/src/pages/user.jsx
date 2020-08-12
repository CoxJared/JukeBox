import React, { Component } from 'react';
import axios from 'axios'
import { withStyles } from "@material-ui/core";

const _api_key = process.env.REACT_APP_LASTFM_API_KEY;

const styles = (theme) => ({
    ...theme.styleSpreading,
    container: {
        height: 300,
        width: 900,
        marginTop: 50,
        marginLeft: 100
    },
});

export class user extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            fav_albums: []
        }
    }

    render() {
        return(
            <div>
                <h1> USER</h1>
            </div>
        )
    }
}

export default withStyles(styles)(user);