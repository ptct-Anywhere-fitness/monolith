import { useState, useEffect, createContext } from 'react';

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

  useEffect(() => {
    if (
      active_notification &&
      active_notification.status === 'success'
      // ||active_notification.status === 'error'
    ) {
      const timer = setTimeout(() => {
        hideNotificationHandler();
      }, 3e3);

      // -Clear the timer if useEffect runs
      //  before the previous timer ends.
      return () => clearTimeout(timer);
    }
  }, [active_notification]);

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
