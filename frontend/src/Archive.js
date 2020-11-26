import React from 'react';
import { Grid, Box, Container } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import Header from './Header'
import Copyright from './Copyright'
import clsx from 'clsx'
import {GDRIVE_FOLDER_ID} from './config'

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

    return (
        <>
        <div className={classes.root}>
            <Header title="Archive" />
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            {/* <Paper className={fixedHeightPaper}>
                                <MyEvents />
                            </Paper> */}
                             <iframe title="gdrive_folder" src={"https://drive.google.com/embeddedfolderview?id="+GDRIVE_FOLDER_ID+"#list"} style={{width:"100%", height:"600px", border:"0"}}></iframe>
                        </Grid>
                        
                    </Grid>
                    <Box pt={4}>
                        <Copyright />
                    </Box>
                </Container>
            </main>
        </div>
        </>
       
    )
}

export default Archive