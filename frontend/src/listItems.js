import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import Archive from '@material-ui/icons/Archive';
import Message from '@material-ui/icons/Message';
import CalendarToday from '@material-ui/icons/CalendarToday';
import {Link} from 'react-router-dom';


const handleClick = (target) =>{
    window.location = target
}
export const mainListItems = (
  <div>
    <ListItem button onClick={() => handleClick('/dashboard')}>
      <ListItemIcon>
          <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard"/>
    </ListItem>

    <ListItem button onClick={() => handleClick('/events')} >
      <ListItemIcon>
        <CalendarToday />
      </ListItemIcon>
      <ListItemText primary="Events" />
    </ListItem>

    <ListItem button>
      <ListItemIcon>
        <Archive />
      </ListItemIcon>
      <ListItemText primary="Archive" />
    </ListItem>
  </div>
);

// export const secondaryListItems = (
//   <div>
//     <ListSubheader inset>Saved reports</ListSubheader>
//     <ListItem button>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Current month" />
//     </ListItem>
//     <ListItem button>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Last quarter" />
//     </ListItem>
//     <ListItem button>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Year-end sale" />
//     </ListItem>
//   </div>
// );