import React, { Component } from 'react';
import NavBar from '../components/layout/NavBar';

//MUI
import Grid from '@material-ui/core/Grid';
import SearchBar from '../components/layout/SearchBar';
import AlbumShowcase from '../components/albums/AlbumShowcase';
import Logo from '../components/layout/Logo';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = (theme) => ({
    ...theme.styleSpreading,
    container: {
        margin: ' 20px auto 0 auto',
        justifyContent: 'center'
    }
});

export class home extends Component {
    render() {
      return <AlbumShowcase />;
        const { classes } = this.props;
    }
}

export default withStyles(styles)(home);
