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

class EditStore extends React.Component {
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
          <div className="model-title">Edit Store</div>
        </ModalHeader>
        <ModalBody>

        </ModalBody>
      </Modal>
    );
  }
}

EditStore.defaultProps = {
  onSave: () => {}
};

export default EditStore;
