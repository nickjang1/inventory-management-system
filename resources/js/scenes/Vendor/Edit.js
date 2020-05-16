import React from 'react';
import moment from 'moment';
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
import { STATUSES, VAT_STATUSES } from '../../config/data';

class EditVendor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: true,
      users: JSON.parse(localStorage.getItem('users'))
    };
    this.formikRef = React.createRef();
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentDidMount() {
    this.componentWillReceiveProps(this.props);
  }

  componentWillReceiveProps(props) {
    const { users } = this.state;
    const {
      formikRef
    } = this;
    const { vendor } = props;
    const values = {
      ...vendor
    };

    formikRef.current.setValues({
      id: values.id,
      company_code: values.company_code,
      name: values.name,
      status: STATUSES.find(s => s.value === values.status),
      vat_status: VAT_STATUSES.find(v => v.value === values.vat_status),
      contact_number: values.contact_number_1 || values.contact_number_2,
      contact_person: users.find(user => user.id === values.contact_person_id),
      address: values.address,
      email: values.email_1 || values.email_2,
      created_by: values.created_by,
      modified_by: values.modified_by
    });
  }

  settingValues() {

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
      company_code: values.company_code,
      name: values.name,
      status: values.status.value,
      vat_status: values.vat_status.value,
      contact_number_1: values.contact_number,
      contact_person_id: values.contact_person.id,
      email_1: values.email,
      address: values.address,
      created_by: values.created_by,
      modified_by: values.modified_by
    };
    const { handleSave } = this.props;
    handleSave(newData);
  }

  render() {
    const { isOpen, users } = this.state;
    return (
      <Modal
        isOpen={isOpen}
        toggle={this.handleCancel}
        onClosed={this.handleCancel}
        className="modal-edit-item"
      >
        <ModalHeader toggle={this.handleCancel} style={{ borderBottom: 'none' }}>
          <div className="model-title">Edit Vendor</div>
        </ModalHeader>
        <ModalBody>
          <Formik
            ref={this.formikRef}
            initialValues={{
              company_code: '',
              name: '',
              status: null,
              vat_status: null,
              contact_number: '',
              contact_person: '',
              address: '',
              email: ''
            }}
            validationSchema={
              Yup.object().shape({
                company_code: Yup.string().required('This field is required!'),
                name: Yup.string().required('This field is required!'),
                status: Yup.mixed().required('This field is required!'),
                vat_status: Yup.mixed().required('This field is required!'),
                contact_number: Yup.string().required('This field is required!'),
                contact_person: Yup.string().required('This field is required!'),
                address: Yup.string().required('Required'),
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
                  <Col sm="4">
                    <FormGroup>
                      <Label for="company_code">
                        Vendor Code
                      </Label>
                      <Input
                        name="company_code"
                        type="text"
                        disabled
                        value={values.company_code}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        invalid={!!errors.company_code && touched.company_code}
                      />
                    </FormGroup>
                  </Col>
                  <Col sm="4">
                    <FormGroup>
                      <Label>
                        Status
                      </Label>
                      <Select
                        name="status"
                        classNamePrefix={!!errors.status && touched.status ? 'invalid react-select-lg' : 'react-select-lg'}
                        indicatorSeparator={null}
                        options={STATUSES}
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
                  <Col sm="4">
                    <FormGroup>
                      <Label for="vat">
                        Vat Status
                      </Label>
                      <Select
                        name="vat_status"
                        classNamePrefix={!!errors.vat_status && touched.vat_status ? 'invalid react-select-lg' : 'react-select-lg'}
                        indicatorSeparator={null}
                        options={VAT_STATUSES}
                        getOptionValue={option => option.value}
                        getOptionLabel={option => option.label}
                        value={values.vat_status}
                        onChange={(value) => {
                          setFieldValue('vat_status', value);
                        }}
                        onBlur={handleBlur}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col sm="6">
                    <FormGroup>

                      <Label for="name">
                        Vendor Name
                      </Label>
                      <Input
                        name="name"
                        type="text"
                        value={values.name}
                        onChange={handleChange}
                        invalid={!!errors.name && touched.name}
                        onBlur={handleBlur}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col sm="6">
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
                  <Col sm="6">
                    <FormGroup>
                      <Label for="contact_person">
                        Contact Person
                      </Label>
                      <Select
                        name="contact_person"
                        classNamePrefix={!!errors.contact_person && touched.contact_person ? 'invalid react-select-lg' : 'react-select-lg'}
                        indicatorSeparator={null}
                        options={users}
                        getOptionValue={option => option.id}
                        getOptionLabel={option => option.username}
                        value={values.contact_person}
                        onChange={(value) => {
                          setFieldValue('contact_person', value);
                        }}
                        onBlur={handleBlur}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col sm="6">
                    <FormGroup>
                      <Label for="address">
                        Address
                      </Label>
                      <Input
                        name="address"
                        type="text"
                        value={values.address}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        invalid={!!errors.address && touched.address}
                      />
                    </FormGroup>
                  </Col>
                  <Col sm="6">
                    <FormGroup>
                      <Label for="email">
                        E-mail
                      </Label>
                      <Input
                        name="email"
                        type="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        invalid={!!errors.email && touched.email}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col sm="11">
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

EditVendor.defaultProps = {
  handleSave: () => {}
};

export default EditVendor;
