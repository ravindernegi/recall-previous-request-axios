import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import api from '../api';

function Users() {
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    api
      .get('/users', {
        headers: {
          Authorization: localStorage.getItem('auth_token'),
        },
      })
      .then((res) => {
        setDataList(res.data?.data?.list);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Container className=' p-5 mt-0 '>
      <h1 className='text-white text-center'>Users</h1>
      {dataList.length===0 &&(<div className="py-5 text-center"><img src='/rings.svg' width="100" alt=""/></div>)}
      <Row className='justify-content-md-center '>
        {dataList && dataList.length>0 &&
          dataList.map((val, index) => {
            return (
              <Col md='4' className='p-3' key={index}>
                <Card
                  style={{ width: '18rem', border: 'none' }}
                  key={index}
                  className='shadow-sm'
                >
                  <Card.Img
                    variant='top'
                    src='data:image/png;base64,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'
                  />
                  <Card.Body>
                    <Card.Title style={{textTransform:'capitalize'}}>
                      {val.first_name} {val.last_name}
                    </Card.Title>
                    <Card.Text>
                      Role: {val.role}
                      <br />
                      Email: {val.email}
                    </Card.Text>
                    <Button variant='danger'>Go somewhere</Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
      </Row>
    </Container>
  );
}

export default Users;
