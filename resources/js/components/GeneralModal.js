import React from 'react';

import {
  Modal, ModalBody,
  Button
} from 'reactstrap';

class GeneralModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: true
    };
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleCancel() {
    let {
      handleCancel
    } = this.props;

    handleCancel = handleCancel || (() => {});
    handleCancel();
  }

  render() {
    const { isOpen } = this.state;
    const {
      status, content, action
    } = this.props;
    return (
      <Modal
        isOpen={isOpen}
        toggle={this.handleCancel}
        onClosed={this.handleCancel}
        className="modal-general-item"
      >
        <ModalBody>
          <h5><b>{status}</b></h5>
          <p>{content}</p>
          <div className="d-flex justify-content-between align-items-center">
            <div>{action}</div>
            <Button
              type="button"
              color="secondary"
              onClick={this.handleCancel}
            >
              OK
            </Button>
          </div>
        </ModalBody>
      </Modal>
    );
  }
}

GeneralModal.defaultProps = {
  status: '',
  content: '',
  action: ''
};

export default GeneralModal;
