import { useContext } from 'react';
// import { useRouter } from 'next/router';

import Button from 'react-bootstrap/Button';
// import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';

import Loading from './loading/loading';
import Notification from '../components/notification/notification';

import { AuthContext } from '../context/auth-context';
import NotificationContext from '../context/notification-context';

// ==============================================

export default function Layout(props) {
  // --------------------------------------------

  // const router = useRouter();
  const autCtx = useContext(AuthContext);
  const notificationCtx = useContext(NotificationContext);

  const active_notification = notificationCtx.notification;

  // --------------------------------------------

  return (
    <>
      <div
        style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* ----------------------------------- */}

        {/* navbar */}
        <Navbar bg='dark' variant='dark' className='p-3'>
          <Container>
            <Navbar.Brand href='/'>Anywhere Fitness</Navbar.Brand>

            {autCtx.isLoggedIn && (
              <Navbar.Collapse className='justify-content-center'>
                <Navbar.Text>
                  Signed in as:{' '}
                  <h6
                    style={{ display: 'inline' }}
                  >{`${props.user?.username} | ${props.user?.role}`}</h6>
                </Navbar.Text>
              </Navbar.Collapse>
            )}

            <div style={{ color: 'white' }}>
              {props.token && (
                <Button variant='secondary' onClick={props.logout}>
                  Logout
                </Button>
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
          <Container className='mt-4'>{props.children}</Container>
        </main>

        {/* ----------------------------------- */}

        <footer>
          <Navbar bg='dark' variant='dark'>
            <Container>Footer</Container>
          </Navbar>
        </footer>
      </div>

      {/* ----------------------------------- */}

      {/* loading-spinner and backdrop */}
      <Loading />

      {/* ----------------------------------- */}

      {/* notification UI-feedback */}
      {active_notification && (
        <Notification
          title={active_notification.title}
          message={active_notification.message}
          status={active_notification.status}
        />
      )}

      {/* ----------------------------------- */}
    </>
  );
}
