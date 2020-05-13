import React from 'react';

export default class Pending extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        const todo = this.props.pendingData;
        console.log(todo)
        return(
            <div>Hey from Pending</div>
        )
    }
}