
import React, { Component } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';

class Loginpage extends Component {

    render(props) {
        return (
            <Row id="login" className="justify-content-center align-items-center">
                <Col md={4} className="text-center">
                    <h1>Login</h1>
                    <div className="login-border"></div>
                    <p>
                        Welcome back! Login to access the secret world
              </p>
                    <Form onSubmit={this.props.handleSubmit}>
                        <Form.Group controlId="username">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="username" placeholder="Username" value={this.props.username} onChange={this.props.handleChange}/>
                        </Form.Group>
                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={this.props.password} onChange={this.props.handleChange}/>
                        </Form.Group>
                        <Form.Group>
                            <Button variant="primary" type="submit">
                                Continue
                            </Button>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        );
    }
}
export default Loginpage;
