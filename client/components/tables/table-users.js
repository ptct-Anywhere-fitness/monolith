import * as React from 'react';

function createData(username, user_id, role, password) {
  return { username, user_id, role, password };
}

// ==============================================

export default function TableUsers({ users }) {
  const rows = users.map((user) => {
    return createData(
      user.username,
      user.user_id,
      user.role,
      user.password,
      user.first_name,
      user.last_name
    );
  }, []);

  return (
    <>
      <table
        style={{
          fontFamily: 'arial, sans-serif',
          borderCollapse: 'collapse',
          width: '100%',
          maxHeight: '260px',
          overflowY: 'scroll',
        }}
      >
        <tr>
          <th></th>
          <th>ID</th>
          <th>Role</th>
          <th>Password</th>
        </tr>
        {rows &&
          rows.map((row, idx) => (
            <tr key={idx}>
              <td>+</td>
              <td>{row?.user_id}</td>
              <td>{row?.role}</td>
              <td>{row?.password}</td>
            </tr>
          ))}
      </table>
    </>
  );
}
