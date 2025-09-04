import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Modal,ModalHeader,ModalBody, ModalFooter, Input, Label, Form, FormGroup,} from 'reactstrap';
class ModalUser extends Component {

constructor(props) {
    super(props);
    this.state = {
    }
}
    componentDidMount() {
    }

    toggle =() => {
        this.props.toggleFromParent();
    }

    render() {
        return (
        <Modal 
        isOpen={this.props.isOpen} 
        toggle={this.toggle} 
        className={'ClassNameModalUser'}
        size = "lg"
        >
            <ModalHeader toggle={this.toggle}>Create A New User </ModalHeader>
            <ModalBody>
                <div className='container'>
                    <div className='row'>
                        <div className='col-6 form-group'>
                            <label>Email</label>
                            <input 
                            type='text' 
                            className='form-control' p
                            placeholder='Email'/>
                        </div>
                            <div className='col-6 form-group'>
                            <label>Password</label>
                            <input 
                            type='text' 
                            className='form-control' p
                            placeholder='Password'/>
                        </div>
                        <div className='col-6 form-group mt-3'>
                            <label>First Name</label>
                            <input 
                            type='text' 
                            className='form-control'
                            placeholder='FirstName'/>
                        </div>
                        <div className='col-6 form-group mt-3'>
                            <label>Last Name</label>
                            <input 
                            type='text' 
                            className='form-control' p
                            placeholder='LastName'/>
                        </div>
                        <div className='col-12 form-group mt-3'>
                            <label>Address</label>
                            <input 
                            type='text' 
                            className='form-control' p
                            placeholder='Address'/>
                        </div>
                    </div>
                </div>
            </ModalBody>
            <ModalFooter>
                <button className='btn btn-primary px-3 }'onClick={this.toggle}>Save changes</button>
                <button className='btn btn-secondary px-3' onClick={this.toggle}>Close</button>
            </ModalFooter>
        </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);


