import { useState } from 'react';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

// ==============================================

export default function ModalComponent({ show_modal, handleClose, course_id }) {
  // --------------------------------------------

  return (
    <>
      <Modal
        show={show_modal}
        onHide={handleClose}
        backdrop='static'
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>Course ID: {course_id}</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='primary'>Understood</Button>
        </Modal.Footer>
      </Modal>
    </>
  );

  // --------------------------------------------
}

// ==============================================
