import * as React from 'react';

import Table from 'react-bootstrap/Table';

// ==============================================

export default function TableCourses({ courses }) {
  // --------------------------------------------

  return (
    <>
      <Table
        striped
        bordered
        hover
        variant='dark'
        responsive
        style={{ maxHeight: '260px', overflowY: 'scroll' }}
      >
        <thead>
          <tr>
            <th></th>
            <th>ID</th>
            <th>Title</th>
            <th>Date</th>
            <th>Start Time</th>
            <th>Duration</th>
            <th>City</th>
            <th>Registered</th>
            <th>Max Class Size</th>
          </tr>
        </thead>
        <tbody>
          {courses &&
            courses.map((course, idx) => {
              return (
                <tr key={idx}>
                  <td>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='16'
                      height='16'
                      fill='currentColor'
                      viewBox='0 0 16 16'
                    >
                      <path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z' />
                      <path d='M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z' />
                    </svg>
                  </td>
                  <td>{course?.id}</td>
                  <td>{course?.title}</td>
                  <td>{course?.date}</td>
                  <td>{course?.time}</td>
                  <td>{course?.duration}</td>
                  <td>{course?.city}</td>
                  <td>{course?.registered_attendees}</td>
                  <td>{course?.max_class_size}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </>
  );
}
