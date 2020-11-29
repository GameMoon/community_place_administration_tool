import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Button, Table} from '@material-ui/core/';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import Title from './Title';
import { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment'
import { BACKEND_URL } from './config';

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  normalText: {
      textTransform: "none"
  }
}));

export default function MyEvents() {
  const classes = useStyles();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        BACKEND_URL +'/events/get_own',
        { 
          headers: {
            'Authorization': `token ${sessionStorage.getItem('token')}`
          },
        }
      );
      const newState = result.data.map(event => {
        var newItem = Object.assign({}, event);
        newItem.start = moment(event.start, 'YYYY-MM-DDTHH: mm: ss').format("YYYY.MM.DD HH:mm:ss");
        newItem.end = moment(event.end, 'YYYY-MM-DDTHH: mm: ss').format("YYYY.MM.DD HH:mm:ss");
        return newItem;
      });
      setEvents(newState);
    };

    fetchData();
  }, []);

  const deleteEvent = async (id) => {
    const result = await axios.delete(
      BACKEND_URL+'/events/'+id,
      {
        headers: {
          'Authorization': `token ${sessionStorage.getItem('token')}`
        }
      }
    );
    if(result.status === 204){
      var newEvents = events.filter(function (obj) {
        return obj.id !== id;
      });
      setEvents(newEvents)
    }
    console.log(result)
  };

  return (
    <React.Fragment>
      <Title>My Events</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Start Date</TableCell>
            <TableCell>End Date</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {events.map((event) => (
            <TableRow key={event.id}>
              <TableCell>{event.title}</TableCell>
              <TableCell>{event.start}</TableCell>
              <TableCell>{event.end}</TableCell>
              <TableCell align="center"><Button color="secondary" className={classes.normalText} variant="contained" onClick={() => deleteEvent(event.id)}><DeleteIcon />Delete</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}