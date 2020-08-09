import React, { Component } from 'react';

//MUI
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

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

export class SearchBar extends Component {
  render() {
    return (
      <div>
        <div style={searchbarStyles.search}>
          <div style={searchbarStyles.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            style={searchbarStyles.input}
            inputProps={{ 'aria-label': 'search' }}
          />
        </div>
      </div>
    );
  }
}

export default SearchBar;
