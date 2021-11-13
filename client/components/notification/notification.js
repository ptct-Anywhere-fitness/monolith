import { useState, useEffect, useRef, useContext } from 'react';

import { gsap } from 'gsap';

import classes from './notification.module.scss';
import NotificationContext from '../../context/notification-context';

// ==============================================

export default function Notification(props) {
  // --------------------------------------------

  const notificationCtx = useContext(NotificationContext);

  // --------------------------------------------

  const [mounted, setMounted] = useState(false);
  // useEffect(() => {
  //   setMounted(true);
  //   return () => setMounted(false);
  // }, []);

  // --------------------------------------------

  const div_ref = useRef();
  const timeline_ref = useRef();

  useEffect(() => {
    console.log(
      'useEffect() \t notification.animation: ',
      notificationCtx.notification?.animation,
      ' \t mounted: ',
      mounted
    );

    if (mounted && notificationCtx.notification?.animation === 'show') {
      timeline_ref.current = gsap.timeline().to(div_ref.current, {
        duration: 0.2,
        yPercent: '-100',
        onReverseComplete: () => {
          // setCssClassList(`${css.backdrop} ${css.hide}`);
        },
      });
    } else if (mounted && notificationCtx.notification?.animation === 'hide') {
      if (timeline_ref) {
        timeline_ref.current?.reverse();
      }
    }
    setMounted(true);
    return () => setMounted(false);
  }, [notificationCtx.notification?.animation]);

  // --------------------------------------------

  const { title, message, status } = props;

  // --------------------------------------------

  let statusClasses = '';
  if (status === 'success') {
    statusClasses = classes.success;
  }
  if (status === 'error') {
    statusClasses = classes.error;
  }
  if (status === 'pending') {
    statusClasses = classes.pending;
  }

  // --------------------------------------------

  const activeClasses = `${classes.notification} ${statusClasses}`;

  // --------------------------------------------

  return (
    <div
      ref={div_ref}
      className={activeClasses}
      onClick={notificationCtx.hideNotification}
    >
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
}
