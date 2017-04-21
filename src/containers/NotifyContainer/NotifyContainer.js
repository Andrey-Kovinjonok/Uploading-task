import React from 'react';
import NotificationSystem from 'react-notification-system';

export default Component => class Notifier extends React.Component {
  constructor(props) {
    super(props);

    this.addNotification = this.addNotification.bind(this);
    this.notificationSystem = null
  }

  addNotification({ message, level }) {
    this.notificationSystem.addNotification({
      message,
      level,
    });
  }

  componentDidMount() {
    this.notificationSystem = this.refs.notificationSystem;
  }

  render() {
    console.log("HOC NOTIFIER", this.addNotification)
    return (
      <div>
        <Component onNotify={this.addNotification}/>

        <NotificationSystem ref={"notificationSystem"} />
      </div>
    );
  }
}