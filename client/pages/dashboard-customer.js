import { useState, useEffect } from 'react';

import ModalBackdrop from '../components/modals/test-modal';

import Courses from '../components/courses';
import Cart from '../components/cart';

import Calendar from '../components/calendar/Calendar';

// import { AuthContext } from '../context/auth-context';
// import { LoadingContext } from '../context/loading-context';

// ==============================================

export default function CustomerDashboardPage() {
  // --------------------------------------------

  // const authCtx = useContext(AuthContext);
  // const loadingCtx = useContext(LoadingContext);

  const [date, setDate] = useState('');
  const [days, setDays] = useState(1);

  useEffect(() => {
    console.log('date: ', date);
  }, [date]);

  useEffect(() => {
    console.log('days: ', days);
  }, [days]);

  // --------------------------------------------

  return (
    <>
      <Calendar setDate={setDate} setDays={setDays} />
      <Courses />
      <Cart />
    </>
  );
}
