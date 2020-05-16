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
// import { STATUSES } from '../../config/data';

class AddUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: true,
      roles: JSON.parse(localStorage.getItem('roles'))
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
      store_id: values.store.id,
      role_id: values.user_type.id,
      first_name: values.first_name,
      last_name: values.last_name,
      username: values.username,
      contact_number: values.contact_number,
      password: values.password,
      email: values.email
    };
    const { onSave } = this.props;
    onSave(newData);
  }

  render() {
    const { isOpen, roles } = this.state;
    const { stores } = this.props;
    return (
      <Modal
        isOpen={isOpen}
        toggle={this.handleCancel}
        onClosed={this.handleCancel}
        className="modal-edit-item"
      >
        <ModalHeader toggle={this.handleCancel} style={{ borderBottom: 'none' }}>
          <div className="model-title">Add User</div>
        </ModalHeader>
        <ModalBody>
          <Formik
            ref={this.formikRef}
            initialValues={{
              store: null,
              user_type: null,
              first_name: '',
              last_name: '',
              username: '',
              contact_number: '',
              password: '',
              email: ''
            }}
            validationSchema={
              Yup.object().shape({
                store: Yup.mixed().required('This field is required!'),
                user_type: Yup.mixed().required('This field is required!'),
                first_name: Yup.string().required('This field is required!'),
                last_name: Yup.string().required('This field is required!'),
                contact_number: Yup.string().required('This field is required!'),
                username: Yup.string().required('This field is required!'),
                email: Yup.string().email('Email is not valid!').required('Email is required!'),
                password: Yup.string().min(6, 'Password has to be longer than 6 characters!').required('Password is required!')
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
                        Store
                      </Label>
                      <Select
                        name="store"
                        classNamePrefix={!!errors.store && touched.store ? 'invalid react-select-lg' : 'react-select-lg'}
                        indicatorSeparator={null}
                        options={stores}
                        getOptionValue={option => option.id}
                        getOptionLabel={option => option.description}
                        value={values.store}
                        onChange={(value) => {
                          setFieldValue('store', value);
                        }}
                        onBlur={handleBlur}
                      />
                    </FormGroup>
                  </Col>
                  <Col sm="6">
                    <FormGroup>
                      <Label>
                        User Type
                      </Label>
                      <Select
                        name="user_type"
                        classNamePrefix={!!errors.user_type && touched.user_type ? 'invalid react-select-lg' : 'react-select-lg'}
                        indicatorSeparator={null}
                        options={roles}
                        getOptionValue={option => option.id}
                        getOptionLabel={option => option.description}
                        value={values.user_type}
                        onChange={(value) => {
                          setFieldValue('user_type', value);
                        }}
                        onBlur={handleBlur}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col sm="6">
                    <FormGroup>
                      <Label>
                        First Name
                      </Label>
                      <Input
                        name="first_name"
                        type="text"
                        value={values.first_name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        invalid={!!errors.first_name && touched.first_name}
                      />
                    </FormGroup>
                  </Col>
                  <Col sm="6">
                    <FormGroup>
                      <Label>
                        Last Name
                      </Label>
                      <Input
                        name="last_name"
                        type="text"
                        value={values.last_name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        invalid={!!errors.last_name && touched.last_name}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col sm="6">
                    <FormGroup>
                      <Label>
                        User Name
                      </Label>
                      <Input
                        name="username"
                        type="text"
                        value={values.username}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        invalid={!!errors.username && touched.username}
                      />
                    </FormGroup>
                  </Col>
                  <Col sm="6">
                    <FormGroup>
                      <Label>
                        Password
                      </Label>
                      <Input
                        name="password"
                        type="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        invalid={!!errors.password && touched.password}
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

AddUser.defaultProps = {
  onSave: () => {},
  stores: []
};

export default AddUser;
