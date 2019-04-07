import React, { Component } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { withRouter } from 'react-router';

class Register extends Component {
  state = {};

  // onSubmit = () => {};
  render() {
    const { history } = this.props;
    return (
      <Row>
        <Col
          className="login-form"
          md={{ span: 4 }}
          style={{ float: 'none', margin: '0 auto', marginTop: '2%' }}
        >
          <Form
            onSubmit={e => {
              e.preventDefault();
              let users = !!localStorage.getItem('users')
                ? JSON.parse(localStorage.getItem('users'))
                : {};
              users[e.target.elements.email.value] = {
                email: e.target.elements.email.value,
                name: e.target.elements.name.value,
                contact: e.target.elements.contact.value,
                password: e.target.elements.password.value
              };
              localStorage.setItem('users', JSON.stringify(users));
              history.push('/login');
              return false;
            }}
          >
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control
                required={true}
                type="text"
                name="name"
                placeholder="Enter Your name"
              />
              {/* <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text> */}
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
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

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Mobile</Form.Label>
              <Form.Control
                required={true}
                type="number"
                // pattern="\d*"
                // maxlength="4"
                oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                name="contact"
                placeholder="Enter Contact No"
              />
              {/* <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text> */}
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required={true}
                type="password"
                name="password"
                placeholder="Enter Password"
              />
              {/* <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text> */}
            </Form.Group>

            {/* <Form.Group controlId="formBasicPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control required type="password" placeholder="Password" />
            </Form.Group> */}
            <Button variant="primary" type="submit" value="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    );
  }
}

export default withRouter(Register);
