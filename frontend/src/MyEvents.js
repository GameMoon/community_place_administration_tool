import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import {Button, Table} from '@material-ui/core/';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import Title from './Title';



const testData = [
  {"start_date": '16 Mar, 2019 15:00',"end_date": '16 Mar, 2019 16:00','title': 'Elvis Presley'},
  {"start_date": '16 Mar, 2019 15:00',"end_date": '16 Mar, 2019 16:00','title': 'Elvis Presley'},
  {"start_date": '16 Mar, 2019 15:00',"end_date": '16 Mar, 2019 16:00','title': 'Elvis Presley'},
  {"start_date": '16 Mar, 2019 15:00',"end_date": '16 Mar, 2019 16:00','title': 'Elvis Presley'},
  {"start_date": '16 Mar, 2019 15:00',"end_date": '16 Mar, 2019 16:00','title': 'Elvis Presley'}
];

function preventDefault(event) {
  event.preventDefault();
}

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
          {testData.map((event) => (
            <TableRow key={event.id}>
              <TableCell>{event.title}</TableCell>
              <TableCell>{event.start_date}</TableCell>
              <TableCell>{event.end_date}</TableCell>
                  <TableCell align="center"><Button color="secondary" className={classes.normalText} variant="contained"><DeleteIcon />Delete</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}