import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import {
  Row, Col,
  Modal, ModalBody, ModalHeader,
  Button,
  Form, FormGroup,
  Input, Label,
  UncontrolledAlert
} from 'reactstrap';
import Select from 'react-select';
import { STATUSES } from '../../config/data';

class EditUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: true
    };
    this.formikRef = React.createRef();
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleCancel() {
    let {
      handleCancel
    } = this.props;

    handleCancel = handleCancel || (() => {});
    handleCancel();
  }

  handleSubmit(values) {
    let newData = {};
    newData = {
    };
    const { onSave } = this.props;
    onSave(newData);
  }

  render() {
    const { isOpen } = this.state;
    return (
      <Modal
        isOpen={isOpen}
        toggle={this.handleCancel}
        onClosed={this.handleCancel}
        className="modal-edit-item"
      >
        <ModalHeader toggle={this.handleCancel} style={{ borderBottom: 'none' }}>
          <div className="model-title">Edit User</div>
        </ModalHeader>
        <ModalBody>

        </ModalBody>
      </Modal>
    );
  }
}

EditUser.defaultProps = {
  onSave: () => {}
};

export default EditUser;
