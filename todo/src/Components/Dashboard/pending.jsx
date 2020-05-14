import React from 'react';

export default class Pending extends React.Component {
 
    render() {
        const todo = this.props.pendingData;
        console.log(todo);
        return(
            <div className="pending">
                {
                    (todo && todo.length) ? 
                    todo.map((item, index)=> {
                        return <span key={item.todoId}>{item.todoTitle}</span>
                    }) : <span> No item found</span>
                }
            </div>
        )
    }
}