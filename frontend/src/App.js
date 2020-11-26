import './App.css';
import { Switch, Route } from 'react-router-dom'
import SignIn from './SignIn'
import Dashboard from './Dashboard'
import PrivateRoute from './PrivateRoute'
import EventManager from './EventManager'
import Archive from './Archive';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={SignIn}></Route>
        <PrivateRoute path="/dashboard" component={Dashboard} /> 
        <PrivateRoute path="/events" component={EventManager} /> 
        <PrivateRoute path="/archive" component={Archive} /> 
        <Route>404 Page not found</Route>
      </Switch>
    </div>
  );
}

export default App;
