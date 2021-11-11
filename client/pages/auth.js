import { useState, useContext } from 'react';
// import { useRouter } from 'next/router';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

// import { LoadingContext } from '../context/loading-context';
import { AuthContext } from '../context/auth-context';
import { LoadingContext } from '../context/loading-context';

import postData from '../helpers/post-data';

// import styles from '../styles/Auth.module.css'

// ==============================================

export default function AuthPage() {
  // --------------------------------------------

  const loadingCtx = useContext(LoadingContext);
  const authctx = useContext(AuthContext);
  // const router = useRouter();

  // --------------------------------------------

  // const [is_loading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const [mode, setMode] = useState('login');
  const [username, setUsername] = useState('homer');
  const [password, setPassword] = useState('1234');
  const [first_name, setFirst_name] = useState('homer');
  const [last_name, setLast_name] = useState('simpson');
  const [role, setRole] = useState('customer');

  // --------------------------------------------

  const onRegisterHandler = async (e) => {
    e.preventDefault();
    try {
      // -Since this is async,
      //  (not sure if it is because in async func or because below code is async)
      //  react will immediately update the state
      //  and not batch updates.
      loadingCtx.setIsLoading(true);

      const data = await postData('/auth/register', {
        username,
        password,
        role,
        first_name,
        last_name,
      });
      console.log('data: ', data);
      if (data) {
        // TODO: Do proper error checking to ensure the
        //       response matches what is expected from
        //       a successful registration.
        setMode('login');
      }
    } catch (err) {
      console.log('Error in onRegisterHandler() -- err: ', err);
      setError(
        err.message || // This message comes from the backend!
          'Error in onRegisterHandler()'
      );
    }

    loadingCtx.setIsLoading(false);
  }; // onRegisterHandler()

  // --------------------------------------------

  const onLoginHandler = async (e) => {
    e.preventDefault();
    console.log(
      'onLoginHandler -- username:  ',
      username,
      ', password: ',
      password
    );

    try {
      loadingCtx.setIsLoading(true);
      const response = await postData('/auth/login', { username, password });

      // -4xx / 5xx status code does NOT throw error.
      // -data.ok is true with a 2xx status code
      if (!response.ok) {
        // -This comes from the .message property
        //  sent from the backend.
        throw new Error(data.message);
      }

      const data = await response.json();

      // -Don't want to set isLoading state
      //  after we change the context,
      //  because we may be re-directed
      //  (routes are based on this state).
      // -We want to first clear the
      //  local state on this page
      //  before we trigger something
      //  that might change the component.
      // -Else, we may be updating the
      //  state of a component that is
      //  not on the screen anymore!
      loadingCtx.setIsLoading(false);
      authctx.login(data.token);
    } catch (err) {
      console.log('Error in onLoginHandler() -- err: ', err);
      loadingCtx.setIsLoading(false);
      setError(
        err.message || // This message comes from the backend!
          'Error in onLoginHandler()'
      );
    }
  };

  // --------------------------------------------

  return (
    <Container>
      <Row>
        <Col>
          <h5>Auth Page</h5>
        </Col>
      </Row>
      <Row>
        <Col>
          <form
            onSubmit={mode === 'login' ? onLoginHandler : onRegisterHandler}
            style={{ bgcolor: '#cfe8fc', padding: '1em' }}
          >
            <Row>
              <Col sm={12} md={6}>
                <label htmlFor='username'>Username</label>
                <Form.Control
                  type='text'
                  id='username'
                  label='username'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Col>

              <Col sm={12} md={6}>
                <label htmlFor='password'>Password</label>
                <Form.Control
                  type='text'
                  id='password'
                  label='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Col>
            </Row>

            <Row>
              {mode === 'register' && (
                <>
                  <Col sm={12} md={6}>
                    <label htmlFor='first_name'>First Name</label>
                    <Form.Control
                      type='text'
                      id='first_name'
                      label='first_name'
                      value={first_name}
                      onChange={(e) => setFirst_name(e.target.value)}
                    />
                  </Col>

                  <Col sm={12} md={6}>
                    <label htmlFor='last_name'>Last Name</label>
                    <Form.Control
                      type='text'
                      id='last_name'
                      label='last_name'
                      value={last_name}
                      onChange={(e) => setLast_name(e.target.value)}
                    />
                  </Col>
                </>
              )}

              <Row
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-evenly',
                  padding: '1em',
                  bgcolor: 'red',
                }}
              >
                <Button type='submit' variant='dark'>
                  {mode === 'login' ? 'login' : 'register'}
                </Button>
              </Row>

              <Row>
                {mode === 'login' ? null : (
                  <div>
                    <p>User Type</p>

                    <input
                      id='customer'
                      type='radio'
                      name='role'
                      value='customer'
                      onChange={(e) => {
                        setRole(e.target.value);
                      }}
                      defaultChecked
                    />
                    <label htmlFor='customer'>Customer</label>

                    <input
                      id='admin'
                      type='radio'
                      name='role'
                      value='admin'
                      onChange={(e) => {
                        setRole(e.target.value);
                      }}
                    />
                    <label htmlFor='admin'>Admin</label>
                  </div>
                )}
              </Row>
            </Row>
          </form>
        </Col>
      </Row>
      <hr />
      <Button
        variant='light'
        onClick={() => {
          if (mode === 'login') {
            setMode('register');
          } else {
            setMode('login');
          }
        }}
      >
        {mode === 'login' ? 'register' : 'login'}
      </Button>
    </Container>
  );
}
