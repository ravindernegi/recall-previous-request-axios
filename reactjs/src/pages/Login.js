import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import api from '../api';
import { useHistory } from 'react-router-dom';
const Login = (props) => {
  const history = useHistory();

  const [validated, setValidated] = useState(false);
  const [errors, setErrors] = useState('');
  const [data, setData] = useState({});

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
    setValidated(true);
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;

    if (form.checkValidity() === true) {
      api
        .post('/auth/login', data)
        .then((res) => {
          if (res?.data?.data) {
            localStorage.setItem('auth_token', res?.data?.data?.token);
            localStorage.setItem(
              'refresh_token',
              res?.data?.data?.refresh_token
            );
            window.location = "/profile";
          }
          setErrors('');
        })
        .catch((error) => {
          if (
            error.response &&
            Object.entries(error.response?.data?.errors).length > 0
          ) {
            setErrors(
              Object.entries(error.response?.data?.errors).map((val, index) => (
                <div key={index}>*{val[1]}</div>
              ))
            );
          }

          console.log(error);
        });
    }
    setValidated(true);
    event.preventDefault();
  };

  return (
    <Container>
      <Row className='justify-content-md-center '>
        <Col
          md='4'
          className='shadow-sm rounded p-5 bg-white '
          style={{ marginTop: 100 }}
        >
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <h1 className=' mb-3'>Login</h1>
            {errors && <Alert variant='danger'>{errors}</Alert>}
            <Form.Group controlId='formBasicEmail'>
              <Form.Label>Email </Form.Label>
              <Form.Control
                type='email'
                placeholder='Email'
                name='email'
                onChange={handleChange}
                required
              />
              <Form.Control.Feedback type='invalid'>
                Please enter a email.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId='formBasicPassword'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Password'
                name='password'
                onChange={handleChange}
                required
              />
              <Form.Control.Feedback type='invalid'>
                Please enter a password.
              </Form.Control.Feedback>
            </Form.Group>
            <Button variant='danger' type='submit'>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
