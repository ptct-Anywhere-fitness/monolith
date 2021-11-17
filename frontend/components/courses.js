import { useEffect, useContext } from 'react';
import { useRouter } from 'next/router';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

// import Product from './product';

import { AuthContext } from '../context/auth-context';
import { LoadingContext } from '../context/loading-context';
import { CartContext } from '../context/cart-context';
// import styles from '../styles/products.module.css'

import getData from '../helpers/get-data';
import { formatDate, formatTime_12hr } from '../helpers/format-date';
import { course_type_map, course_intensity_map } from '../helpers/data-maps';

// ==============================================

export default function Courses({ courses, setCourses }) {
  // --------------------------------------------

  const cartCtx = useContext(CartContext);
  const authCtx = useContext(AuthContext);
  const loadingCtx = useContext(LoadingContext);

  const router = useRouter();

  // --------------------------------------------

  useEffect(() => {
    const token = authCtx.token;
    if (token && authCtx.user.role === 'customer') {
      (async () => {
        try {
          const returned_courses = await getData('/courses', token);
          // console.log('returned_courses: ', returned_courses);
          setCourses(returned_courses);
        } catch (err) {
          console.log(
            'Error in courses.js --> useEffect() --> getData(/courses),  err: ',
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
      // -If no token or if user is not a customer
      //  then redirect back to root-route.
      router.replace('/');
    }
  }, []);

  // --------------------------------------------

  return (
    <Row>
      {courses &&
        courses?.map((course) => {
          return (
            <Col key={course.id} xs={3}>
              <Card>
                <Card.Body>
                  <Card.Title>{course.title}</Card.Title>
                  <Card.Text>{`$${(course.price / 100).toFixed(2)}`}</Card.Text>

                  <Card.Text>Type: {course_type_map[course.type]}</Card.Text>
                  <Card.Text>Duration: {course.duration}-min.</Card.Text>
                  <Card.Text>
                    Intensity: {course_intensity_map[course.intensity]}
                  </Card.Text>
                  <Card.Text>Date: {formatDate(course.date)}</Card.Text>
                  <Card.Text>
                    Start Time: {formatTime_12hr(course.time)}
                  </Card.Text>
                  <Card.Text>Location: {course.city}</Card.Text>
                  <Card.Text>
                    Registered Attendees: {course.registered_attendees}
                  </Card.Text>
                  <Card.Text>Max Class Size: {course.max_class_size}</Card.Text>
                  <Button
                    variant='primary'
                    onClick={() => {
                      cartCtx.addToCart(course);
                    }}
                  >
                    Join Class
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
    </Row>
  );

  // --------------------------------------------
}

// ==============================================
