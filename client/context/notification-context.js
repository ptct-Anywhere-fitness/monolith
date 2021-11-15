import { useState, useEffect, createContext } from 'react';

// ==============================================

const NotificationContext = createContext({
  notification: null, // { title, message, status, animation },
  animation: 'hide',
  showNotification: function (notification_data) {},
  hideNotification: function () {},
});

// ==============================================

function NotificationContextProvider(props) {
  // --------------------------------------------

  const [active_notification, setActiveNotification] = useState({
    title: '',
    message: '',
    status: '',
    animation: '',
  });

  useEffect(() => {
    if (
      (active_notification && active_notification.status === 'success') ||
      active_notification.status === 'error'
    ) {
      const timer = setTimeout(
        () => {
          hideNotificationHandler();
        },
        active_notification.status === 'success' ? 3e3 : 5e3
      );

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
      animation: notification_data.animation,
    });
  };

  // --------------------------------------------

  const hideNotificationHandler = () => {
    if (active_notification.status !== 'pending') {
      setActiveNotification({ ...active_notification, animation: 'hide' });
    }
  };

  // --------------------------------------------

  const beginNotification = ({ message }) => {
    showNotificationHandler({
      title: 'Loading...',
      message,
      status: 'pending',
      animation: 'show',
    });
  };

  const endNotificationSuccess = ({ message }) => {
    showNotificationHandler({
      title: 'Done!',
      message,
      status: 'success',
      animation: 'show',
    });
  };

  const endNotificationError = ({ message }) => {
    showNotificationHandler({
      title: 'Error!',
      message: `Message from backend:\n${message}`,
      status: 'error',
      animation: 'show',
    });
  };

  // --------------------------------------------

  const context = {
    notification: active_notification,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler,
    begin: beginNotification,
    endSuccess: endNotificationSuccess,
    endError: endNotificationError,
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
