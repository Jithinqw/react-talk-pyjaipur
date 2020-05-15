import React from 'react';
import { ListGroup } from 'react-bootstrap'
export default class Completed extends React.Component {

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
                                <i className="fa fa-check iconSpacer" aria-hidden="true"></i>
                                <i className="fa fa-times" aria-hidden="true"></i>
                            </span>
                        </ListGroup.Item>
                    }) : <span>No Item found</span>
                }
                </ListGroup>
            </div>
        )
    }
}