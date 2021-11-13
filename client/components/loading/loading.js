import { useState, useContext } from 'react';

import Backdrop from '../backdrop/Backdrop';

import { LoadingContext } from '../../context/loading-context';

// ==============================================

export default function Loading() {
  // --------------------------------------------

  const loadingCtx = useContext(LoadingContext);

  // --------------------------------------------

  return (
    <>
      {/* <Backdrop show={loadingCtx.is_loading} /> */}
      <Backdrop show={true} />
    </>
  );
}
