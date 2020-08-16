import React, { Component } from 'react';
import { albums } from '../util/randomAlbums';
import AlbumShowcase from '../components/albums/AlbumShowcase';
import AlbumGrid from '../components/albums/AlbumGrid';

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
        let friednsAlbuums = albums.slice(10, 21);
        return (
            <div>
                <AlbumShowcase albums={topAlbums} title={'Popular This Week'} />
                <div style={{ height: 20 }} />
                <AlbumShowcase
                    albums={friednsAlbuums}
                    title={'Popular With Friends'}
                />
                <AlbumGrid
                    albums={friednsAlbuums}
                    title={'Popular With Friends'}
                />
            </div>
        );
    }
}

export default withStyles(styles)(home);
