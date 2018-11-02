import React, { Component } from "react";
import { Link } from "react-router";
import * as firebase from "firebase";
import firebaseApp from "../firebase/Firebase";
import isEmail from "validator/lib/isEmail";
import color from "@material-ui/core/colors/deepPurple";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      user: [],
      username: []
    };
    //
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePassChange = this.handlePassChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }
  handlePassChange(e) {
    this.setState({ password: e.target.value });
  }
  handleSubmit(e) {
    e.preventDefault();
    // var email = this.state.email.trim();
    // var password = this.state.password.trim();
    // if(isEmail(email)){
    //   firebaseApp.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    // 	  // Handle Errors here.
    // 	  var errorMessage = error.message;
    // 	  alert("errorMessage: "+ errorMessage)
    // 	});
    // }else{
    //   alert("Email Address in not valid");
    // }
  }
  handleFacebook(e) {
    e.preventDefault();
    var provider = new firebase.auth.FacebookAuthProvider();
    firebaseApp
      .auth()
      .signInWithPopup(provider)
      .then(function(result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        // var token = result.credential.accessToken;
        // The signed-in user info.
        //var user = result.user;
        console.log("Facebook login success");

        let dbCon = firebaseApp
          .database()
          .ref("users/" + firebaseApp.auth().currentUser.uid + "/data");
        dbCon.push({
          nama: result.user.displayName
        });
      })
      .catch(function(error) {
        var errorMessage = error.message;
        alert("Facebook sign in error: " + errorMessage);
      });
  }
  handleGoogle(e) {
    e.preventDefault();
    var provider = new firebase.auth.GoogleAuthProvider();
    firebaseApp
      .auth()
      .signInWithPopup(provider)
      .then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        //var token = result.credential.accessToken;
        // The signed-in user info.
        //var user = result.user;
        console.log("Google login success");

        let dbCon = firebaseApp
          .database()
          .ref("users/" + firebaseApp.auth().currentUser.uid + "/data");
        dbCon.push({
          nama: result.user.displayName
        });
      })
      .catch(function(error) {
        var errorMessage = error.message;
        alert("Google sign in error: " + errorMessage);
      });
  }
  render() {
    return (
      <div className="Login">
        <h1>Login</h1>
        <div className="columns">
          <div className="column is-4" />
          <div className="column is-4">
            {/* <a
              className="btn btn-block btn-social btn-facebook"
              onClick={this.handleFacebook}
              style={{ color: "#fff" }}
            >
              <span className="fa fa-facebook" />
              Login nggo Facebook
            </a> */}
            <a
              className="btn btn-block btn-social btn-google"
              onClick={this.handleGoogle}
              style={{ color: "#fff" }}
            >
              <span className="fa fa-google" />
              Login nggo Google
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
