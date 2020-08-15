import React, { Component } from 'react';

//redux
import { connect } from 'react-redux';
import { addAlbumReview } from '../../redux/actions/albumActions';

//MUI
import TextField from '@material-ui/core/TextField';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import { Paper } from '@material-ui/core';

const styles = (theme) => ({
    ...theme.styleSpreading,
    container: {
        width: 860,
        padding: 20,
        backgroundColor: '#19191b'
    },
    button: {
        backgroundColor: '#19191b',
        border: ' 1px solid #b9b950',
        margin: 10,
        float: 'right',
        '&:hover': {
            backgroundColor: '#b9b950',
            color: '#444'
        }
    },
    user: {
        display: 'flex'
    },
    avatar: {
        width: 40,
        height: 40,
        marginBottom: 20
    },
    userHandle: {
        fontSize: 20,
        color: '#bbb',
        margin: 10
    },
    textField: {
        color: '#400',
        '& MuiInputBase-input': {
            color: '#400'
        }
    }
});

class ReviewForm extends Component {
    state = {
        body: '',
        open: true
    };

    handleClose = () => {
        this.setState({
            open: false
        });
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const { albums } = this.props;
        const body = this.state.body;
        this.props.addAlbumReview(albums.album, body);
    };

    render() {
        const { classes, user, albums } = this.props;
        const errors = {};
        return (
            <Paper className={classes.container}>
                <form noValidate onSubmit={this.handleSubmit}>
                    <div className={classes.user}>
                        <h1 className={classes.userHandle}>Submit Review</h1>
                    </div>
                    <TextField
                        id="body"
                        name="body"
                        type="text"
                        label="review"
                        className={classes.textField}
                        helperText={errors.email}
                        error={errors.email ? true : false}
                        value={this.state.body}
                        onChange={this.handleChange}
                        fullWidth
                        // multiline
                        variant="outlined"
                        color="primary"
                        rows={5}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        // disabled={loading}
                        onClick={this.handleSubmit}
                    >
                        Submit
                    </Button>
                </form>
                {/* </DialogContent>
                </Dialog> */}
            </Paper>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
    albums: state.albums
});

export default connect(mapStateToProps, { addAlbumReview })(
    withStyles(styles)(ReviewForm)
);
