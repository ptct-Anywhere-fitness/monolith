import * as React from 'react';

function createData(title, id, price, quantity, category, details) {
  return { title, id, price, quantity, category, details };
}

// ==============================================

export default function TableCourses({ courses }) {
  const rows = courses.map((course) => {
    return createData(
      course.title,
      course.id,
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
          <th>id</th>
          <th>Course Title</th>
          <th>Price ($)</th>
          <th>Quantity</th>
          <th>Category</th>
        </tr>
        {rows &&
          rows.map((row, idx) => {
            return (
              <tr key={idx}>
                <td>+</td>
                <td>{row?.id}</td>
                <td>{row?.title}</td>
                <td>{row?.price}</td>
                <td>{row?.quantity}</td>
                <td>{row?.category}</td>
              </tr>
            );
          })}
      </table>
    </>
  );
}
