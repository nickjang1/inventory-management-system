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
import { STORE_STATUSES } from '../../config/data';

class AddStore extends React.Component {
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
      // code: values.code,
      // name: values.name,
      // store_type: values.store_type,
      // contact_number: values.contact_number,
      // contact_person: values.contact_person
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
          <div className="model-title">Add Store</div>
        </ModalHeader>
        <ModalBody>
          <Formik
            ref={this.formikRef}
            initialValues={{
              code: '',
              description: '',
              store_status: null,
              contact_number: '',
              contact_person: '',
              email: ''
            }}
            validationSchema={
              Yup.object().shape({
                code: Yup.string().required('This field is required!'),
                description: Yup.string().required('This field is required!'),
                store_status: Yup.mixed().required('This field is required!'),
                contact_number: Yup.string().required('This field is required!'),
                contact_person: Yup.string().required('This field is required!'),
                email: Yup.string().required('This field is required!')
              })
            }
            onSubmit={this.handleSubmit.bind(this)}
            render={({
              values,
              errors,
              status,
              touched,
              setFieldValue,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting
            }) => (
              <Form onSubmit={handleSubmit}>
                {status && <UncontrolledAlert {...status} />}
                <Row>
                  <Col sm="6">
                    <FormGroup>
                      <Label for="code">
                        Store Code
                      </Label>
                      <Input
                        name="code"
                        type="text"
                        // disabled
                        value={values.code}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        invalid={!!errors.code && touched.code}
                      />
                    </FormGroup>
                  </Col>
                  <Col sm="6">
                    <FormGroup>
                      <Label>
                        Status
                      </Label>
                      <Select
                        name="store_status"
                        classNamePrefix={!!errors.store_status && touched.store_status ? 'invalid react-select-lg' : 'react-select-lg'}
                        indicatorSeparator={null}
                        options={STORE_STATUSES}
                        getOptionValue={option => option.value}
                        getOptionLabel={option => option.label}
                        value={values.status}
                        onChange={(value) => {
                          setFieldValue('store_status', value);
                        }}
                        onBlur={handleBlur}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col sm="12">
                    <FormGroup>
                      <Label for="description">
                        Description
                      </Label>
                      <Input
                        name="description"
                        type="text"
                        // disabled
                        value={values.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        invalid={!!errors.description && touched.description}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col sm="12">
                    <FormGroup>
                      <Label for="contact_person">
                        Contact Person
                      </Label>
                      <Input
                        name="contact_person"
                        type="text"
                        value={values.contact_person}
                        onChange={handleChange}
                        invalid={!!errors.contact_person && touched.contact_person}
                        onBlur={handleBlur}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col sm="12">
                    <FormGroup>
                      <Label for="contact_number">
                        Contact Number
                      </Label>
                      <Input
                        name="contact_number"
                        type="text"
                        value={values.contact_number}
                        onChange={handleChange}
                        invalid={!!errors.contact_number && touched.contact_number}
                        onBlur={handleBlur}
                      />

                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col sm="12">
                    <FormGroup>
                      <Label for="email">
                        E-mail Address
                      </Label>
                      <Input
                        name="email"
                        type="email"
                        value={values.email}
                        onChange={handleChange}
                        invalid={!!errors.email && touched.email}
                        onBlur={handleBlur}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col sm="12">
                    <div className="w-100 d-flex justify-content-end mt-2">
                      <div>
                        <Button
                          disabled={isSubmitting}
                          type="submit"
                          color="secondary"
                          style={{ marginRight: '20px' }}
                        >
                          Save
                        </Button>
                        <Button
                          type="button"
                          color="secondary"
                          onClick={this.handleCancel.bind(this)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Form>
            )}
          />
        </ModalBody>
      </Modal>
    );
  }
}

AddStore.defaultProps = {
  onSave: () => {}
};

export default AddStore;
