// import { useState } from 'react';

import Products from '../components/products';

// import styles from '../styles/Home.module.css'

// ==============================================

export default function StorePage() {
  // --------------------------------------------

  return (
    <div className='container'>
      <div
        style={{
          bgcolor: '#cfe8fc',
          width: '100%',
          padding: '1em',
        }}
      >
        <Products />
      </div>
    </div>
  );
}
