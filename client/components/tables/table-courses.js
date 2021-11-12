import { useState } from 'react';

import { format } from 'date-fns';

// import Button from 'react-bootstrap/Button';

import Table from 'react-bootstrap/Table';
import CourseDetailsModal from '../modals/course-details-modal';

// ==============================================

export default function TableCourses({ courses, setCourses }) {
  // --------------------------------------------

  const [details_modal_course, setDetailsModalCourse] = useState();
  const [show_details_modal, setShowDetailsModal] = useState();
  const handleDetailsModalClose = () => {
    setShowDetailsModal(false);
    // setActiveModalCourse({});
  };
  const handleDetailsModalOpen = (course) => () => {
    setDetailsModalCourse(course);
    setShowDetailsModal(true);
  };

  // --------------------------------------------

  return (
    <>
      <CourseDetailsModal
        show_modal={show_details_modal}
        handleClose={handleDetailsModalClose}
        course={details_modal_course}
        setCourses={setCourses}
      />

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
                  <td
                    onClick={handleDetailsModalOpen(course)}
                    style={{ cursor: 'pointer' }}
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='16'
                      height='16'
                      fill='currentColor'
                      viewBox='0 0 16 16'
                    >
                      <path d='M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z' />
                      <path
                        fillRule='evenodd'
                        d='M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z'
                      />
                    </svg>

                    {/* <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='16'
                      height='16'
                      fill='currentColor'
                      viewBox='0 0 16 16'
                    >
                      <path d='M2.5 4a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1zm2-.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm1 .5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z' />
                      <path d='M2 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2H2zm13 2v2H1V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zM2 14a1 1 0 0 1-1-1V6h14v7a1 1 0 0 1-1 1H2z' />
                    </svg> */}

                    {/* <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='16'
                      height='16'
                      fill='currentColor'
                      viewBox='0 0 16 16'
                    >
                      <path d='M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z' />
                    </svg> */}

                    {/* <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='16'
                      height='16'
                      fill='currentColor'
                      viewBox='0 0 16 16'
                    >
                      <path d='M2.5 1A1.5 1.5 0 0 0 1 2.5v11A1.5 1.5 0 0 0 2.5 15h6.086a1.5 1.5 0 0 0 1.06-.44l4.915-4.914A1.5 1.5 0 0 0 15 8.586V2.5A1.5 1.5 0 0 0 13.5 1h-11zM2 2.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 .5.5V8H9.5A1.5 1.5 0 0 0 8 9.5V14H2.5a.5.5 0 0 1-.5-.5v-11zm7 11.293V9.5a.5.5 0 0 1 .5-.5h4.293L9 13.793z' />
                    </svg> */}
                  </td>

                  <td>{course?.id}</td>
                  <td>{course?.title}</td>
                  {/* <td>{format(course?.date, 'MMMM do Y')}</td> */}
                  <td>
                    {course?.date &&
                      format(new Date(course?.date), 'MMMM do Y')}
                  </td>
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
