import React from 'react';
import { Box, Container } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FolderIcon from '@material-ui/icons/Folder';
import ImageIcon from '@material-ui/icons/Image';
import Header from './Header'
import Copyright from './Copyright'
import { BACKEND_URL } from './config'
import { useState, useEffect } from 'react';
import axios from 'axios';

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
                        if (value.date)
                          return(
                            <ListItem key={value} component="a" href={"archive/" + value.date}>
                              <ListItemIcon>
                                <FolderIcon />
                              </ListItemIcon>
                              <ListItemText
                                primary={value.date}
                              />
                            </ListItem>
                          );
                        else
                          return(
                            <ListItem key={value} component="a" href={"https://drive.google.com/file/d/" + value.link + "/view"} target="_blank">
                              <ListItemIcon>
                                <ImageIcon />
                              </ListItemIcon>
                              <ListItemText
                                primary={value.time}
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