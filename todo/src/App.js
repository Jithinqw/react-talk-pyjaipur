import React from 'react';
import ProtectedRoute from './guards/guards';
import { Route, Router, Switch } from 'react-router-dom';

import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import Dashboard from './Components/Dashboard/Dashboard';
import NotFound from './Components/NotFound/NotFound';
import history from './history';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <div>
      <Router history ={ history }>
        <Switch>
          <Route path={"/register"} component={ Register }></Route>
          <Route path="/login" component={ Login }></Route>
          <ProtectedRoute path="/dashboard" component={ Dashboard }></ProtectedRoute>
          <Route path="*" component={ NotFound }></Route>
        </Switch>
      </Router>
      </div>
    </div>
  );
}

export default App;
