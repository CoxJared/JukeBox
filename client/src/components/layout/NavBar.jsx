import React, { Component } from 'react';
import logo from '../../images/logo.png';

//redux 
import { connect } from 'react-redux';

//MUI
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import withStyles from '@material-ui/styles/withStyles';

const styles = (theme) => ({
    container: {
        marginTop: 100
    },
    button: {
        color: '#888',
        fontSize: 20,
        margin: '5px 0'
    },
    logo: {
        width: '100%',
        justifyContent: 'center',
    },
    imageContainer: {
        width: 90,
        margin: '0 auto'
    },
    image: {
        display: 'inline-block',
        width: '100%',
        verticalAlign: 'center'
    },

    title: {
        width: '100%',
        marginTop: 0,
        textAlign: 'center'
    }
});

export class NavBar extends Component {
    render() {
        const { user, classes } = this.props;
        return (
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
                className={classes.container}
            >
                {/* <div className={classes.logo}>
                    
                    <span className={classes.name}>JukeBox</span>
                </div> */}
                <Button className={classes.button} component={Link} to="/">
                    <div className={classes.logo}>
                        <div className={classes.imageContainer}>
                            <img src={logo} className={classes.image} alt="logo" />
                        </div>
                        <h1 className={classes.title}>JukeBox</h1>
                    </div>

                </Button>




                <Button
                    className={classes.button}
                    component={Link}
                    to="/explore"
                >
                    explore
                </Button>
                <Button className={classes.button} component={Link} to="/lists">
                    lists
                </Button>
                <Button
                    className={classes.button}
                    component={Link}
                    to="/activity"
                >
                    activity
                </Button>
                <Button className={classes.button}>concerts</Button>
                {
                    user.authenticated ?
                        <Button className={classes.button} component={Link} to="/user">
                            Profile
                </Button>


                        : <div />
                }
                {
                    user.authenticated ?
                        <Button
                            className={classes.button}
                            component={Link}
                            to="/settings"
                        >
                            Settings
                    </Button>
                        : <div />
                }
            </Grid >
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user
})

export default connect(mapStateToProps, null)(withStyles(styles)(NavBar));
