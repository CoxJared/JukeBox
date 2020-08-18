import React, { Component } from 'react';
import AlbumGrid from '../components/albums/AlbumGrid';

import { albums } from '../util/randomAlbums';

export class explore extends Component {
    render() {
        return (
            <div>
                <AlbumGrid title="Staff Picks" albums={albums} />
            </div>
        );
    }
}

export default explore;
