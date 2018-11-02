import React, { Component } from 'react';
import MessageList from './components/MessageList';
import MessageBox from './components/MessageBox';
import Header from './components/Header';
import firebase from './firebase/Firebase';
import _ from 'lodash';

class App extends Component {

constructor(props){
  super(props);
  this.state= {
    user:'',
    nama:'',
  }
  let checkNama = firebase.database().ref('users/'+ firebase.auth().currentUser.uid +"/data");
    checkNama.on('value', snapshot => {
      this.getNama(snapshot.val());
    });
  // var config = {
  //   apiKey: "AIzaSyB5SaExKiA8x7ySBr_dr8RlND7712fQdBk",
  //   authDomain: "najfire-sc.firebaseapp.com",
  //   databaseURL: "https://najfire-sc.firebaseio.com",
  //   projectId: "najfire-sc",
  //   storageBucket: "najfire-sc.appspot.com",
  //   messagingSenderId: "751412893240"
  // };
  // firebase.initializeApp(config);
}
getNama(values){
  let messagesVal = values;
  let messages = _(messagesVal)
                    .keys()
                    .map(messageKey => {
                        let cloned = _.clone(messagesVal[messageKey]);
                        cloned.key = messageKey;
                        return cloned;
                    })
                    .value();
  messages.map((pesanTerakhir => {
      this.setState({
        nama: pesanTerakhir.nama
      });
  }))
}

  render() {
    let jeneng = this.state.nama;
    return (
      <div className="wadah">
      <div className="container">
            {/* <Header title={jeneng} /> */}
            <div className="columns">
              <div className="column is-3"></div>
              <div className="column is-6">
                <MessageBox db={firebase} name={jeneng}/>
              </div>
            </div>
            <div className="columns">
            <div className="column is-3"></div>
            <div className="column is-6">
              <MessageList db={firebase} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
