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

class EditStore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: true,
      store_types: JSON.parse(localStorage.getItem('store_types'))
    };
    this.formikRef = React.createRef();
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentDidMount() {
    this.componentWillReceiveProps(this.props);
  }

  componentWillReceiveProps(props) {
    const { store_types } = this.state;
    const {
      formikRef
    } = this;
    const { store } = props;
    const values = {
      ...store
    };

    formikRef.current.setValues({
      id: values.id,
      code: values.code,
      description: values.description,
      status: STORE_STATUSES.find(status => status.value === values.status),
      store_type: store_types.find(s => s.id === values.store_type_id),
      contact_number: values.contact_number,
      contact_person: values.contact_person,
      email: values.email,
      created_by: values.created_by,
      modified_by: values.modified_by
    });
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
      id: values.id,
      code: values.code,
      description: values.description,
      status: values.status.value,
      store_type_id: values.store_type.id,
      contact_number: values.contact_number,
      contact_person: values.contact_person,
      email: values.email,
      created_by: values.created_by,
      modified_by: values.modified_by
    };
    const { onSave } = this.props;
    onSave(newData);
  }

  render() {
    const { isOpen, store_types } = this.state;
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
          <Formik
            ref={this.formikRef}
            initialValues={{
              code: '',
              description: '',
              status: null,
              store_type: null,
              contact_number: '',
              contact_person: '',
              email: ''
            }}
            validationSchema={
              Yup.object().shape({
                code: Yup.string().required('This field is required!'),
                description: Yup.string().required('This field is required!'),
                status: Yup.mixed().required('This field is required!'),
                store_type: Yup.mixed().required('This field is required!'),
                contact_number: Yup.string().required('This field is required!'),
                contact_person: Yup.string().required('This field is required!'),
                email: Yup.string().email('Email is not valid!').required('Email is required!')
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
                        name="status"
                        classNamePrefix={!!errors.status && touched.status ? 'invalid react-select-lg' : 'react-select-lg'}
                        indicatorSeparator={null}
                        options={STORE_STATUSES}
                        getOptionValue={option => option.value}
                        getOptionLabel={option => option.label}
                        value={values.status}
                        onChange={(value) => {
                          setFieldValue('status', value);
                        }}
                        onBlur={handleBlur}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col sm="12">
                    <FormGroup>
                      <Label>
                        Store Type
                      </Label>
                      <Select
                        name="store_type"
                        classNamePrefix={!!errors.store_type && touched.store_type ? 'invalid react-select-lg' : 'react-select-lg'}
                        indicatorSeparator={null}
                        options={store_types}
                        getOptionValue={option => option.id}
                        getOptionLabel={option => option.name}
                        value={values.store_type}
                        onChange={(value) => {
                          setFieldValue('store_type', value);
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

EditStore.defaultProps = {
  onSave: () => {}
};

export default EditStore;
