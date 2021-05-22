import { useEffect, useState } from 'react';
import { NavLink ,useHistory,Link} from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import api from '../api';
const Header = () => {
  const history = useHistory();
  const [data, setData] = useState();

  useEffect(() => {
    if(localStorage.getItem('auth_token')){
    api
      .get('/auth',{headers: {
        'Authorization': localStorage.getItem('auth_token')
    }})
      .then((res) => {
          setData(res.data?.data);


      })
      .catch((error) => {
        if(error.response?.data?.errors?.error?.name==='TokenExpiredError'){
          api.get('/auth/refresh-token',{headers: {
            'Authorization': 'bearer '+localStorage.getItem('auth_token')
          }})
          .then((res1) => {
              setData(res1.data?.data);

          })
          .catch((error) => {
            console.log(error);
          });
        }
        console.log(error);
      });
    }
  }, []);

  
  const logout =()=>{
    localStorage.removeItem('auth_token');
    localStorage.removeItem('refresh_token');
    history.push("/login");
  }
  return (
    <Navbar bg='light' expand='lg' className="shadow-sm">
      <Container>

        <Navbar.Brand ><Link to="/" className="text-white" style={{'textDecoration':'none'}}>React API Series</Link></Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav' style={{flexGrow:0}}>
          <Nav className='mr-auto'></Nav>
          <Nav className='mr-auto d-flex'>
            <NavLink to='/' className="nav-link">Home</NavLink>

            {!localStorage.getItem('auth_token') ? (<NavLink to='/login' className="nav-link">Login</NavLink>):(

            <NavDropdown style={{textTransform:'capitalize'}} title={data && data.user && data.user.first_name && (data.user.first_name)} data-toggle="dropdown" id='basic-nav-dropdown' >
            <NavLink to='/profile' className="dropdown-item" onClick={() =>  document.body.click() }>Profile</NavLink>
            <NavLink to='/users' className="dropdown-item" onClick={() =>  document.body.click() }>Manage Users</NavLink>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={()=>logout()}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>)}
          </Nav>
        </Navbar.Collapse>

      </Container>
    </Navbar>
  );
};
export default Header;
