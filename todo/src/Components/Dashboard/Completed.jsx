import React from 'react';

export default class Completed extends React.Component {

    render() {
        const todo = this.props.completeData;
        console.log(todo);
        return(
            <div className="complete">
                {   
                    (todo && todo.length) ? todo.map((item, index)=> {
                        return <span key={item.todoId}>{item.todoTitle}</span>
                    }) : <span>No Item found</span>
                }
            </div>
        )
    }
}