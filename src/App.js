import React, { Component } from 'react';
import logo from './logo.svg';
import {
  Login,
  Dashboard,
  Register,
  Explore,
  MovieDetail
} from './features/index';
import './App.css';
import { Navbar, NavDropdown, Nav, Container } from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Route,
  Link,
  withRouter
} from 'react-router-dom';
// import ReactSignupLoginComponent from 'react-signup-login-component';

let isAuthenticated = localStorage.getItem('loggedIn') ? true : false;

class App extends Component {
  render() {
    const { history } = this.props;
    return (
      <Router>
        <div>
          <Navbar
            collapseOnSelect
            expand="lg"
            bg="dark"
            variant="dark"
            sticky="top"
          >
            <Navbar.Brand href="/">IMDB</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                {isAuthenticated ? (
                  <Nav.Link href="/explore"> Explore </Nav.Link>
                ) : (
                  ''
                )}
                <Nav.Link href="#pricing" />
                {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">
                    Something
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/explore">Explore</NavDropdown.Item>
                </NavDropdown> */}
              </Nav>
              <Nav>
                <Nav.Link href="/register">Sign Up</Nav.Link>
                {isAuthenticated ? (
                  <Nav.Link
                    onClick={e => {
                      e.preventDefault();
                      localStorage.removeItem('loggedIn');
                      window.location.replace('/');
                    }}
                    eventKey={2}
                    href="#memes"
                  >
                    Logout
                  </Nav.Link>
                ) : (
                  <Nav.Link href="/login">Login</Nav.Link>
                )}
              </Nav>
            </Navbar.Collapse>
          </Navbar>

          <Container>
            <Route
              path="/"
              exact
              component={isAuthenticated ? Dashboard : Login}
            />
            <Route path="/login" component={Login} />
            <Route path="/details/:id" component={MovieDetail} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/register" component={Register} />
            <Route path="/explore" component={Explore} />
          </Container>
        </div>
      </Router>
    );
  }
}

export default App;
