import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Link} from 'react-router-dom';


//MUI
import withStyles from '@material-ui/core/styles/withStyles';

const _api_key = process.env.REACT_APP_LASTFM_API_KEY;


const styles = (theme) => ({
  ...theme.styleSpreading,
  container: {
    margin: ' 20px auto 0 auto',
    justifyContent: 'center'
  },
  table: {
      marginTop: 20,
      marginBottom: 20,
      backgroundColor: '#212122'
  },
  headName: {
      color: "#aaa",
      fontWeight: 400,
      fontSize: 40,
  },
  cellName: {
      color: "#aaa",
      fontWeight: 200,
      fontSize: 20,
  }
});

export class search extends Component {
    constructor(props){
        super(props);
        this.state={
          search_query: '',
          artist_matches: [],
          album_matches: [],
          isLoaded: false
        }
    }


    async componentDidMount(){
        const {search_query} = this.props.match.params;
        console.log(this.props.match)
        await this.setState({search_query});
        this.search_artist();
        this.search_albums();
      }

    async search_artist() {
        const ROOT_URL = 'http://ws.audioscrobbler.com';
        const SEARCH_URL = '/2.0/?method=artist.search&artist='+ this.state.search_query + '&api_key=' + _api_key +'&format=json';
        const url = ROOT_URL + SEARCH_URL;
        const response = await fetch(url);
    
        if (response.ok) {
            const data = await response.json();

            const {artist} = data.results.artistmatches; // FIXME hardcoded to use first result
            console.log(artist)
            this.setState({
                artist_matches: artist,
                isLoaded: true
            })
        }   
    }
    async search_albums() {
        const ROOT_URL = 'http://ws.audioscrobbler.com';
        const SEARCH_URL = '/2.0/?method=album.search&album='+ this.state.search_query + '&api_key=' + _api_key +'&format=json';
        const url = ROOT_URL + SEARCH_URL;
        const response = await fetch(url);
    
        if (response.ok) {
            const data = await response.json();
            console.log(data);
    
          const {album} = data.results.albummatches; // FIXME hardcoded to use first result
            // console.log(artist)
            this.setState({
                album_matches: album,
                isLoaded: true
            })
        }   
    }

  render() {
    const { classes } = this.props;
    const {isLoaded} = this.state;

    return (
        <div>
        <TableContainer className={classes.table} component={Paper}>
            <Table aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell className={classes.headName}>Artist</TableCell>
                        <TableCell className={classes.headName} align="right">Listeners</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {this.state.artist_matches.map((artist) => (
                        <TableRow key={artist.name}>
                            <TableCell>
                                <img src={artist.image[0]['#text']}/>
                            </TableCell>
                            <TableCell className={classes.cellName} component="th" scope="row">
                                <Link to={{
                                pathname: '/artist/' + artist.mbid,
                                state: {artist: artist}
                                }}>
                                    {artist.name}
                                </Link>
                                </TableCell>
                            <TableCell className={classes.cellName} align="right">{artist.listeners}</TableCell>
                         
                        </TableRow>
                    ))}
                </TableBody>

            </Table>


        </TableContainer>
        <TableContainer className={classes.table} component={Paper}>
            <Table aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>Album Name</TableCell>
                        <TableCell>Artist</TableCell>
                        <TableCell align="right">Listeners</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {this.state.album_matches.map((album) => (
                        <TableRow key={album.name}>
                            <TableCell>
                                <img src={album.image[0]['#text']}/>
                            </TableCell>
                            <TableCell component="th" scope="row">
                                <Link to={{
                                    pathname: '/album',
                                    state: {artist: album.artist, album: album.name}
                                    }}
                                    style={{ textDecoration: 'none'}}
                                    className="albumLink"
                                    >
                                    {album.name}
                                    </Link>
                                </TableCell>
                            <TableCell>{album.artist}</TableCell>
                            <TableCell align="right">{album.listeners}</TableCell>
                        
                        </TableRow>
                    ))}
                    </TableBody>

            </Table>
        </TableContainer>
        </div>

    );
  }
}

export default withStyles(styles)(search);
