import { useState, useEffect, useContext } from 'react';
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

// ==============================================

export default function Courses() {
  // --------------------------------------------

  const cartCtx = useContext(CartContext);
  const authCtx = useContext(AuthContext);
  const loadingCtx = useContext(LoadingContext);

  const [courses, setCourses] = useState();

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
                <Card.Img
                  variant='top'
                  src='https://picsum.photos/256/256'
                  style={{ width: '200px' }}
                />
                <Card.Body>
                  <Card.Title>{course.title}</Card.Title>
                  <Card.Text>{`$${(course.price / 100).toFixed(2)}`}</Card.Text>
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
}
