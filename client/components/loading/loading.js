import { useState, useContext } from 'react';

import Spinner from 'react-bootstrap/Spinner';

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
      <Backdrop show={loadingCtx.is_loading}>
        <Spinner
          animation='border'
          role='status'
          variant='light'
          style={{
            position: 'absolute',
            top: 'calc(50% - 50px)',
            left: 'calc(50% - 50px)',
            height: '50px',
            width: '50px',
          }}
        >
          <span className='visually-hidden'>Loading...</span>
        </Spinner>
      </Backdrop>
    </>
  );
}
