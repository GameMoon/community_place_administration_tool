import React from 'react';
import { Grid, Box, Container } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FolderIcon from '@material-ui/icons/Folder';
import Header from './Header'
import Copyright from './Copyright'
import clsx from 'clsx'
import { BACKEND_URL } from './config'
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import moment from 'moment'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 520,
    },
}));


const Archive = ({ component: Component, ...rest }) => {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    
    const [dates,setDates] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                BACKEND_URL + window.location.pathname,
            );
                
            const newState = result.data.map(date => {
                var newItem = Object.assign({}, date);
                newItem.date = date.date;
                newItem.time = date.time;
                newItem.link = date.link;
                return newItem;
            });
            setDates(newState);
        };

        fetchData();
    }, []);

    return (   
        <div className={classes.root}>
            <Header title="Archive" />
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <List>
                      { dates.map((value) => {
                        var link = "#";
                        var target = "_self";
                        if (value.date)
                          link = "archive/" + value.date;
                        else if (value.link) {
                          link = "https://drive.google.com/file/d/" + value.link + "/view";
                          target = "_blank"
                        }
                        return(
                          <ListItem key={value} component="a" href={link} target={target}>
                            <ListItemIcon>
                              <FolderIcon />
                            </ListItemIcon>
                            <ListItemText
                              primary={value.date ? value.date : value.time}
                            />
                          </ListItem>
                        );
                      })}
                    </List>
                    <Box pt={4}>
                        <Copyright />
                    </Box>
                </Container>
            </main>
        </div>
    )
}

export default Archive