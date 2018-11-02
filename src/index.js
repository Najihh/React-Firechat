import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './css/index.css';
// import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import App from './App';
import Home from './Home';
import Login from './authscreens/Login';
import Signup from './authscreens/Signup';
import loginsikek from './loginsek';
import Dashboard from './Dashboard';
import requireAuth from './tracklogin/RequireAuth';

// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();

render((
    <Router history={hashHistory}>
      <Route path="/" component={Dashboard}>
        <IndexRoute component={Home}/>
        <Route path="login" component={Login} />
        <Route path="signup" component={Signup} />
        <Route path="loginsikek" component={loginsikek} />
        <Route path="app" component={App} onEnter={requireAuth}/>
      </Route>
    </Router>
  ), document.getElementById('root'))