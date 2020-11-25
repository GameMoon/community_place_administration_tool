import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

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


const Appointments = ({ component: Component, ...rest }) => {
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
        <Title>Appointments</Title>
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

export default Appointments