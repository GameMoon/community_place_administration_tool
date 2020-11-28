import './App.css';
import { Switch, Route } from 'react-router-dom'
import SignIn from './SignIn'
import SignUp from './SignUp'
import Dashboard from './Dashboard'
import PrivateRoute from './PrivateRoute'
import EventManager from './EventManager'
import Archive from './Archive';
import SnackbarProvider from 'react-simple-snackbar'

function App() {
  return (
    <SnackbarProvider>
    <div className="App">
      <Switch>
        <Route exact path="/" component={SignIn}></Route>
        <Route exact path="/signup" component={SignUp}></Route>
        <PrivateRoute path="/dashboard" component={Dashboard} /> 
        <PrivateRoute path="/events" component={EventManager} /> 
        <PrivateRoute path="/archive" component={Archive} /> 
        <Route>404 Page not found</Route>
      </Switch>
    </div>
    </SnackbarProvider>
  );
}

export default App;
