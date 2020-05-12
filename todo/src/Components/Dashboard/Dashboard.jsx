import React from 'react';
import Header from '../Header/Header';
import './Dashboard.css';
import { Container, Row, Col, Tab, Tabs, InputGroup, FormControl, Button } from 'react-bootstrap';

export default class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    componentDidMount () {
        document.title = 'TodoApp - Dashboard';
    }
    
    render() {
        return(
            <div>
                <Header />
                <Container>
                    <Row className="rowspacer">
                        <Col>
                        <InputGroup>
                                <FormControl placeholder="Add new todo" aria-label="Username" aria-describedby="basic-addon1"/>
                                <Button variant="outline-primary" className="spacer">Add Todo</Button>
                        </InputGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={8}>
                            <Tabs defaultActiveKey="All" id="main-tab">
                                <Tab eventKey="All" title="All">
                                    <p>sdfsdf</p>
                                </Tab>
                                <Tab eventKey="Active" title="Active">
                                    <p>asdds</p>
                                </Tab>
                                <Tab eventKey="Pending" title="Pending">
                                    <p>asdasd</p>
                                </Tab>
                            </Tabs>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}