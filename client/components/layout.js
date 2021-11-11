import { useContext } from 'react';
import { useRouter } from 'next/router';

import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// ==============================================

export default function Layout(props) {
  // --------------------------------------------

  const router = useRouter();

  // --------------------------------------------

  let menuItems;

  if (props.token) {
    // Logged-in
    if (props.user.role === 'admin') {
      menuItems = [
        {
          text: 'Home',
          icon: (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              fill='currentColor'
              viewBox='0 0 16 16'
            >
              <path
                fillRule='evenodd'
                d='M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z'
              />
              <path
                fillRule='evenodd'
                d='M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z'
              />
            </svg>
          ),
          path: '/dashboard-admin',
        },
      ];
    } else {
      menuItems = [
        {
          text: 'Home',
          icon: (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              fill='currentColor'
              viewBox='0 0 16 16'
            >
              <path
                fillRule='evenodd'
                d='M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z'
              />
              <path
                fillRule='evenodd'
                d='M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z'
              />
            </svg>
          ),
          path: '/dashboard-customer',
        },
        {
          text: 'Cart',
          icon: (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              fill='currentColor'
              viewBox='0 0 16 16'
            >
              <path d='M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z' />
            </svg>
          ),
          path: '/cart',
        },
      ];
    }
  } else {
    // Not logged-in
    menuItems = [];
  }

  // --------------------------------------------

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* ----------------------------------- */}

      {/* navbar */}
      <Navbar bg='dark' variant='dark'>
        <Container>
          <Navbar.Brand href='#home'>Anywhere Fitness</Navbar.Brand>

          <Nav className='me-auto'>
            {menuItems.map((item) => (
              <Nav.Link
                href={item.path}
                key={item.text}
                onClick={(e) => {
                  // e.preventDefault();
                  // router.push(item.path);
                }}
                style={
                  {
                    // background: router.pathname === item.path && '#f9f9f9',
                  }
                }
              >
                <span>{item.icon}</span>
                <span>{item.text}</span>
              </Nav.Link>
            ))}
          </Nav>

          <div>
            {props.token && (
              <Row>
                <Col
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <h6>{`${props.user.username} | ${props.user.role}`}</h6>
                </Col>
                <Col
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                  }}
                >
                  <Button variant='secondary' onClick={props.logout}>
                    Logout
                  </Button>
                </Col>
              </Row>
            )}
          </div>
        </Container>
      </Navbar>

      {/* ----------------------------------- */}

      {/* main-content: between navbar and footer */}
      <main
        style={{
          // border: 'dashed darkorange 3px',
          flexGrow: 1,
        }}
      >
        <Container>{props.children}</Container>
      </main>

      {/* ----------------------------------- */}

      <footer>
        <Navbar bg='dark' variant='dark'>
          <Container>Footer</Container>
        </Navbar>
      </footer>
    </div>
  );
}
