import { useState, useEffect, useContext } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

// import Product from './product';

import { CartContext } from '../context/cart-context';

// import styles from '../styles/products.module.css'

// ==============================================

export default function Classes() {
  // --------------------------------------------

  const cartCtx = useContext(CartContext);

  const [classes, setClasses] = useState([]);

  // --------------------------------------------

  async function getData(endpoint = '') {
    // Default options are marked with *
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}${endpoint}`;
    // const url = `http://localhost:9000/api${endpoint}`;
    try {
      const response = await fetch(url, {
        method: 'GET',
        // headers: {
        //   Authorization: authCtx.token,
        // },
      });
      return response.json(); // parses JSON response into native JavaScript objects
    } catch (err) {
      console.log('error: ', err);
    }
  }

  // --------------------------------------------

  useEffect(() => {
    (async () => {
      // TODO: Change route to /classes
      const returned_classes = await getData('/products');
      console.log('returned_classes: ', returned_classes);
      setClasses(returned_classes);
    })();
  }, []);

  // --------------------------------------------

  return (
    <Row>
      {classes &&
        classes.map((_class) => {
          return (
            <Col key={_class.id} xs={3}>
              <Card>
                <Card.Img
                  variant='top'
                  src='https://picsum.photos/256/256'
                  style={{ width: '200px' }}
                />
                <Card.Body>
                  <Card.Title>{_class.title}</Card.Title>
                  <Card.Text>{`$${(_class.price / 100).toFixed(2)}`}</Card.Text>
                  <Button
                    variant='primary'
                    onClick={() => {
                      cartCtx.addToCart(_class);
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
