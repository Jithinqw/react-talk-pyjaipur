import React from 'react';
import Header from '../Header/Header';
import history from '../../history';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import './Register.css';

export default class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            formValid: false,
            error: '',
            errors: {
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                confirmPassword: ''
            }
        }
    }

    componentDidMount () {
        document.title = 'TodoApp - Register';
    }

    signUp = (e)=> {
        console.log(e.currentTarget.checkValidity())
        if(e.currentTarget.checkValidity() === true) {
            fetch('http://localhost:4000/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                password: this.state.password
            })
            }).then(res=>{
                if(res.status === 201) {
                    res.json().then(res=>{
                        history.push('/login');
                    })
                } else {
                    this.setState({error: res.statusText});
                }
            }).catch(error=> {
                this.setState({error: error});
            })
        } else {
            e.preventDefault();
            e.stopPropagation();
            this.setState({error: "Please fill all the required fields"});
            return null;
        }
    }

    change = (e)=> {
        const { name, value } = e.target;
        let errors = this.state.errors;
        switch(name) {
            case 'firstName':
                errors.firstName = value.length < 3 ? 'First name should be atleast of length 3' : '';
                break;
            case 'lastName':
                errors.lastName = value.length < 3 ? 'Last name should be atleast of length 3' : '';
                break;
            case 'email':
                errors.email = value.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/) ? '' : 'Invalid Email Address';
                break;
            case 'password':
                errors.password = value.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/) ? '' : 'Password should be atleast 7 characters with alphanumeric characters';
                break;
            case 'confirmPassword':
                errors.confirmPassword = (this.state.password === value) ? '' : 'Confirm Password should be equal to password';
                break;
            default:
                break;
        }
        this.setState({errors, [name]: value}, ()=> {
            return null;
        });
    }

    render() {
        return(
            <div>
                <Header />
                <Container>
                    <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Card>
                            <Card.Header>Please register to continue.</Card.Header>
                            <Card.Subtitle>
                                <Alert variant="light">{this.state.error}</Alert>
                            </Card.Subtitle>
                            <Card.Body>
                                <Form>
                                    <Form.Group controlId="firstName">
                                        <Form.Label>First Name</Form.Label>
                                        <Form.Control 
                                            type="text" name="firstName"
                                            placeholder="Enter your First Name" 
                                            onChange={this.change} required>
                                        </Form.Control>
                                        <span className="error-str">{this.state.errors.firstName}</span>
                                    </Form.Group>
                                    <Form.Group controlId="lastName">
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control type="text" required placeholder="Enter your Last Name" name="lastName" onChange={this.change}></Form.Control>
                                        <span className="error-str">{this.state.errors.lastName}</span>
                                    </Form.Group>
                                    <Form.Group controlId="email">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="email" required placeholder="Enter your Email" name="email" onChange={this.change}></Form.Control>
                                        <span className="error-str">{this.state.errors.email}</span>
                                    </Form.Group>
                                    <Form.Group controlId="password">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" required placeholder="Enter your Password" name="password" onChange={this.change}></Form.Control>
                                        <span className="error-str">{this.state.errors.password}</span>
                                    </Form.Group>
                                    <Form.Group controlId="confirmPassword">
                                        <Form.Label>Confirm Password</Form.Label>
                                        <Form.Control type="password" required placeholder="Re-enter your Password" name="confirmPassword" onChange={this.change}></Form.Control>
                                        <span className="error-str">{this.state.errors.confirmPassword}</span>
                                    </Form.Group>
                                    <Button variant="primary" type="button" onClick={this.signUp}>Sign Up</Button>
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