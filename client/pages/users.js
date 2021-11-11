import { useState, useContext } from 'react';

import { AuthContext } from '../context/auth-context';

// ==============================================

export default function Users() {
  // --------------------------------------------

  const [users, setUsers] = useState([]);

  // --------------------------------------------

  const authCtx = useContext(AuthContext);

  // --------------------------------------------

  async function getData(endpoint = '') {
    // Default options are marked with *
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}${endpoint}`;
    // const url = `http://localhost:9000/api${endpoint}`;
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: authCtx.token,
        },
      });
      return response.json(); // parses JSON response into native JavaScript objects
    } catch (err) {
      console.log('error: ', err);
    }
  }

  // --------------------------------------------

  const getUsersHandler = async () => {
    setUsers(await getData('/users'));
    console.log('users: ', users);
  };

  // --------------------------------------------

  return <button onClick={getUsersHandler}>Get Users</button>;

  // --------------------------------------------
}
