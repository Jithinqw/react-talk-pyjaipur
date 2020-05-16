import React from 'react';
import { ListGroup } from 'react-bootstrap';

export default class Pending extends React.Component {
    
    markAsComplete = (todoId, status) =>{
        fetch('http://localhost:4000/api/todo/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': window.localStorage.getItem('token')
            },
            body: JSON.stringify({
                todoId: todoId,
                status: status
            })
        }).then(res=> {
            if(res.status === 201) {
                res.json().then(res=> {
                    this.props.parentCallBack(todoId);
                })
            } else {
                console.log(res);
            }
        }).catch(error=> {
            console.log(error);
        })
        console.log("sdfd");
    }
    
    deleteTodo = (todoId) =>{
        fetch(`http://localhost:4000/api/todo/delete/${todoId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': window.localStorage.getItem('token')
            }
        }).then(res=> {
            if(res.status === 200) {
                res.json().then(res=> {
                    console.log(res)
                })
            } else {
                console.log(res);
            }
        }).catch(error => {
            console.log(error);
        })
    }

    render() {
        const todo = this.props.pendingData;
        console.log(todo);
        return(
            <div className="pending">
                <ListGroup>
                {
                    (todo && todo.length) ? 
                    todo.map((item, index)=> {
                        return <ListGroup.Item key={item.todoId}>
                            {item.todoTitle}
                            <span className="icon">
                                <i className="fa fa-check iconSpacer" aria-hidden="true" onClick={() => this.markAsComplete(item.todoId, 'completed')}></i>
                                <i className="fa fa-times" aria-hidden="true" onClick={() => this.deleteTodo(item.todoId)}></i>
                            </span>
                        </ListGroup.Item>
                    }) : <span> No item found</span>
                }
                </ListGroup>
            </div>
        )
    }
}