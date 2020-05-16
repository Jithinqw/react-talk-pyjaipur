import React from 'react';
import Header from '../Header/Header';
import './Dashboard.css';
import CustomError from '../../Utils/CustomError';
import { Container, Row, Col, Tab, Tabs, InputGroup, FormControl, Button, ListGroup } from 'react-bootstrap';
import Pending from './pending';
import Completed from './Completed';

export default class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            todoData: [],
            newTodo: '',
            todo: '',
            error: '',
            showModal: false
        }
    }

    componentDidMount () {
        document.title = 'TodoApp - Dashboard';
        this.getAllTodo();
    }
    
    getAllTodo = () => {
        fetch('http://localhost:4000/api/todo/all', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': window.localStorage.getItem('token')
            }
        }).then(res=> {
            if(res.status === 200) {
                res.json().then(res=>{
                    this.setState({todoData: res});
                })
            } if(res.status === 204) {
                this.setState({error: 'No todo found'});
            } else {
                this.setState({
                    error: res.statusText,
                    showModal: true
                });
            }
        }).catch(err=>{
            this.setState({
                error: err,
                showModal: true
            });
        })
    }

    setTodo = (e) => {
        const { value } = e.target;
        this.setState({todo: value});
        return null;
    }
    
    createNewTodo = () => {
        fetch('http://localhost:4000/api/todo/create', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
                'x-api-key': window.localStorage.getItem('token')
            },
            body: JSON.stringify({
                todoTitle: this.state.todo
            })
        }).then(res=>{
            if(res.status === 201) {
                res.json().then(res=>{
                    this.getAllTodo();
                })
            }
        }).catch(error=> {
            this.setState({
                error: error,
                showModal: true
            });
        })
    }

    childDataFun = (childData) =>{
        this.getAllTodo();
    }

    render() {
        return(
            <div>
                <Header />
                <Container>
                    <>
                        <CustomError show={this.state.showModal} error={this.state.error}/>
                    </>
                    <Row className="rowspacer">
                        <Col>
                        <InputGroup>
                                <FormControl placeholder="Add new todo" aria-label="Username" aria-describedby="basic-addon1" onChange={this.setTodo}/>
                                <Button variant="outline-primary" className="spacer" onClick={() => this.createNewTodo()}>Add Todo</Button>
                        </InputGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={8}>
                            <Tabs defaultActiveKey="All" id="main-tab">
                                <Tab eventKey="All" title="All">
                                    <ListGroup>
                                    {
                                        (this.state.todoData && this.state.todoData.length) ? this.state.todoData.map((item, index)=> {
                                            return <ListGroup.Item key={item.todoId}>
                                                        {item.todoTitle}
                                                </ListGroup.Item>
                                        }) : <span>No item found</span>
                                    }
                                    </ListGroup>
                                </Tab>
                                <Tab eventKey="Pending" title="Pending">
                                    <Pending pendingData={
                                            this.state.todoData.filter((data)=>{
                                                return data.status === 'pending';
                                            })
                                        }
                                        parentCallBack = {this.childDataFun}
                                    />
                                </Tab>
                                <Tab eventKey="Completed" title="Completed">
                                    <Completed completeData = {
                                            this.state.todoData.filter((item)=>{
                                                return item.status === 'completed';
                                            })
                                        }
                                        parentCallBack = {this.childDataFun}
                                    />
                                </Tab>
                            </Tabs>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}