import * as React from 'react';

function createData(title, price, quantity, category, details) {
  return { title, price, quantity, category, details };
}

// ==============================================

export default function TableProducts({ products }) {
  const rows = products.map((product) => {
    return createData(
      product.title,
      (product.price / 100).toFixed(2),
      product.quantity_in_stock,
      product.category
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
          <th>Product Title</th>
          <th>Price ($)</th>
          <th>Quantity</th>
          <th>Details</th>
        </tr>
        {rows &&
          rows.map((row, idx) => (
            <tr key={idx}>
              <td>+</td>
              <td>{row?.title}</td>
              <td>{row?.price}</td>
              <td>{row?.quantity}</td>
              <td>{row?.category}</td>
              <td>{row?.details}</td>
            </tr>
          ))}
      </table>
    </>
  );
}
