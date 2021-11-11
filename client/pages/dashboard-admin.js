import { useState, useEffect, useContext } from 'react';

import { format } from 'date-fns';

import TableProducts from '../components/tables/table-products';
import TableUsers from '../components/tables/table-users';

import { AuthContext } from '../context/auth-context';

// ==============================================

export default function DashboardPage() {
  // --------------------------------------------

  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);

  // --------------------------------------------

  const authCtx = useContext(AuthContext);

  // --------------------------------------------

  async function getData(endpoint = '', token = {}) {
    // Default options are marked with *
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}${endpoint}`;
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: token,
        },
      });
      return response.json(); // parses JSON response into native JavaScript objects
    } catch (err) {
      console.log('error: ', err);
    }
  }

  // --------------------------------------------

  useEffect(() => {
    const token = authCtx.token;

    // -Only exsecute if token has been retreived
    //  from local storage (e.g. page-refresh)
    // -See auth-hook for retrieval of token
    //  from local storage.
    if (token) {
      (async () => {
        const p = await getData('/products', token);
        console.log('products: ', p);
        setProducts(p);
      })();

      (async () => {
        const u = await getData('/users', token);
        console.log('users: ', u);
        setUsers(u);
      })();
    }
  }, [authCtx.token]);

  // --------------------------------------------

  return (
    <main>
      <h4>Admin Dashboard</h4>

      <h6>{format(new Date(), 'MMMM do Y')}</h6>

      {products && (
        <div
          style={{
            background: '#cfe8fc',
            width: '100%',
            padding: '1%',
            height: '300px',
          }}
        >
          {' '}
          <h6>Products</h6>
          <TableProducts products={products} />
        </div>
      )}

      <hr />

      {users && (
        <div
          style={{
            background: '#cfe8fc',
            width: '100%',
            padding: '1%',
            height: '300px',
          }}
        >
          {' '}
          <h6>Users</h6>
          <TableUsers users={users} />
        </div>
      )}
    </main>
  );

  // --------------------------------------------
}
