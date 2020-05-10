import React from 'react';
import Header from '../Header/Header';

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
                Hey from dashboard
            </div>
        )
    }
}