import './App.css';
import { Switch, Route } from 'react-router-dom'
import SignIn from './SignIn'
import Dashboard from './Dashboard'
import PrivateRoute from './PrivateRoute'
import EventManager from './EventManager'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={SignIn}></Route>
        <PrivateRoute path="/dashboard" component={Dashboard} /> 
        <PrivateRoute path="/events" component={EventManager} /> 
        <Route>404 Page not found</Route>
      </Switch>
    </div>
  );
}

export default App;
