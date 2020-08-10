//Temporary album info to be replaces with info from api
import titanicRising from '../images/tempAlbumCovers/titanicrising-weyesblood.jpg';
import twinFantasy from '../images/tempAlbumCovers/twinfantasy-carseatheadsrest.png';
import anotherGreenWorld from '../images/tempAlbumCovers/anothergreenworld-brianeno.jpeg';
import betheCowboy from '../images/tempAlbumCovers/mitski-bethecowboy.jpeg';
import pomPom from '../images/tempAlbumCovers/pompom-arielpink.jpeg';
import sweetTrip from '../images/tempAlbumCovers/sweettrip-veolcity.jpeg';
import virtue from '../images/tempAlbumCovers/virtue-thevoidz.jpeg';
import againstAllLogic from '../images/tempAlbumCovers/againstalllogic.jpeg';
import galacticMelt from '../images/tempAlbumCovers/galacticmelt.jpg';
import closer from '../images/tempAlbumCovers/closer.jpg';
import normaRockwell from '../images/tempAlbumCovers/normanfuckingrockwell.jpeg';
import menitrust from '../images/tempAlbumCovers/showmehow.jpeg';
import tusk from '../images/tempAlbumCovers/tusk.jpeg';
import flylo from '../images/tempAlbumCovers/yourdead.jpeg';
import bonito from '../images/tempAlbumCovers/bonito.jpeg';
import inrainbows from '../images/tempAlbumCovers/inrainbows.jpeg';
import low from '../images/tempAlbumCovers/low.jpeg';
import powersthatb from '../images/tempAlbumCovers/thepowersthatb.jpeg';
import kaputt from '../images/tempAlbumCovers/kaputt.jpeg';
import pureComedy from '../images/tempAlbumCovers/purecomedy.jpeg';

export const albums = (function() {
    let albums = [
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
        },
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
        },
        {
            image: normaRockwell,
            name: 'Norman Fucking Rockwell',
            artist: 'Lana Del Rey'
        },
        {
            image: tusk,
            name: 'Tusk',
            artist: 'Fleetwood Mac'
        },
        {
            image: menitrust,
            name: 'Show Me How',
            artist: 'Men I Trust'
        },
        {
            image: flylo,
            name: "You're Dead!",
            artist: 'Flying Lotus'
        },
        {
            image: bonito,
            name: 'Bonito Generation',
            artist: 'Kero Kero Bonito'
        },
        {
            image: low,
            name: 'Low',
            artist: 'David Bowie'
        },
        {
            image: powersthatb,
            name: 'The Powers That B',
            artist: 'Death Grips'
        },
        {
            image: pureComedy,
            name: 'Pure Comedy',
            artist: 'Father John Misty'
        },
        {
            image: inrainbows,
            name: 'In Rainbows',
            artist: 'Radiohead'
        },
        {
            image: kaputt,
            name: 'Kaputt',
            artist: 'Destroyer'
        }
    ];

    //randomize albums
    for (let i = 0; i < 100; i++) {
        let a = Math.floor(Math.random() * albums.length);
        let b = Math.floor(Math.random() * albums.length);

        let temp = albums[a];
        albums[a] = albums[b];
        albums[b] = temp;
    }

    return albums;
})();
