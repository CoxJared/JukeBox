import React, { Component } from 'react';

//Temporary album info to be replaces with info from api
import titanicRising from '../../images/tempAlbumCovers/titanicrising-weyesblood.jpg';
import twinFantasy from '../../images/tempAlbumCovers/twinfantasy-carseatheadsrest.png';
import anotherGreenWorld from '../../images/tempAlbumCovers/anothergreenworld-brianeno.jpeg';
import betheCowboy from '../../images/tempAlbumCovers/mitski-bethecowboy.jpeg';
import pomPom from '../../images/tempAlbumCovers/pompom-arielpink.jpeg';
import sweetTrip from '../../images/tempAlbumCovers/sweettrip-veolcity.jpeg';
import virtue from '../../images/tempAlbumCovers/virtue-thevoidz.jpeg';
import againstAllLogic from '../../images/tempAlbumCovers/againstalllogic.jpeg';
import galacticMelt from '../../images/tempAlbumCovers/galacticmelt.jpg';
import closer from '../../images/tempAlbumCovers/closer.jpg';
const albums = [
    {
        image: titanicRising,
        name: 'Titanic Rising',
        artist: 'Weyes Blood'
    },
    {
        image: twinFantasy,
        name: 'Twin Fantasy',
        artist: 'Car Seat Headrest'
    },
    {
        image: anotherGreenWorld,
        name: 'Another Green World',
        artist: 'Brian Eno'
    },
    {
        image: pomPom,
        name: 'Pom Pom',
        artist: 'Ariel Pink'
    },
    {
        image: virtue,
        name: 'Virtue',
        artist: 'The Voidz'
    }
];
const albums2 = [
    {
        image: sweetTrip,
        name: 'veolcity : design : comfort.',
        artist: 'Sweet Trip'
    },
    {
        image: againstAllLogic,
        name: '2017-2019',
        artist: 'Against All logic'
    },
    {
        image: betheCowboy,
        name: 'Be The Cowboy',
        artist: 'Mitski'
    },
    {
        image: galacticMelt,
        name: 'Galactic Melt',
        artist: 'Com Truise'
    },
    {
        image: closer,
        name: 'Closer',
        artist: 'Joy division'
    }
];
// import twinFantasy from '../../../images/tempAlbumCovers';

const albumStyles = {
    container: {
        marginTop: 40
    },
    title: {
        fontSize: 35,
        fontWeight: 300,
        color: '#aaa',
        margin: '20px 0'
    },
    albums: {
        height: 180,
        display: 'flex'
    },
    album: {
        height: '100%',
        margin: '0 25px 0 0'
    },
    albumImage: {
        objectFit: 'cover',
        height: '100%'
    },
    albumName: {
        fontSize: 15,
        color: '#fff',
        fontWeight: 300,
        margin: '2px 0'
    },
    albumArtist: {
        fontSize: 15,
        fontWeight: 500,
        color: '#b9b950'
    }
};

export class AlbumShowcase extends Component {
    render() {
        const albumElements = albums.map((album) => (
            <div style={albumStyles.album}>
                <img src={album.image} style={albumStyles.albumImage} />
                <h1 style={albumStyles.albumName}>{album.name}</h1>
                <h2 style={albumStyles.albumArtist}>{album.artist}</h2>
            </div>
        ));
        const albumElements2 = albums2.map((album) => (
            <div style={albumStyles.album}>
                <img src={album.image} style={albumStyles.albumImage} />
                <h1 style={albumStyles.albumName}>{album.name}</h1>
                <h2 style={albumStyles.albumArtist}>{album.artist}</h2>
            </div>
        ));

        return (
            <div style={albumStyles.container}>
                <h1 style={albumStyles.title}>Popular this week</h1>
                <div style={albumStyles.albums}>{albumElements}</div>
                <div style={{ height: 60 }} />
                <h1 style={albumStyles.title}>Popular with friends</h1>
                <div style={albumStyles.albums}>{albumElements2}</div>
            </div>
        );
    }
}

export default AlbumShowcase;
