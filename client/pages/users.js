import { useState, useContext } from 'react';

import { AuthContext } from '../context/auth-context';

import getData from '../helpers/get-data';

// ==============================================

export default function Users() {
  // --------------------------------------------

  const [users, setUsers] = useState([]);

  // --------------------------------------------

  const authCtx = useContext(AuthContext);

  // --------------------------------------------

  const getUsersHandler = async () => {
    setUsers(await getData('/users', authCtx.token));
    console.log('users: ', users);
  };

  // --------------------------------------------

  return <button onClick={getUsersHandler}>Get Users</button>;

  // --------------------------------------------
}
