import React from 'react';
import Header from '../Header/Header';
import history from '../../history';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import './Login.css';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            formValid: false,
            error: '',
            errors: {
                email: '',
                password: '',
            }
        }
    }

    componentDidMount () {
        document.title = 'TodoApp - Login';
    }

    change = (e)=> {
        const { name, value } = e.target;
        let errors = this.state.errors;
        switch(name) {
            case 'email':
                errors.email = value.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/) ? '' : 'Invalid Email Address';
                break;
            case 'password':
                errors.password = value.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/) ? '' : 'Password should be atleast 7 characters with alphanumeric characters';
                break;
            default:
                break;
        }
        this.setState({errors, [name]: value}, ()=> {
            return null;
        });

    }

    signIn = (e) => {
        if(e.currentTarget.checkValidity() === true) {
            fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: this.state.email,
                    password: this.state.password
                })
            }).then(res=> {
                if(res.status === 200) {
                    res.json().then(res=> {
                        history.push('/dashboard');
                    })
                } else {
                    this.setState({error: res.statusText});
                }
            }).catch(error=> {
                this.setState({error: error});
            })
        } else {
            this.setState({error: 'Please fill in all the required fields'});
            return null;
        }
    }
    render() {
        return (
            <div>
                <Header />
                <Container>
                    <Row>
                        <Col md={{span: 6, offset: 3}}>
                            <Card>
                                <Card.Header>
                                    Please Login to continue.
                                </Card.Header>
                                <Card.Subtitle>
                                    <Alert variant="light">
                                        {this.state.error}
                                    </Alert>
                                </Card.Subtitle>
                                <Card.Body>
                                    <Form>
                                        <Form.Group controlId="email">
                                            <Form.Control
                                                type="email" name="email"
                                                placeholder="Enter your email"
                                                onChange={this.change} required
                                            ></Form.Control>
                                            <span className="error-str">{this.state.errors.email}</span>
                                        </Form.Group>

                                        <Form.Group controlId="password">
                                            <Form.Control
                                                type="password" name="password"
                                                placeholder="Enter your password"
                                                onChange={this.change} required
                                            ></Form.Control>
                                            <span className="error-str">{this.state.errors.password}</span>
                                        </Form.Group>
                                        <Button type="button" onClick={this.signIn}>Sign In</Button>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}