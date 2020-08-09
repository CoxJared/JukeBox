import React, { Component } from 'react';
import axios from 'axios';

const _api_key = process.env.REACT_APP_LASTFM_API_KEY;
const _band_name = 'Radiohead'; // FIXME should this be passed using props?

console.log(_api_key)
export default class artist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            images: [],
            genres: [],
            bio: '',
            top_tracks: [],
            albums: [],
            hasLoaded: false
        }
    }

    async componentDidMount(){
        const {mbid} = this.props.match.params;
        await this.setState({mbid})
        // this.search_album();
        this.get_artist_info();
        this.get_top_albums();
        this.get_top_tracks();

        // this.get_spotify_artist_info();
        // this.setState({hasLoaded: false})
      }
    
    async get_spotify_artist_info() {
    // ///////// SPOTIFY
        // FIXME temp token from Spotify docs
        const token = 'BQD2q8bXaDvKyAVQZz9Gm0j9KrrbdY7QQjE68SGgpE2wB8qejDh3Djmuc7ABoshyLbDtTyEtrwfryg6tBavTeoHqJ3GBH5Pmb43b0h6V7prRFqMhfnm5ZmlQe19d2twK960LO2K4MclK40Zq1NEhzOCberM';
        
        let  config = {
        headers: {
            'Accept' : 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
        }
        // Get's 'Radiohead'
        const ARTIST_ID = '4Z8W4fKeB5YxbusRsdQVPb'
        const EXAMPLE_URL = 'https://api.spotify.com/v1/artists/' + ARTIST_ID;
        // axios.get(`http://www.reddit.com/r/${this.props.subreddit}.json`)
        axios.get(EXAMPLE_URL, config)
        .then(res => {
            // console.log(res)
            this.setState({
                images: res.data.images,
                genres: res.data.genres,
                name: res.data.name
            })
            
        });
        this.get_spotify_albums(EXAMPLE_URL, config)
        // axios.get(`http://www.reddit.com/r/${this.props.subreddit}.json`)
    }

    async get_spotify_albums(ARTIST_URL, config){ 
        axios.get(ARTIST_URL+'/albums', config)
        .then(res => {
            console.log(res)
            this.setState({albums: res.data.items});
            // console.log(this.state.albums);


            this.setState({hasLoaded: true})
            console.log("Has loaded")
        });

    }

    /// Functions for LastFM grabbing
    async get_artist_info() {
        const ARTIST_URL = this.return_url('getinfo');
        console.log(ARTIST_URL)

        axios.get(ARTIST_URL)
        .then(res => {
                // TODO need to handle redirects if artist cannot be found                
    
            this.setState({
                images: res.data.artist.images,
                genres: res.data.artist.genres,
                name: res.data.artist.name,
                bio: res.data.artist.bio.summary
            })
            this.setState({hasLoaded: true})

        });
    }

    async get_top_albums() {
        const ARTIST_URL = this.return_url('getTopAlbums');

        axios.get(ARTIST_URL)
        .then(res => {
                // TODO need to handle redirects if artist cannot be found                
            const albums = res.data.topalbums.album.map( obj => obj);
            this.setState({albums})
            this.setState({hasLoaded: true})
        });
    }

    async get_top_tracks() {
        const ARTIST_URL = this.return_url('gettoptracks');

        axios.get(ARTIST_URL)
        .then(res => {
                // TODO need to handle redirects if artist cannot be found                
            // console.log(res)
            const top_tracks = res.data.toptracks.track.map( obj => obj.name);
            this.setState({top_tracks})
            this.setState({hasLoaded: true})
        });
    }
    


    return_url( method) {
        const ROOT_URL = 'http://ws.audioscrobbler.com';
        //const ARTIST_URL = ROOT_URL + '/2.0/?method=artist.'+ method +'&artist='+ artist_name +'&api_key=' + _api_key +'&format=json';
        const ARTIST_URL = ROOT_URL + '/2.0/?method=artist.'+ method +'&mbid='+ this.state.mbid +'&api_key=' + _api_key +'&format=json';
        return ARTIST_URL;
    }

  render() {
      let {hasLoaded} = this.state;
      let ArtistInfo;
      if (hasLoaded){
            ArtistInfo = (<div>
        
                {this.state.name ? <h3>{this.state.name}</h3> : <h3>Loading...</h3>}
                
                {/* {this.state.images[0] ? <img src={this.state.images[0].url}/> : null} */}
                <p>{this.state.bio}</p>
                
                {/* {this.state.albums.map( album => <img src={album.images[0].url} width={album.images[0].width} height={album.images[0].height}/>)} */} 
                {/* {this.state.albums.map( album => <img src={album.image[3]['#text']}/>)}  */}
                {/* 3rd index is largerst image */}

                {/* Display all top albums */}
                <ul>
                    {this.state.albums.map( album => 
                    <li>{album.name}
                    <img src={album.image[3]['#text']}/>
                    </li>)}
                </ul>

                {/* Display all top tracks */}
                <ul>
                    {this.state.top_tracks.map( track => <li>{track}</li>)}
                </ul>     
          </div>);
      } else {
          ArtistInfo = <h1>Is loading....</h1>
      }

    return (
        <div style={{color: 'white'}}>
            {ArtistInfo}
        </div>
    );
  }
}
