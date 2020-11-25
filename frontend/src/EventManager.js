import React from 'react';
import {Grid,Paper, Box, Container} from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import MyEvents from './MyEvents'
import Events from './Events'
import Header from './Header'
import Copyright from './Copyright'
import clsx from 'clsx'

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

export default function EventManager() {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return (
        <>
        <div className={classes.root}>
            <Header title="Events" />
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Paper className={fixedHeightPaper}>
                                <MyEvents />
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper className={fixedHeightPaper}>
                                <Events />
                            </Paper>
                        </Grid>
                    </Grid>
                    <Box pt={4}>
                        <Copyright />
                    </Box>
                </Container>
            </main>
        </div>
        </>
    );
}
