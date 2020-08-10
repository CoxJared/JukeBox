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
  }
});

export class search extends Component {
    constructor(props){
        super(props);
        this.state={
          search_query: '',
          artist_matches: [],

          isLoaded: false
        }
    }


    async componentDidMount(){
        const {search_query} = this.props.match.params;
        console.log(this.props.match)
        await this.setState({search_query});
        this.search_artist();
      }

    async search_artist() {
        
        const ROOT_URL = 'http://ws.audioscrobbler.com';
        const SEARCH_URL = '/2.0/?method=artist.search&artist='+ this.state.search_query + '&api_key=' + _api_key +'&format=json';
        const url = ROOT_URL + SEARCH_URL;
        const response = await fetch(url);
    
        if (response.ok) {
            const data = await response.json();
            console.log(data);
    
          const {artist} = data.results.artistmatches; // FIXME hardcoded to use first result
            console.log(artist)
            this.setState({
                artist_matches: artist,
                isLoaded: true
            })

        }   
    }

  render() {
    const { classes } = this.props;
    const {isLoaded} = this.state;
    
    let SearchedArtists;
    if (isLoaded) {
        SearchedArtists = this.state.artist_matches.map((artist) => (
            <Link to={{
                pathname: '/artist/' + artist.mbid,
                state: {artist: artist}
            }}>
                <TableRow key={artist.name}>
                    <TableCell scope="row">
                        {artist.name}
                    </TableCell>
                <TableCell align="right">{artist.listeners}</TableCell>
            </TableRow>
            </Link>

        ))
    }


    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Artist</TableCell>
                        <TableCell align="right">Listeners</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {SearchedArtists}
                </TableBody>
            </Table>
        </TableContainer>
    );
  }
}

export default withStyles(styles)(search);
