import React, { Component } from 'react';
import { staffPicks } from '../util/randomAlbums';
import AlbumShowcase from '../components/albums/AlbumShowcase';

export class lists extends Component {
    render() {
        return (
            <div>
                <AlbumShowcase
                    title="Staff Picks"
                    albums={staffPicks}
                    userHandle="graeme"
                    userImage={
                        'https://firebasestorage.googleapis.com/v0/b/jukebox-84350.appspot.com/o/622734384.jpeg?alt=media'
                    }
                />
                <AlbumShowcase
                    title="Staff Picks"
                    albums={staffPicks}
                    userHandle="jared"
                    userImage={
                        'https://firebasestorage.googleapis.com/v0/b/jukebox-84350.appspot.com/o/7901142359.png?alt=media'
                    }
                />
            </div>
        );
    }
}

export default lists;
