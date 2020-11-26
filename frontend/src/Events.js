import React from 'react';
import Title from './Title'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import { Box } from '@material-ui/core'
import NewEvent from './NewEvent'
import "react-big-calendar/lib/css/react-big-calendar.css";
import {useState,useEffect} from 'react';
import axios from 'axios';
import moment from 'moment'
import { BACKEND_URL} from './config'

const localizer = momentLocalizer(moment)

const Events = ({ component: Component, ...rest }) => {
 
    const [events,setEvents] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                BACKEND_URL + '/events/',
            );
                
            const newState = result.data.map(event => {
                var newItem = Object.assign({}, event);
                newItem.start = moment(event.start,'YYYY-MM-DDTHH: mm: ss').toDate();
                newItem.end = moment(event.end, 'YYYY-MM-DDTHH: mm: ss').toDate();
                return newItem;
            });
            console.log(result.data)
            setEvents(newState);
        };

        fetchData();
    }, []);

    return (
        <React.Fragment>
        <Title>All Events</Title>
        <Box textAlign="left" mb={2}>
            <NewEvent />
        </Box>
                        
        <Calendar
            localizer={localizer}
            events={events}
            defaultDate={new Date()}
            defaultView="week"
            style={{ height: 500 }}
        />
        </React.Fragment>
    )
}

export default Events