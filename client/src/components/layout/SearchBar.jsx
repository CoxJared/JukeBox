import React, { Component } from 'react';
import logo from '../../images/logo.png';

//MUI
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { Redirect } from 'react-router';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = (theme) => ({
    container: {
        display: 'flex',
        width: 940
    },
    search: {
        position: 'relative',
        borderRadius: 10,
        backgroundColor: '#222',
        '&:hover': {
            backgroundColor: '#282828'
        },
        // margin: '0  auto 0 ',
        width: 600,
        display: 'flex',
        color: '#fff',
        boxShadow: '4px 4px 4px #111'
    },
    logo: { width: 700 },
    image: {
        width: 30
    },
    name: {
        color: '#b9b950',
        fontSize: 35,
        fontWeight: 500,
        // height: 40,
        padding: '0 0 50px 10px'
        // marginBottom: 10
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
        paddingTop: 4
    }
});

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
    handleChange(event) {
        event.preventDefault();
        this.setState({ search_query: event.target.value });
    }

    async onSubmit(event) {
        event.preventDefault();
        this.setState({ hasSearched: true });
        console.log('SHOULD SEARCH NOW');
    }

    render() {
        const { classes } = this.props;
        const { hasSearched } = this.state;
        if (hasSearched && this.state.search_query != '') {
            const url = '/search/' + this.state.search_query;
            console.log('SEARCH QUERY');
            return <Redirect to={url} />;
        }
        return (
            <div className={classes.container}>
                <div className={classes.logo}>
                    <img src={logo} className={classes.image} alt="logo" />
                    <span className={classes.name}>JukeBox</span>
                </div>
                <div className={classes.search}>
                    <form onSubmit={this.onSubmit.bind(this)}>
                        <div
                            className={classes.searchIcon}
                            onClick={this.onSubmit.bind(this)}
                        >
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            className={classes.input}
                            inputProps={{ 'aria-label': 'search' }}
                            onChange={this.handleChange.bind(this)}
                        />
                    </form>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(SearchBar);
