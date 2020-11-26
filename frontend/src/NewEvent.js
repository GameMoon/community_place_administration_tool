import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import { TextField,Grid } from '@material-ui/core'
import axios from 'axios';
import {BACKEND_URL} from './config'

const useStyles = makeStyles();

export default function AlertDialog() {
    const [newEvent, setNewEvent] = React.useState({user: 1});

    const [open, setOpen] = React.useState(false);
    const classes = useStyles();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        let newValue = value;
        setNewEvent(prevState => ({
            ...prevState,
            [name]: newValue
        }));
    }

    const createEvent = async() => {
        let res = await axios.post(BACKEND_URL+'/events/', newEvent);
        if(res.status === 201){
            setOpen(false);
        }
        console.log(res);
    }

    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
                Add Event
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Create an Appointment"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                       
                        <form className={classes.container} noValidate style={{overflow: "hidden"}}>
                            <Grid container spacing={3} >
                                <Grid item xs={12} >
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="event_title"
                                        label="Title"
                                        name="title"
                                        autoFocus
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        id="event_start"
                                        label="Start"
                                        type="datetime-local"
                                        name="start"
                                        defaultValue={new Date()}
                                        className={classes.textField}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} >
                                    <TextField
                                        id="event_end"
                                        label="End"
                                        type="datetime-local"
                                        name="end"
                                        defaultValue={new Date()}
                                        className={classes.textField}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        onChange={handleChange}
                                    />
                                </Grid>
                            </Grid>
                        </form>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={createEvent} color="primary" variant="contained" autoFocus>
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
