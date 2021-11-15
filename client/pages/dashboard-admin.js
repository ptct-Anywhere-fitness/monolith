import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';

import { format } from 'date-fns';

// import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import TableCourses from '../components/tables/table-courses';
import TableUsers from '../components/tables/table-users';
import TableOrders from '../components/tables/table-orders';

import AddCourseModal from '../components/modals/add-course-modal';

import { AuthContext } from '../context/auth-context';
import { LoadingContext } from '../context/loading-context';

import getData from '../helpers/get-data';
// import fetchData from '../helpers/fetch-data';

// ==============================================

export default function AdminDashboarPage() {
  // --------------------------------------------

  const [courses, setCourses] = useState();
  const [users, setUsers] = useState();
  const [orders, setOrders] = useState();

  useEffect(() => {
    console.log('orders (AdminDashboardPage): ', orders);
  }, [orders]);

  // --------------------------------------------

  const authCtx = useContext(AuthContext);
  const loadingCtx = useContext(LoadingContext);

  const router = useRouter();

  // --------------------------------------------

  const [show_add_course_modal, setShowAddCourseModal] = useState();
  const handleAddCourseModalClose = () => {
    setShowAddCourseModal(false);
    // setActiveModalCourse({});
  };
  const handleAddCourseModalOpen = () => {
    setShowAddCourseModal(true);
  };

  // --------------------------------------------

  // -NOTE: Two set of requests are made to the
  //        endpoints for the tables!!!
  // -TODO: Fix this!

  // --------------------------------------------
  useEffect(() => {
    const token = authCtx.token;

    // -Only exsecute if token has been retreived
    //  from local storage (e.g. page-refresh)
    // -See auth-hook for retrieval of token
    //  from local storage.
    if (token && authCtx.user.role === 'admin') {
      // -GET Courses:
      (async () => {
        try {
          const p = await getData('/courses', token);
          // console.log('courses: ', p);
          setCourses(p);
        } catch (err) {
          console.log(
            'Error in dashboard-admin --> useEffect() --> getData(/courses),  err: ',
            err
          );
          loadingCtx.setIsLoading(false);
          // setError(
          //   err.message || // This message comes from the backend!
          //     'Error in onLoginHandler()'
          // );
        }
      })();

      // -GET Users:
      (async () => {
        try {
          const u = await getData('/users', token);
          // console.log('users: ', u);
          setUsers(u);
        } catch (err) {
          console.log(
            'Error in dashboard-admin --> useEffect() --> getData(/users),  err: ',
            err
          );
          loadingCtx.setIsLoading(false);
          // setError(
          //   err.message || // This message comes from the backend!
          //     'Error in onLoginHandler()'
          // );
        }
      })();

      // -GET Orders:
      (async () => {
        try {
          const o = await getData('/orders', token);
          console.log('orders: ', o);
          setOrders(o);
        } catch (err) {
          console.log(
            'Error in dashboard-admin --> useEffect() --> getData(/orders),  err: ',
            err
          );
          loadingCtx.setIsLoading(false);
          // setError(
          //   err.message || // This message comes from the backend!
          //     'Error in onLoginHandler()'
          // );
        }
      })();
    } else {
      // -If no token or if user is not a admin
      //  then redirect back to root-route.
      router.replace('/');
    }
  }, [authCtx.token]);

  // --------------------------------------------

  return (
    <>
      <Row>
        <Col>
          <h4>Admin Dashboard</h4>
        </Col>
        <Col
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        >
          <h6>{format(new Date(), 'MMMM do Y')}</h6>
        </Col>
      </Row>

      <hr />

      <AddCourseModal
        show_modal={show_add_course_modal}
        handleClose={handleAddCourseModalClose}
        setCourses={setCourses}
      />
      <Button onClick={handleAddCourseModalOpen}>Add a Course</Button>

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
            <TableCourses courses={courses} setCourses={setCourses} />
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

      <hr />

      {/* Table: Orders */}
      <Row>
        {orders && (
          <div
            style={{
              background: '#cfe8fc',
              width: '100%',
              padding: '1%',
              height: '300px',
            }}
          >
            {' '}
            <h6>Orders</h6>
            <TableOrders orders={orders} />
          </div>
        )}
      </Row>
    </>
  );

  // --------------------------------------------
}
