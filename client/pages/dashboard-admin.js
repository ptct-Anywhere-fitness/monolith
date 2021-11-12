import { useState, useEffect, useContext } from 'react';

import { format } from 'date-fns';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
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

  const [deleted_course, setDeletedCourse] = useState();
  const [put_course, setPutCourse] = useState();
  const [posted_course, setPostedCourse] = useState();
  const [course_by_id, setCourseById] = useState();
  const [courses, setCourses] = useState();
  const [users, setUsers] = useState();

  // --------------------------------------------

  const [delete_course_id, setDeleteCourseId] = useState('');
  const [put_course_id, setPutCourseId] = useState('');
  const [put_course_title, setPutCourseTitle] = useState('');
  const [post_course_title, setPostCourseTitle] = useState('');

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
  }, [deleted_course, put_course, posted_course, authCtx.token]);

  // --------------------------------------------

  return (
    <>
      <h4>Admin Dashboard</h4>

      <h6>{format(new Date(), 'MMMM do Y')}</h6>

      <hr />

      <h6>Get Course By ID</h6>

      <Row>
        <Col>
          <Button
            onClick={async () => {
              try {
                loadingCtx.setIsLoading(true);

                const data = await getData('/courses/1', authCtx.token);
                console.log('data: ', data);

                // TODO: Proper error handling
                if (data.course) {
                  setCourseById(data.course);
                  loadingCtx.setIsLoading(false);
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
        </Col>
      </Row>

      <hr />

      <Row>
        <Col>
          <h6>Post Course</h6>

          <form
            onSubmit={async (e) => {
              e.preventDefault();

              try {
                loadingCtx.setIsLoading(true);
                const response = await fetchData('/courses', 'POST', {
                  title: post_course_title,
                });

                const data = await response.json();

                // -4xx / 5xx status code does NOT throw error.
                // -data.ok is true with a 2xx status code
                if (!response.ok) {
                  // -data.message comes from the .message property
                  //  sent from the backend.
                  throw new Error(data.message);
                }

                console.log('data: ', data);

                setPostedCourse(data);
                loadingCtx.setIsLoading(false);
              } catch (err) {
                console.log(
                  'Error in dashboard-admin --> postCourseHandler() -- err: ',
                  err
                );
                loadingCtx.setIsLoading(false);
                // setError(
                //   err.message || // This message comes from the backend!
                //     'Error in onLoginHandler()'
                // );
              }
            }}
          >
            <label>
              Title:
              <input
                type='text'
                value={post_course_title}
                onChange={(e) => setPostCourseTitle(e.target.value)}
              ></input>
            </label>

            <Button type='submit'>Post Course</Button>
          </form>

          {posted_course && (
            <div>
              Posted Course:
              <p>Title: {posted_course.title}</p>
              <p>Title: {posted_course.id}</p>
            </div>
          )}
        </Col>
      </Row>

      <hr />

      <Row>
        <Col>
          <h6>Update Course</h6>

          <form
            onSubmit={async (e) => {
              e.preventDefault();

              console.log('PUT course handler');

              try {
                loadingCtx.setIsLoading(true);
                const response = await fetchData(
                  `/courses/${put_course_id}`,
                  'PUT',
                  {
                    title: put_course_title,
                  }
                );

                const data = await response.json();

                // -4xx / 5xx status code does NOT throw error.
                // -data.ok is true with a 2xx status code
                if (!response.ok) {
                  // -data.message comes from the .message property
                  //  sent from the backend.
                  throw new Error(data.message);
                }

                console.log('data: ', data);

                setPutCourse(data);
                loadingCtx.setIsLoading(false);
              } catch (err) {
                console.log(
                  'Error in dashboard-admin --> putCourseHandler() -- err: ',
                  err
                );
                loadingCtx.setIsLoading(false);
                // setError(
                //   err.message || // This message comes from the backend!
                //     'Error in onLoginHandler()'
                // );
              }
            }}
          >
            <label>
              ID:
              <input
                value={put_course_id}
                onChange={(e) => setPutCourseId(e.target.value)}
              ></input>
            </label>

            <label>
              Title:
              <input
                type='text'
                value={put_course_title}
                onChange={(e) => setPutCourseTitle(e.target.value)}
              ></input>
            </label>

            <Button type='submit'>Update Course</Button>
          </form>

          {put_course && (
            <div>
              Updated Course:
              <p>Title: {put_course.title}</p>
              <p>ID: {put_course.id}</p>
            </div>
          )}
        </Col>
      </Row>

      <hr />

      <Row>
        <Col>
          <h6>Delete Course</h6>

          <form
            onSubmit={async (e) => {
              e.preventDefault();

              console.log('DELETE course handler');

              try {
                loadingCtx.setIsLoading(true);
                const response = await fetchData(
                  `/courses/${delete_course_id}`,
                  'DELETE'
                );

                const data = await response.json();

                // -4xx / 5xx status code does NOT throw error.
                // -data.ok is true with a 2xx status code
                if (!response.ok) {
                  // -data.message comes from the .message property
                  //  sent from the backend.
                  throw new Error(data.message);
                }

                console.log('data: ', data);

                setDeletedCourse(data);
                loadingCtx.setIsLoading(false);
              } catch (err) {
                console.log(
                  'Error in dashboard-admin --> deleteCourseHandler() -- err: ',
                  err
                );
                loadingCtx.setIsLoading(false);
                // setError(
                //   err.message || // This message comes from the backend!
                //     'Error in onLoginHandler()'
                // );
              }
            }}
          >
            <label>
              ID:
              <input
                value={delete_course_id}
                onChange={(e) => setDeleteCourseId(e.target.value)}
              ></input>
            </label>

            <Button type='submit'>Delete Course</Button>
          </form>

          {deleted_course && (
            <div>
              Deleted Course:
              <p>Title: {deleted_course.title}</p>
              <p>ID: {deleted_course.id}</p>
            </div>
          )}
        </Col>
      </Row>

      <hr />

      {/* Table: Courses */}
      <Row>
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
      </Row>

      <hr />

      {/* Table: Users */}
      <Row>
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
      </Row>
    </>
  );

  // --------------------------------------------
}
