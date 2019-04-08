import React, { Component } from 'react';
import Dashboard from './features/dashboard';
import './App.css';
import { Navbar, NavDropdown, Nav, Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';

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
            <Navbar.Brand href="/">Continents</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="#pricing" />
              </Nav>
              <Nav />
            </Navbar.Collapse>
          </Navbar>

          <Container>
            <Route path="/" exact component={Dashboard} />
          </Container>
        </div>
      </Router>
    );
  }
}

export default App;
