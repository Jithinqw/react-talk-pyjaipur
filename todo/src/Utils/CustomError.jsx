import React from 'react';
import { Modal } from 'react-bootstrap';

export default class CustomError extends React.Component {

    render() {
        return(
            <Modal show={this.props.show}>
                <Modal.Header>
                    <Modal.Title>Some error occured</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="content">
                        {this.props.error}
                    </div>
                </Modal.Body>
            </Modal>
        )
    }
}