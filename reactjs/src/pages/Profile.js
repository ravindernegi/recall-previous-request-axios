import React, { useState,useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form, Button, Row, Col,Alert } from 'react-bootstrap';
import api from '../api';
const Profile = (props) => {

  const [dataField, setDataField] = useState();
  const [validated, setValidated] = useState(false);
  const [errors, setErrors] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (event) => {
    setDataField({ ...dataField, [event.target.name]: event.target.value });
    setValidated(true);
  };


  const handleSubmit = (event) => {
    setSuccess(false);
    const form = event.currentTarget;

    if (form.checkValidity() === true) {
      api
        .post('/auth/update-profile', dataField, {
          headers: {
            Authorization: localStorage.getItem('auth_token'),
          },
        })
        .then((res) => {
          setSuccess(true);
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

        });
    }
    setValidated(true);
    event.preventDefault();

  };

  useEffect(() => {
    api
      .get('/auth?page=profile', {
        headers: {
          Authorization: localStorage.getItem('auth_token'),
        },
      })
      .then((res) => {
        setDataField(res.data?.data?.user);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Container  className=' p-5 mt-0 '>
      <h1 className='text-white text-center'>Profile</h1>
      <Row className='justify-content-md-center '>
        <Col
          md='6'
          className='shadow-sm rounded p-5 bg-white '
        >

          <Form
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
            className='w-75'
          >   {success && <Alert variant='success'>Profile updated!</Alert>}
             {errors && <Alert variant='danger'>{errors}</Alert>}
            <Form.Group >
              <Form.Label>First Name </Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter first name'
                name='first_name'
                onChange={handleChange}
                defaultValue={dataField && dataField.first_name}

              />
              <Form.Control.Feedback type='invalid'>
                Please enter a name.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group >
              <Form.Label>Last Name </Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter last name'
                name='first_name'
                onChange={handleChange}
                defaultValue={dataField && dataField.last_name}
                required
              />
              <Form.Control.Feedback type='invalid'>
                Please enter a name.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group >
              <Form.Label>Email </Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                name='email'
                onChange={handleChange}
                defaultValue={dataField && dataField.email}
                required
              />
              <Form.Control.Feedback type='invalid'>
                Please enter a email.
              </Form.Control.Feedback>
            </Form.Group>
            <Button variant='danger' type='submit'>
              Save
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
