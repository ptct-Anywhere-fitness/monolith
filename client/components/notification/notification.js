import { useState, useEffect, useRef, useContext } from 'react';
import { createPortal } from 'react-dom';

import { gsap } from 'gsap';

import classes from './notification.module.scss';
import NotificationContext from '../../context/notification-context';

// ==============================================

export default function Notification(props) {
  // --------------------------------------------

  const notificationCtx = useContext(NotificationContext);

  // --------------------------------------------

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // --------------------------------------------

  const div_ref = useRef();
  const timeline_ref = useRef();

  useEffect(() => {
    // console.log(
    //   'useEffect() \t notification.animation: ',
    //   notificationCtx.notification?.animation,
    //   ' \t mounted: ',
    //   mounted
    // );

    if (mounted && notificationCtx.notification?.animation === 'show') {
      timeline_ref.current = gsap.timeline().to(div_ref.current, {
        duration: 0.2,
        yPercent: '-100',
        onReverseComplete: () => {
          setActiveClasses(`${classes.hide}`);
        },
      });
    } else if (mounted && notificationCtx.notification?.animation === 'hide') {
      if (timeline_ref.current) {
        timeline_ref.current?.reverse();
      }
    }
  }, [mounted, notificationCtx.notification?.animation]);

  // --------------------------------------------

  const { title, message, status } = props;

  // --------------------------------------------

  // --------------------------------------------

  const [active_classes, setActiveClasses] = useState();
  useEffect(() => {
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

    setActiveClasses(`${classes.notification} ${statusClasses}`);
  }, [notificationCtx.notification.status]);

  // --------------------------------------------

  const notification_div = (
    <div
      ref={div_ref}
      className={active_classes}
      onClick={notificationCtx.hideNotification}
    >
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
  // --------------------------------------------

  return mounted
    ? createPortal(
        notification_div,
        document.getElementById('notification-hook')
      )
    : null;

  // --------------------------------------------
}
