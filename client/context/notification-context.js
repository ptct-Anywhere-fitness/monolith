import { createContext, useState } from 'react';

// ==============================================

const NotificationContext = createContext({
  notification: null, // { title, message, status },
  showNotification: function (notification_data) {},
  hideNotification: function () {},
});

// ==============================================

function NotificationContextProvider(props) {
  // --------------------------------------------

  const [active_notification, setActiveNotification] = useState();

  // --------------------------------------------

  const showNotificationHandler = (notification_data) => {
    setActiveNotification({
      title: notification_data.title,
      message: notification_data.message,
      status: notification_data.status,
    });
  };

  // --------------------------------------------

  const hideNotificationHandler = () => {
    setActiveNotification(null);
  };

  // --------------------------------------------

  const context = {
    notification: active_notification,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler,
  };

  // --------------------------------------------

  return (
    <NotificationContext.Provider value={context}>
      {props.children}
    </NotificationContext.Provider>
  );

  // --------------------------------------------
}

// ==============================================

export { NotificationContextProvider };
export default NotificationContext;
