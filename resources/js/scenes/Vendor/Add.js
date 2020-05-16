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
import { STATUSES, VAT_STATUSES } from '../../config/data';

class AddVendor extends React.Component {
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
      company_code: values.code,
      name: values.name,
      status: values.status.value,
      vat_status: values.vat.value,
      contact_number: values.contact_number,
      contact_person: values.contact_person.id
    };
    const { onSave } = this.props;
    onSave(newData);
  }

  render() {
    const { isOpen } = this.state;
    const users = JSON.parse(localStorage.getItem('users'));
    return (
      <Modal
        isOpen={isOpen}
        toggle={this.handleCancel}
        onClosed={this.handleCancel}
        className="modal-edit-item"
      >
        <ModalHeader toggle={this.handleCancel} style={{ borderBottom: 'none' }}>
          <div className="model-title">Add Vendor</div>
        </ModalHeader>
        <ModalBody>
          <Formik
            ref={this.formikRef}
            initialValues={{
              code: '',
              name: '',
              status: null,
              vat: null,
              contact_number: '',
              contact_person: ''
            }}
            validationSchema={
              Yup.object().shape({
                code: Yup.string().required('This field is required!'),
                name: Yup.string().required('This field is required!'),
                status: Yup.mixed().required('This field is required!'),
                vat: Yup.mixed().required('This field is required!'),
                contact_number: Yup.string().required('This field is required!'),
                contact_person: Yup.string().required('This field is required!')
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
                      <Label for="code">
                        Vendor Code
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
                        name="vat"
                        classNamePrefix={!!errors.status && touched.status ? 'invalid react-select-lg' : 'react-select-lg'}
                        indicatorSeparator={null}
                        options={VAT_STATUSES}
                        getOptionValue={option => option.value}
                        getOptionLabel={option => option.label}
                        value={values.vat}
                        onChange={(value) => {
                          setFieldValue('vat', value);
                        }}
                        onBlur={handleBlur}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col sm="10">
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
                  <Col sm="10">
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
                  <Col sm="10">
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

AddVendor.defaultProps = {
  onSave: () => {}
};

export default AddVendor;
