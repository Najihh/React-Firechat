import React, {Component} from 'react';
import { message } from 'antd';
import trim from 'trim';
import firebase from '../firebase/Firebase';
import _ from 'lodash';


const sendLoading = (tulisan, tulisanDone) => {
  message.loading(tulisan, 0.5)
    .then(() => message.success(tulisanDone, 1))
};
const sendSuccess = () => {
  message.destroy;
};

class MessageBox extends Component {

  constructor(props){
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeImage = this.onChangeImage.bind(this);
    this.onKeyup = this.onKeyup.bind(this);
    this.state = {
      user:'',
      image:'',
      message: ''
    };
    let nameUser = this.props.db.database().ref('users/'+ firebase.auth().currentUser.uid +'/data');
    nameUser.on('value', snapshot => {
      this.getLoginName(snapshot.val());
    });
  }
  getLoginName(values){
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
          user: pesanTerakhir.nama
        })
    }))
  }

  onChange(e){
      this.setState({
        message: e.target.value
      });
  }
  onChangeName(e){
      this.setState({
        user: e.target.value
      });
  }
  onChangeImage(e){
      this.setState({
        image: e.target.value
      });
  }
  onKeyup(e){
    if(e.keyCode === 13 && trim(e.target.value) !== '' && this.state.user !== '' && this.state.image !== ''){
      e.preventDefault();
      sendLoading("Sedang Mengirim...","Berhasil Mengirim");
      let dbCon = this.props.db.database().ref('/chat-box');
      dbCon.push({
        user: this.state.user,
        image: this.state.image,
        message: trim(e.target.value)
      });
      this.setState({
        user: this.state.user,
        image: this.state.image,
        message: ''
      });
    }
  }
  render() {
    return (
      <form>
        <textarea
            className="customarea"
            placeholder="Enter name"
            cols="20"
            onChange={this.onChangeName}
            onKeyUp={this.onKeyup}
            value={this.state.user}>
          </textarea>
          <textarea
            className="customarea"
            placeholder="Image url"
            cols="20"
            onChange={this.onChangeImage}
            onKeyUp={this.onKeyup}
            value={this.state.image}>
          </textarea>
        <textarea
            className="textarea"
            placeholder="Type a message"
            cols="100"
            onChange={this.onChange}
            onKeyUp={this.onKeyup}
            value={this.state.message}>
          </textarea>
      </form>
    )
  }
}

export default MessageBox
