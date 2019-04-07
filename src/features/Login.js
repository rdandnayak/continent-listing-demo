import React, { Component } from 'react';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { withRouter } from 'react-router';

class Login extends Component {
  state = { alert: '' };

  // onSubmit = () => {};
  render() {
    const { history } = this.props;
    return (
      <Row>
        <Col
          className="login-form"
          md={{ span: 4 }}
          style={{ float: 'none', margin: '0 auto', marginTop: '10%' }}
        >
          <Form
            onSubmit={e => {
              e.preventDefault();
              const email = e.target.elements.email.value;
              const password = e.target.elements.password.value;
              const users = JSON.parse(localStorage.getItem('users')) || {};
              let list = Object.keys(users);
              if (list.indexOf(email) == -1) {
                this.setState({ alert: 'User Does not exist' });
                return;
              } else if (users[email].password === password) {
                // if (e.target.elements.checkMeOut.value === 'on') {
                localStorage.setItem('loggedIn', true);
                localStorage.setItem(
                  'currentUser',
                  JSON.stringify(users[email])
                );
                // }
                window.location.replace('/dashboard');
              } else {
                this.setState({
                  alert: 'Password do not match with our database'
                });
              }
              return false;
            }}
          >
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                required={true}
                type="email"
                name="email"
                placeholder="Enter email"
              />
              {/* <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text> */}
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type="password"
                name="password"
                placeholder="Password"
              />
            </Form.Group>
            <Form.Group controlId="formBasicChecbox">
              <Form.Check
                type="checkbox"
                label="Keep me signed In"
                name="checkMeOut"
              />
            </Form.Group>
            <Button variant="primary" type="submit" value="submit">
              Submit
            </Button>
            <br />
            {!!this.state.alert ? (
              <Alert style={{ marginTop: 20 }} variant={'danger'}>
                {this.state.alert}
              </Alert>
            ) : (
              ''
            )}
          </Form>
        </Col>
      </Row>
    );
  }
}

export default withRouter(Login);
