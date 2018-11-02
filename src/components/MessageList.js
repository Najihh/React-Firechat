import React, {Component} from 'react';
import { notification, Icon,Skeleton, Switch, Avatar } from 'antd';
import Message from './Message';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import _ from 'lodash';

const posisi = "bottomLeft";
const openNotification = (user, chat, image) => {
  notification.config({
    placement: posisi,
  });
  notification.open({
    message: user,
    description: chat,
    icon: <Avatar src={image} />,
  });  
};

const styles = theme => ({
  card: {
    marginBottom: '10px',
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
  },
  heading: {
    marginLeft:'10px',
    marginTop:'5px',
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
});

class MessageList extends Component {
  constructor(props){
    super(props);
    this.state = {
      messages: []
    };
    let app = this.props.db.database().ref('chat-box');
    app.on('value', snapshot => {
      this.getData(snapshot.val());
    });

    let app2 = this.props.db.database().ref('chat-box').orderByChild("dateAdded").limitToLast(1);
    app2.on('value', snapshot => {
      this.getDataLast(snapshot.val());
    });
  }

  getData(values){
    let messagesVal = values;
    let messages = _(messagesVal)
                      .keys()
                      .map(messageKey => {
                          let cloned = _.clone(messagesVal[messageKey]);
                          cloned.key = messageKey;
                          return cloned;
                      })
                      .value();
      this.setState({
        messages: messages.reverse()
      });
  }
  getDataLast(values){
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
        openNotification(pesanTerakhir.user, pesanTerakhir.message, pesanTerakhir.image);
    }))
  }

  render() {
    const { classes } = this.props;
    const { Meta } = Card;
    let messageNodes = this.state.messages.map((message) => {
      return (
        // <div className="card">
        //   <div className="card-content">
        //     <Message message = {message.message} />
        //   </div>
        // </div>

        // <Card style={{ marginTop: 16 }}>
        //   <Meta
        //     avatar={<Avatar src={message.image} />}
        //     title={message.user}
        //     description={message.message}
        //   />
        // </Card>

        // <Card className={classes.card}>
        //   <CardMedia
        //       className={classes.cover}
        //       image={message.image}
        //       title={message.user}
        //     />
        //   <div className={classes.details}>
        //     <CardContent className={classes.content}>
        //       <Typography component="h5" variant="h5">
        //         {message.user}
        //       </Typography>
        //       <Typography variant="subtitle1" color="textSecondary">
        //         says : "{message.message}"
        //       </Typography>
        //     </CardContent>
        //   </div>
        // </Card>

        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Avatar src={message.image} />
            <Typography className={classes.heading}>{message.user}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              Says : "{message.message}"
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>

      )
    });
    return (
      <div>
        {messageNodes}
      </div>
    );
  }
}

MessageList.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MessageList);
