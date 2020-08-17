import React, { Component } from 'react';
import { albums } from '../util/randomAlbums';
import AlbumShowcase from '../components/albums/AlbumShowcase';

//MUI
import withStyles from '@material-ui/core/styles/withStyles';

const styles = (theme) => ({
    ...theme.styleSpreading,
    container: {
        margin: ' 20px auto 0 auto',
        justifyContent: 'center'
    }
});

export class home extends Component {
    render() {
        let topAlbums = albums.slice(0, 10);
        let friendsAlbums = albums.slice(10, 20);
        return (
            <div>
                <AlbumShowcase albums={topAlbums} title={'Popular This Week'} />
                <div style={{ height: 20 }} />
                <AlbumShowcase
                    albums={friendsAlbums}
                    title={'Popular With Friends'}
                />
            </div>
        );
    }
}

export default withStyles(styles)(home);
