import React, { Component } from 'react';
import axios from 'axios'
import { withStyles } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper'
import { Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

const styles= (theme) => ({
    ...theme.styleSpreading,
    container: {
        height: 300,
        width: 900,
        marginTop: 50,
        marginLeft: 100
    }
})

export class settings extends Component {
    constructor(props) {
        super(props);
        this.state= {

        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    async handleSubmit(event) {
        event.preventDefault();
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render(){
        const {classes} = this.props;
        return(
            <Grid
                container
                spacing={1}
                justify="center"
                className={classes.container}
            >
                <Paper>
                    <form onSubmit={this.handleSubmit} noValidate autoComplete="off">
                        <TextField id="standard-basic" label="Standard"/>
                        <TextField id="filled-basic" label="filled" variant="filled" />
                        <TextField id="outlined-basic" label="Outlined" variant="outlined" />

                        <div>
                            <TextField
                                id="standard-multiline-flexible"
                                label="Add your bio!"
                                name="bio"
                                multiline
                                rowsMax={4}
                                value={this.state.bio}
                                onChange={this.handleChange}
                            />
                        </div>
                    </form>
                </Paper>
            </Grid>
        )
    }
}

export default withStyles(styles)(settings);