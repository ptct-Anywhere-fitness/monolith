import * as React from 'react';

function createData(title, price, quantity, category, details) {
  return { title, price, quantity, category, details };
}

// ==============================================

export default function TableCourses({ courses }) {
  const rows = courses.map((course) => {
    return createData(
      course.title,
      (course.price / 100).toFixed(2),
      course.quantity_in_stock,
      course.category
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
          <th>Course Title</th>
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
