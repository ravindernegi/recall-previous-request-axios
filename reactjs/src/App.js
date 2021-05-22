import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Users from './pages/Users';
import Home from './pages/Home';
import Header from './components/Header';
import NotFound from './pages/404';

const App = (props) => {
  return (
    <>
      <Router>
        <Header />
        <Container>
          <Switch>
            <Route exact path='/'>
              <Home />
            </Route>
            <Route exact path='/login'>
              <Login />
            </Route>
            <PrivateRoute exact path='/users'>
              <Users />
            </PrivateRoute>
            <PrivateRoute exact path='/profile'>
              <Profile />
            </PrivateRoute>
             <Route path="*">
              <NotFound/>
            </Route>
  }
          </Switch>
        </Container>
      </Router>
    </>
  );
};

export default App;
