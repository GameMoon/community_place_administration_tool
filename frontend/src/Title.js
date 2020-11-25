import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import {Box} from '@material-ui/core'

export default function Title(props) {
    return (
        <Box textAlign="left"> 
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                {props.children}
            </Typography>
        </Box>
    );
}

Title.propTypes = {
    children: PropTypes.node,
};