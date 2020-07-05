import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import history from '../../history';
import { removeToken } from '../../Utils/tokenUtil';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
        }
    }

    componentDidMount () {
        if(history.location.pathname === "/dashboard") {
            this.setState({loggedIn: true});
        }
    }
    
    logout = () => {
        removeToken('token');
        history.push('/login');
    }

    renderRegister() {
        if(history.location.pathname === "/register") {
            return <Nav.Link href="/login" className="loginBtn">Login</Nav.Link>
        } else {
            return null;
        }
    }

    renderLogin() {
        if(history.location.pathname === "/login") {
            return <Nav.Link href="/register" className="registerBtn">Register</Nav.Link>
        } else {
            return null;
        }
    }

    render() {
        return(
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/dashboard">The Todo App</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"></Navbar.Toggle>
                <Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse>
                <Nav>
                    {
                        this.renderRegister()
                    }
                    {
                        this.renderLogin()
                    }
                    {
                        this.state.loggedIn ? <Nav.Link href="#" onClick={()=>this.logout()}>Logout</Nav.Link> : null
                    }
                </Nav>
            </Navbar>
        )
    }
}