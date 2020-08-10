import React, { Component, Fragment } from 'react';
import noImage from '../../images/no-image.png';
import axios from 'axios';
import { setAuthorizationHeader } from '../../util/userActions';

//MUI
import Avatar from '@material-ui/core/Avatar';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

const styles = (theme) => ({
    ...theme.styleSpreading,
    container: {
        width: '100%',
        justify: 'center',
        alignItems: 'center'
    },
    avatar: {
        width: 80,
        height: 80,
        margin: ' 80px auto 20px auto'
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

export class UserAvatar extends Component {
    state = {
        loggedIn: false,
        signupOpen: false,
        loginOpen: false,
        email: '',
        password: '',
        confirmPassword: '',
        handle: '',
        errors: {},
        loading: false
    };

    openSignupDialog = () => {
        this.setState({ signupOpen: true });
    };
    handleClose = () => {
        this.setState({
            signupOpen: false,
            loginOpen: false
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            loading: true
        });
        const newUserData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            handle: this.state.handle
        };

        console.log(newUserData);

        axios
            .post('/signup', newUserData)
            .then((response) => {
                setAuthorizationHeader(response.data.token);
                this.setState({ loggedIn: true });
                console.log('success');
                this.handleClose();
            })
            .catch((err) => {
                console.error(err);
            });
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    render() {
        const { classes } = this.props;
        const { errors, loading } = this.state;

        return (
            <div>
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                    classes={styles.container}
                >
                    <Avatar
                        alt="no image"
                        src={noImage}
                        className={classes.avatar}
                    />
                    <Grid>
                        <Button
                            className={classes.signupButton}
                            onClick={this.openSignupDialog}
                        >
                            Sign Up
                        </Button>
                        <Button className={classes.loginButton}>Login </Button>
                    </Grid>
                </Grid>

                <Dialog open={this.state.signupOpen} className={classes.dialog}>
                    <DialogTitle className={classes.dialogContent}>
                        Signup
                    </DialogTitle>
                    <DialogContent className={classes.dialogContent}>
                        <form noValidate onSubmit={this.handleSubmit}>
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
                                color="primary"
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
                            {/* {errors.general && (
                <Typography variant="body2" className={classes.customError}>
                  {errors.general}
                </Typography>
              )} */}
                            <Button
                                type="submit"
                                variant="contained"
                                color="secondary"
                                className={classes.button}
                                disabled={loading}
                                onClick={this.handleClose}
                            >
                                Close
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                disabled={loading}
                                onClick={this.handleSubmit}
                            >
                                Signup
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}

export default withStyles(styles)(UserAvatar);
