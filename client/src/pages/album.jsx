import React, { Component } from 'react';

//MUI
import withStyles from '@material-ui/core/styles/withStyles';

const styles = (theme) => ({
    ...theme.styleSpreading
});

const _api_key = process.env.REACT_APP_LASTFM_API_KEY;

export class album extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    async getInfoFromApiRequest(albumName, artist) {
        const ROOT_URL = 'http://ws.audioscrobbler.com';
        const ALBUM_URL = `${ROOT_URL}/2.0/?method=album.getinfo&api_key=${_api_key}&artist=${artist}&album=${albumName}&format=json`;
        const response = await fetch(ALBUM_URL);
        if (response.ok) {
            const data = await response.json();
            this.setState({
                album: data
            });
        }
    }

    componentWillMount() {
        this.getInfoFromApiRequest('Believe', 'Cher');
    }

    render() {
        const { album } = this.state;

        console.log(album);

        return <div>hi</div>;
    }
}

export default withStyles(styles)(album);
