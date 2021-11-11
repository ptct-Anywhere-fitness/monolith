import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Offcanvas from 'react-bootstrap/Offcanvas';
import NavDropdown from 'react-bootstrap/NavDropdown';
import FormControl from 'react-bootstrap/FormControl';

import Dropdown from 'react-bootstrap/Dropdown';

// ==============================================

export default function NavBar2() {
  return (
    <Navbar bg='light' expand='md'>
      <Container>
        <Navbar.Brand href='#'>Navbar Offcanvas</Navbar.Brand>

        <Dropdown
          /* div.dropdown */
          className='d-none d-md-block'
        >
          <Dropdown.Toggle
            /* button.btn.dropdown-toggle */
            variant='light'
            style={{
              border: 'solid green 1px',
              // position: 'relative',
              // height: '50px',
              // width: '50px',
              display: 'flex',
            }}
          >
            {/* <span
              style={{
                border: 'solid hotpink 1px',
                width: '50px',
                height: '50px',
              }}
            > */}
            <div
              style={{
                border: 'solid orange 1px',
                position: 'relative',
                height: '50px',
                width: '50px',
                display: 'inline-block',
              }}
            >
              <span
                style={{
                  background: 'lightgray',
                  position: 'absolute',
                  borderRadius: '50%',
                  width: '34px',
                  height: '34px',
                  top: 'calc(50% - 17px)', //calc(50% - 17px)',
                  left: 'calc(50% - 17px)', //calc(50% - 17px)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='16'
                  height='16'
                  fill='currentColor'
                  viewBox='0 0 16 16'
                >
                  <path d='M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z' />
                </svg>
              </span>
              <span
                style={{
                  background: '#F75F6C',
                  color: 'white',
                  height: '22px',
                  width: '22px',
                  position: 'absolute',
                  right: 0,
                  top: 0,
                  borderRadius: '50%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontSize: '0.75rem',
                }}
              >
                <span>5</span>
              </span>
            </div>
            <div
              style={{
                border: 'solid orange 1px',
                // position: 'relative',
                height: '50px',
                // width: '50px',
                // display: 'inline-block',
                // display: 'flex',
                // flexDirection: 'column',
                // justifyContent: 'space-evenly',
              }}
            >
              <div
                style={{
                  border: 'solid lightblue 1px',
                  textAlign: 'left',
                  marginLeft: '10px',
                }}
              >
                <small>Cart</small>
                <p style={{ fontSize: '14px', margin: 0 }}>$1,247.00</p>
              </div>
            </div>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href='#/action-1'>Action</Dropdown.Item>
            <Dropdown.Item href='#/action-2'>Another action</Dropdown.Item>
            <Dropdown.Item href='#/action-3'>Something else</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Navbar.Toggle aria-controls='offcanvasNavbar' />
        <Navbar.Offcanvas
          id='offcanvasNavbar'
          aria-labelledby='offcanvasNavbarLabel'
          placement='end'
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id='offcanvasNavbarLabel'>
              Offcanvas
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className='justify-content-end flex-grow-1 pe-3'>
              <Nav.Link href='#action1'>Home</Nav.Link>
              <Nav.Link href='#action2'>Link</Nav.Link>
              <NavDropdown title='Dropdown' id='offcanvasNavbarDropdown'>
                <NavDropdown.Item href='#action3'>Action</NavDropdown.Item>
                <NavDropdown.Item href='#action4'>
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href='#action5'>
                  Something else here
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Form className='d-flex'>
              <FormControl
                type='search'
                placeholder='Search'
                className='me-2'
                aria-label='Search'
              />
              <Button variant='outline-success'>Search</Button>
            </Form>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}
