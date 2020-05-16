import React from 'react';
import { ListGroup } from 'react-bootstrap'
export default class Completed extends React.Component {

    markAsPending = (todoId, status) => {
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
                    this.props.parentCallBack(todoId);
                })
            } else {
                console.log(res);
            }
        }).catch(error => {
            console.log(error);
        })
    }

    render() {
        const todo = this.props.completeData;
        console.log(todo);
        return(
            <div className="complete">
                <ListGroup>
                {   
                    (todo && todo.length) ? todo.map((item, index)=> {
                        return <ListGroup.Item key={item.todoId}>
                            {item.todoTitle}
                            <span className="icon">
                                <i className="fa fa-ban iconSpacer" aria-hidden="true" onClick={() => this.markAsPending(item.todoId, 'pending')}></i>
                                <i className="fa fa-times" aria-hidden="true" onClick={ ()=>this.deleteTodo(item.todoId)}></i>
                            </span>
                        </ListGroup.Item>
                    }) : <span>No Item found</span>
                }
                </ListGroup>
            </div>
        )
    }
}