import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router'
import firebaseApp from './firebase/Firebase';

class Navbar extends Component {
  constructor(props) {
      super(props);
      //
      this.signout = this.signout.bind(this);
  }
  signout(){
    firebaseApp.auth().signOut().then(function() {
      console.log("sign out succesful");
      hashHistory.push('/login');
    }, function(error) {
      console.log("an error happened");
    });
  }
  render() {
    var loginButton;
    var signup;
    if (this.props.loggedin) {
      loginButton = <button className="btn btn-default" onClick={this.signout}>Logout</button>;
      signup = "";
    } else {
      loginButton = <Link to="/login"><button className="btn btn-default">login</button></Link>;
      signup = <Link to="/signup"><button className="btn btn-default">Sign up</button></Link>;
    }
    return (
      <div className="Navbar">
        <div className="columns">
              <div className="column is-4"></div>
              <div className="column is-1">
                <Link to="/"><button className="btn btn-default">Home</button></Link>
              </div>
              <div className="column is-1">
                <Link to="/app"><button className="btn btn-default dash-btn">Chat</button></Link>
              </div>
              <div className="column is-1">
                {loginButton}
              </div>
              <div className="column is-1">
                {signup}
              </div>
        </div>
        <div className="columns">
        <div className="column is-4"></div>
        </div>
      </div>
    );
  }
}

export default Navbar;
