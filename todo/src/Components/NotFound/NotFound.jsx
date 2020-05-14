import React from 'react';
import { Alert, Button, Container, Row, Col } from 'react-bootstrap';
import history from '../../history';
import Header from '../Header/Header';

export default class NotFound extends React.Component {

    componentDidMount () {
        document.title = 'TodoApp - 404 NotFound';
    }

    redirectToFrontPage = () =>{
        history.push('/dashboard');
    }

    render() {
        return(
            <div>
                <Header />
                <Container>
                    <Row>
                        <Col xs={6}>
                        <Alert variant={"warning"}>
                            Page you are looking for is not found.
                            Press here to go Home
                            <Button variant="primary" onClick={() => this.redirectToFrontPage()}>
                                Go Home
                            </Button>
                        </Alert>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}