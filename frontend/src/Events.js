import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Title from './Title'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import { Box } from '@material-ui/core'
import Button from '@material-ui/core/Button';
import NewEvent from './NewEvent'
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment)
function preventDefault(event) {
    event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
    seeMore: {
        marginTop: theme.spacing(3),
    },
}));


const Events = ({ component: Component, ...rest }) => {
    const myEvents =  [
      {
            start: moment().toDate(),
            end: moment()
                 .add(1, "days")
                .toDate(),
            title: "Some title"
      }
    ]

    return (
        <React.Fragment>
        <Title>All Events</Title>
        <Box textAlign="left" mb={2}>
            <NewEvent />
        </Box>
                        
        <Calendar
            localizer={localizer}
            events={myEvents}
            defaultDate={new Date()}
            defaultView="week"
            style={{ height: 500 }}
        />
        </React.Fragment>
    )
}

export default Events