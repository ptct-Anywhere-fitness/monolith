import { useState, useEffect, useContext } from 'react';

import { format } from 'date-fns';

import Button from 'react-bootstrap/Button';

import TableCourses from '../components/tables/table-courses';
import TableUsers from '../components/tables/table-users';

import { AuthContext } from '../context/auth-context';
import { LoadingContext } from '../context/loading-context';

import getData from '../helpers/get-data';
import fetchData from '../helpers/fetch-data';

// ==============================================

export default function AdminDashboarPage() {
  // --------------------------------------------

  const [course_by_id, setCourseById] = useState();
  const [courses, setCourses] = useState();
  const [users, setUsers] = useState();

  // --------------------------------------------

  const authCtx = useContext(AuthContext);
  const loadingCtx = useContext(LoadingContext);

  // --------------------------------------------

  useEffect(() => {
    const token = authCtx.token;

    // -Only exsecute if token has been retreived
    //  from local storage (e.g. page-refresh)
    // -See auth-hook for retrieval of token
    //  from local storage.
    if (token) {
      (async () => {
        const p = await getData('/courses', token);
        console.log('courses: ', p);
        setCourses(p);
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

      <hr />

      <h6>Get Course By ID</h6>

      <Button
        onClick={async () => {
          try {
            loadingCtx.setIsLoading(true);

            const data = await getData('/courses/1', authCtx.token);
            console.log('data: ', data);

            // TODO: Proper error handling
            if (data.course) {
              setCourseById(data.course);
            }
          } catch (err) {
            console.log(
              'Error in dashboard-admin --> getCourseByIdHandler() -- err: ',
              err
            );
            // setError(
            //   err.message || // This message comes from the backend!
            //     'Error in onRegisterHandler()'
            // );
          }
        }}
      >
        Get Course By ID
      </Button>
      {course_by_id && (
        <div>
          <p>Title: {course_by_id.title}</p>
        </div>
      )}

      <hr />

      {courses && (
        <div
          style={{
            background: '#cfe8fc',
            width: '100%',
            padding: '1%',
            height: '300px',
          }}
        >
          {' '}
          <h6>Courses</h6>
          <TableCourses courses={courses} />
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
