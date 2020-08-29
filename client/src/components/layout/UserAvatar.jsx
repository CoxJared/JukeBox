import React, { Component } from 'react';
import PropTypes from 'prop-types';

//redux
import { connect } from 'react-redux';
import {
    loginUser,
    logoutUser,
    uploadImage,
    signupUser,
    openLogin,
    closeLogin,
    openSignup,
    closeSignup
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
        width: 300,
        height: 35,
        justify: 'center',
        alignItems: 'center',
        display: 'flex'
        // border: '2px solid red'
    },
    tempAvatar: {
        width: 35,
        height: 35,
        marginRight: 10
        // border: '2px solid red'
    },
    avatar: {
        width: 35,
        height: 35,
        margin: ' 0 0px 0 auto',
        cursor: 'pointer',
        boxShadow: '4px 4px 4px #111'
    },
    loading: {
        width: 80,
        height: 80,
        margin: ' 180px auto 20px auto',
        backgroundColor: '#555'
    },
    handle: {
        color: '#fff',
        fontSize: 26,
        fontWeight: 500,
        textAlign: 'center'
    },
    signupButton: {
        margin: '5px',
        fontSize: 12,
        color: '#fff',
        backgroundColor: '#232323'
    },
    loginButton: {
        margin: '0px 0px',
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
        this.props.openSignup();
    };

    openLoginDialog = () => {
        this.props.openLogin();
    };

    closeLogin = () => {
        this.props.closeLogin();
    };

    closeSignup = () => {
        this.props.closeSignup();
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
        if (
            newUserData.email &&
            newUserData.password &&
            newUserData.confirmPassword &&
            newUserData.handle
        ) {
            this.props.signupUser(newUserData);
        }
        this.closeSignup();
    };

    handleLogin = (event) => {
        event.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        };
        if (userData.email && userData.password) {
            this.props.loginUser(userData);
        }
        this.closeLogin();
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
            user: { credentials, loading, signupOpen, loginOpen }
        } = this.props;
        const { errors } = this.state;

        return (
            <div>
                {!credentials.handle ? (
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                        className={classes.container}
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
                            className={classes.container}
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

                <Dialog open={signupOpen} className={classes.dialog}>
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
                                onClick={this.closeSignup}
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

                <Dialog open={loginOpen} className={classes.dialog}>
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
                                onClick={this.closeLogin}
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
    uploadImage,
    openLogin,
    closeLogin,
    openSignup,
    closeSignup
};

export default connect(
    mapStateToProps,
    mapActionsToProps
)(withStyles(styles)(UserAvatar));
