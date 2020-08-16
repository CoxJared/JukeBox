import React, { Component } from 'react';
import PropTypes from 'prop-types';

//redux
import { connect } from 'react-redux';
import {
    loginUser,
    logoutUser,
    uploadImage,
    signupUser
} from '../../redux/actions/userActions';

//MUI
import Avatar from '@material-ui/core/Avatar';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { Typography } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = (theme) => ({
    ...theme.styleSpreading,
    container: {
        width: '100%',
        justify: 'center',
        alignItems: 'center'
    },
    tempAvatar: {
        width: 80,
        height: 80,
        margin: ' 180px auto 20px auto'
    },
    avatar: {
        width: 80,
        height: 80,
        margin: ' 180px auto 20px auto',
        cursor: 'pointer'
    },
    loading: {
        width: 80,
        height: 80,
        margin: ' 180px auto 20px auto',
        backgroundColor: '#555'
    },
    handle: {
        color: '#fff',
        textAlign: 'center'
    },
    signupButton: {
        margin: '5px',
        fontSize: 12,
        color: '#fff',
        backgroundColor: '#232323'
    },
    loginButton: {
        margin: '0px 5px',
        fontSize: 12,
        color: '#fff',
        backgroundColor: '#232323'
    },
    dialog: {},
    dialogContent: {
        backgroundColor: '#29292b',
        color: '#eee'
    },
    button: {
        backgroundColor: '#29292b',
        margin: 10
    }
});

class UserAvatar extends Component {
    constructor() {
        super();
        this.state = {
            signupOpen: false,
            loginOpen: false,
            email: '',
            password: '',
            confirmPassword: '',
            handle: '',
            errors: {}
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.UI.erros) {
            this.setState({ errors: nextProps.UI.errors });
        }
    }

    openSignupDialog = () => {
        this.setState({ signupOpen: true });
    };

    openLoginDialog = () => {
        this.setState({ loginOpen: true });
    };

    handleClose = () => {
        this.setState({
            signupOpen: false,
            loginOpen: false
        });
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleSignup = (event) => {
        event.preventDefault();
        const newUserData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            handle: this.state.handle
        };
        this.props.signupUser(newUserData);
        this.handleClose();
    };

    handleLogin = (event) => {
        event.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        };
        this.props.loginUser(userData);
        this.handleClose();
    };

    handleLogout = () => {
        this.props.logoutUser();
    };

    handleEditPicture = () => {
        const fileInput = document.getElementById('imageInput');
        fileInput.click();
    };

    handleImageChange = (event) => {
        const image = event.target.files[0];
        const formData = new FormData();

        formData.append('image', image, image.name);

        this.props.uploadImage(formData);
    };

    render() {
        const {
            classes,
            user: { credentials, loading }
        } = this.props;
        const { errors } = this.state;

        return (
            <div>
                {!credentials.handle ? (
                    <Grid
                        container
                        direction="column"
                        justify="center"
                        alignItems="center"
                        classes={styles.container}
                    >
                        {loading ? (
                            <Avatar alt="no image" className={classes.loading}>
                                <CircularProgress />
                            </Avatar>
                        ) : (
                            <Avatar
                                alt="no image"
                                className={classes.tempAvatar}
                            />
                        )}
                        <Grid>
                            <Button
                                className={classes.signupButton}
                                onClick={this.openSignupDialog}
                                disabled={loading}
                            >
                                Sign Up
                            </Button>
                            <Button
                                className={classes.loginButton}
                                onClick={this.openLoginDialog}
                                disabled={loading}
                            >
                                Login
                            </Button>
                        </Grid>
                    </Grid>
                ) : (
                    <Grid
                        container
                        direction="column"
                        justify="center"
                        alignItems="center"
                        classes={styles.container}
                    >
                        <input
                            type="file"
                            id="imageInput"
                            hidden="hidden"
                            onChange={this.handleImageChange}
                        />
                        <Avatar
                            style={{ color: 'blue' }}
                            src={credentials.imageUrl}
                            className={classes.avatar}
                            onClick={this.handleEditPicture}
                        />
                        <Typography className={classes.handle}>
                            {credentials.handle}
                        </Typography>
                        <Button
                            className={classes.loginButton}
                            onClick={this.handleLogout}
                        >
                            Logout
                        </Button>
                    </Grid>
                )}

                <Dialog open={this.state.signupOpen} className={classes.dialog}>
                    <DialogTitle className={classes.dialogContent}>
                        Signup
                    </DialogTitle>
                    <DialogContent className={classes.dialogContent}>
                        <form noValidate onSubmit={this.handleSignup}>
                            <TextField
                                id="email"
                                name="email"
                                type="email"
                                label="Email"
                                className={classes.textField}
                                helperText={errors.email}
                                error={errors.email ? true : false}
                                value={this.state.email}
                                onChange={this.handleChange}
                                fullWidth
                            />
                            <TextField
                                id="password"
                                name="password"
                                type="password"
                                label="Password"
                                color="primary"
                                className={classes.textField}
                                helperText={errors.password}
                                error={errors.password ? true : false}
                                value={this.state.password}
                                onChange={this.handleChange}
                                fullWidth
                            />
                            <TextField
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                label="Confirm Password"
                                className={classes.textField}
                                helperText={errors.confirmPassword}
                                error={errors.password ? true : false}
                                value={this.state.confirmPassword}
                                onChange={this.handleChange}
                                fullWidth
                            />
                            <TextField
                                id="handle"
                                name="handle"
                                type="text"
                                label="Handle"
                                className={classes.textField}
                                helperText={errors.handle}
                                error={errors.handle ? true : false}
                                value={this.state.handle}
                                onChange={this.handleChange}
                                fullWidth
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                color="secondary"
                                className={classes.button}
                                // disabled={loading}
                                onClick={this.handleClose}
                            >
                                Close
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                // disabled={loading}
                                onClick={this.handleSignup}
                            >
                                Signup
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>

                <Dialog open={this.state.loginOpen} className={classes.dialog}>
                    <DialogTitle className={classes.dialogContent}>
                        Login
                    </DialogTitle>
                    <DialogContent className={classes.dialogContent}>
                        <form noValidate onSubmit={this.handleLogin}>
                            <TextField
                                id="email"
                                name="email"
                                type="email"
                                label="Email"
                                className={classes.textField}
                                helperText={errors.email}
                                error={errors.email ? true : false}
                                value={this.state.email}
                                onChange={this.handleChange}
                                fullWidth
                            />
                            <TextField
                                id="password"
                                name="password"
                                type="password"
                                label="Password"
                                color="primary"
                                className={classes.textField}
                                helperText={errors.password}
                                error={errors.password ? true : false}
                                value={this.state.password}
                                onChange={this.handleChange}
                                fullWidth
                            />
                            <Button
                                type="close"
                                variant="contained"
                                color="secondary"
                                className={classes.button}
                                // disabled={loading}
                                onClick={this.handleClose}
                            >
                                Close
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                // disabled={loading}
                                onClick={this.handleLogin}
                            >
                                Login
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}

UserAvatar.propTypes = {
    classes: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    logoutUser: PropTypes.func.isRequired,
    signupUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    uploadImage: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
});

const mapActionsToProps = {
    loginUser,
    logoutUser,
    signupUser,
    uploadImage
};

export default connect(
    mapStateToProps,
    mapActionsToProps
)(withStyles(styles)(UserAvatar));
