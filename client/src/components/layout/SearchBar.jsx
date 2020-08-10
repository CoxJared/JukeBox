import React, { Component } from 'react';

//MUI
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { Redirect } from 'react-router';

const searchbarStyles = {
    search: {
        position: 'relative',
        borderRadius: 10,
        backgroundColor: '#222',
        '&:hover': {
            backgroundColor: '#f00'
        },
        margin: '0  auto 0 500px',
        width: 500,
        display: 'flex',
        color: '#fff'

        // [theme.breakpoints.up('sm')]: {
        //   marginLeft: theme.spacing(1),
        //   width: 'auto'
        // }
    },
    searchIcon: {
        padding: '7px 10px',
        height: '100%',
        width: 100,
        position: 'absolute',
        pointerEvents: 'none',
        // display: 'inline',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#b0b050'
    },
    input: {
        color: '#b0b050',
        paddingLeft: 40,
        paddingTop: 2
    }
};

const _api_key = process.env.REACT_APP_LASTFM_API_KEY;

export class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search_query: '',
            mbid: '',
            hasSearched: false
        };
    }

    async search_artist() {
        const ROOT_URL = 'http://ws.audioscrobbler.com';
        const SEARCH_URL =
            '/2.0/?method=artist.search&artist=' +
            this.state.search_query +
            '&api_key=' +
            _api_key +
            '&format=json';
        const url = ROOT_URL + SEARCH_URL;
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            console.log(data);

            const { mbid } = data.results.artistmatches.artist[0]; // FIXME hardcoded to use first result
            // FIXME ALSO NO ERROR CORRECTION!!!! oops
            console.log(mbid);
            this.setState({
                hasSearched: true,
                mbid: mbid
            });
        }
    }

    handleChange(event) {
        event.preventDefault();
        this.setState({ search_query: event.target.value });
    }

    async onSubmit(event) {
        event.preventDefault();
        this.search_artist();
    }

    render() {
        const { hasSearched } = this.state;
        if (hasSearched && this.state.mbid != '') {
            const url = '/artist/' + this.state.mbid;
            return <Redirect to={url} />;
        }
        return (
            <div>
                <div style={searchbarStyles.search}>
                    <form onSubmit={this.onSubmit.bind(this)}>
                        <div
                            style={searchbarStyles.searchIcon}
                            onClick={this.onSubmit.bind(this)}
                        >
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            style={searchbarStyles.input}
                            inputProps={{ 'aria-label': 'search' }}
                            onChange={this.handleChange.bind(this)}
                        />
                    </form>
                </div>
            </div>
        );
    }
}

export default SearchBar;
