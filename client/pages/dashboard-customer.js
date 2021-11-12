import { useState, useEffect, useContext } from 'react';

import Courses from '../components/courses';
import Cart from '../components/cart';

// import { AuthContext } from '../context/auth-context';
// import { LoadingContext } from '../context/loading-context';

// ==============================================

export default function CustomerDashboardPage() {
  // --------------------------------------------

  // const authCtx = useContext(AuthContext);
  // const loadingCtx = useContext(LoadingContext);

  // --------------------------------------------

  return (
    <>
      <Courses />
      <Cart />
    </>
  );
}
