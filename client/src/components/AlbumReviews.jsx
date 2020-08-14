import React, { Component } from 'react';

//redux
import { getAlbumReviews } from '../redux/actions/albumActions';
import { connect } from 'react-redux';

//MUI
import withStyles from '@material-ui/core/styles/withStyles';

const styles = (theme) => ({
    ...theme.styleSpreading
});

class AlbumReviews extends Component {
    componentDidMount() {
        const albumName = this.props.albumName;
        const artist = this.props.artist;
        this.props.getAlbumReviews({ name: albumName, artist });
    }

    render() {
        return <div></div>;
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
    albums: state.albums
});

export default connect(mapStateToProps, { getAlbumReviews })(
    withStyles(styles)(AlbumReviews)
);
