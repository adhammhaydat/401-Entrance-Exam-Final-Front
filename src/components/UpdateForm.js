import React, { Component } from 'react';
import { Modal, Form, Button } from 'react-bootstrap'


class UpdateForm extends React.Component {
    render() {
        return (
            <div>
                <Modal show={this.props.show} onHide={this.props.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Color</Modal.Title>
                    </Modal.Header>

                    <Form onSubmit ={this.props.handleUpdate} >
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Color Name</Form.Label>
                            <Form.Control type="text" defaultValue = {this.props.selectedObj.title} name = 'title' />

                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Color Image</Form.Label>
                            <Form.Control type="text" defaultValue = {this.props.selectedObj.imageUrl} name ='imageUrl' />
                        </Form.Group>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.props.handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" type = 'submit'>
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Form>




                </Modal>
            </div>
        )
    }
}

export default UpdateForm
