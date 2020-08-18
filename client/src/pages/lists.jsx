import React, { Component } from 'react';
import { graemePicks, jaredPicks, owenPicks } from '../util/randomAlbums';
import AlbumShowcase from '../components/albums/AlbumShowcase';

export class lists extends Component {
    render() {
        return (
            <div>
                <AlbumShowcase
                    title="Graeme Picks"
                    albums={graemePicks}
                    userHandle="graeme"
                    userImage={
                        'https://firebasestorage.googleapis.com/v0/b/jukebox-84350.appspot.com/o/622734384.jpeg?alt=media'
                    }
                />
                <AlbumShowcase
                    title="Jared Picks"
                    albums={jaredPicks}
                    userHandle="jared"
                    userImage={
                        'https://firebasestorage.googleapis.com/v0/b/jukebox-84350.appspot.com/o/7901142359.png?alt=media'
                    }
                />
                <AlbumShowcase
                    title="Owen Picks"
                    albums={owenPicks}
                    userHandle="owen"
                    userImage={
                        'https://firebasestorage.googleapis.com/v0/b/jukebox-84350.appspot.com/o/3112198061.png?alt=media'
                    }
                />
            </div>
        );
    }
}

export default lists;
