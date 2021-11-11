import { useState, useEffect } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Product from './product';

// import styles from '../styles/products.module.css'

// ==============================================

export default function Products() {
  // --------------------------------------------

  const [products, setProducts] = useState([]);

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
      const products = await getData('/products');
      console.log('products: ', products);
      setProducts(products);
    })();
  }, []);

  // --------------------------------------------

  const handleDelete = (id) => {
    const modified_products = products.filter((product) => {
      return product.id != id;
    });
    setProducts(modified_products);
  };

  // --------------------------------------------

  return (
    <Row>
      {/* Base spacing value (8?) and multiplies */}
      {/* <Grid container spacing={3}> */}

      {products &&
        products.map((product) => {
          return (
            <Col key={product.id} xs={3}>
              {/* <Grid key={product.id} item xs={12} md={6} lg={4}> */}
              <Product product={product} handleDelete={handleDelete} />
              {/* </Grid> */}
            </Col>
          );
        })}
      {/* </Grid> */}
    </Row>
  );
}
