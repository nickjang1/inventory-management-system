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

class AddItem extends React.Component {
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
      code: values.code,
      active: values.status.value,
      inventory_type: values.inventory_type.id,
      description: values.description,
      brand: values.brand,
      vendor1: values.vendor1 ? values.vendor1.id : '',
      unit1_cost_vat_inc: values.unit1_cost_vat_inc,
      unit1_cost_vat_ex: values.unit1_cost_vat_ex,
      vendor2: values.vendor2 ? values.vendor2.id : '',
      unit2_cost_vat_inc: values.unit2_cost_vat_inc,
      unit2_cost_vat_ex: values.unit2_cost_vat_ex,
      vendor3: values.vendor3 ? values.vendor3.id : '',
      unit3_cost_vat_inc: values.unit3_cost_vat_inc,
      unit3_cost_vat_ex: values.unit3_cost_vat_ex
    };
    const { onSave } = this.props;
    onSave(newData);
  }

  render() {
    const { isOpen } = this.state;
    const inventory_types = JSON.parse(localStorage.getItem('inventory_types'));
    const vendors = JSON.parse(localStorage.getItem('vendors'));
    return (
      <Modal
        isOpen={isOpen}
        toggle={this.handleCancel}
        onClosed={this.handleCancel}
        className="modal-edit-item"
      >
        <ModalHeader toggle={this.handleCancel} style={{ borderBottom: 'none' }}>
          <div className="model-title">Add Item</div>
        </ModalHeader>
        <ModalBody>
          <Formik
            ref={this.formikRef}
            initialValues={{
              code: '',
              status: null,
              inventory_type: null,
              description: null,
              brand: '',
              vendor1: null,
              unit1_cost_vat_inc: '',
              unit1_cost_vat_ex: '',
              vendor2: null,
              unit2_cost_vat_inc: '',
              unit2_cost_vat_ex: '',
              vendor3: null,
              unit3_cost_vat_inc: '',
              unit3_cost_vat_ex: ''
            }}
            validationSchema={
              Yup.object().shape({
                code: Yup.string().required('This field is required!'),
                status: Yup.mixed().required('This field is required!'),
                inventory_type: Yup.mixed().required('This field is required!'),
                brand: Yup.string().required('This field is required!'),
                description: Yup.string().required('This field is required!')
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
                <Row>
                  <Col sm="6">
                    <Row>
                      <Col xs="6">
                        <FormGroup>
                          <Label for="code">Item Code</Label>
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
                      <Col xs="6">
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
                    </Row>
                  </Col>
                </Row>
                <Row>
                  <Col sm="6">
                    <FormGroup>
                      <Label for="inventory_type">
                        Inventory Type
                      </Label>
                      <Select
                        name="inventory_type"
                        classNamePrefix={!!errors.inventory_type && touched.inventory_type ? 'invalid react-select-lg' : 'react-select-lg'}
                        indicatorSeparator={null}
                        options={inventory_types}
                        getOptionValue={option => option.id}
                        getOptionLabel={option => option.name}
                        value={values.inventory_type}
                        onChange={(value) => {
                          setFieldValue('inventory_type', value);
                        }}
                        onBlur={handleBlur}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col sm="6">
                    <FormGroup>
                      <Label for="description">Description</Label>
                      <Input
                        name="description"
                        type="textarea"
                        value={values.description || ''}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        invalid={!!errors.description && touched.description}
                      />
                    </FormGroup>
                  </Col>
                  <Col sm="4">
                    <FormGroup>
                      <Label for="brand">Brand</Label>
                      <Input
                        name="brand"
                        type="text"
                        value={values.brand}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        invalid={!!errors.brand && touched.brand}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col sm="6">
                    <FormGroup>
                      <Label for="vendor1">Vendor 1</Label>
                      <Select
                        name="vendor1"
                        classNamePrefix="react-select-lg"
                        indicatorSeparator={null}
                        options={vendors}
                        getOptionValue={option => option.id}
                        getOptionLabel={option => option.name}
                        value={values.vendor1}
                        onChange={(value) => {
                          setFieldValue('vendor1', value);
                        }}
                        onBlur={handleBlur}
                      />
                    </FormGroup>
                  </Col>
                  <Col sm="3">
                    <FormGroup>
                      <Label for="unit1_cost_vat_inc">Unit Cost (VAT-Inc)</Label>
                      <Input
                        name="unit1_cost_vat_inc"
                        type="text"
                        value={values.unit1_cost_vat_inc}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </FormGroup>
                  </Col>
                  <Col sm="3">
                    <FormGroup>
                      <Label for="unit1_cost_vat_ex">Unit Cost (VAT-ex)</Label>
                      <Input
                        name="unit1_cost_vat_ex"
                        type="text"
                        disabled
                        value={values.unit1_cost_vat_ex}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col sm="6">
                    <FormGroup>
                      <Label for="vendor2">Vendor 2</Label>
                      <Select
                        name="vendor2"
                        classNamePrefix="react-select-lg"
                        indicatorSeparator={null}
                        options={vendors}
                        getOptionValue={option => option.id}
                        getOptionLabel={option => option.name}
                        value={values.vendor2}
                        onChange={(value) => {
                          setFieldValue('vendor2', value);
                        }}
                        onBlur={handleBlur}
                      />
                    </FormGroup>
                  </Col>
                  <Col sm="3">
                    <FormGroup>
                      <Label for="unit2_cost_vat_inc">Unit Cost (VAT-Inc)</Label>
                      <Input
                        name="unit2_cost_vat_inc"
                        type="text"
                        value={values.unit2_cost_vat_inc}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </FormGroup>
                  </Col>
                  <Col sm="3">
                    <FormGroup>
                      <Label for="unit2_cost_vat_ex">Unit Cost (VAT-ex)</Label>
                      <Input
                        name="unit2_cost_vat_ex"
                        type="text"
                        disabled
                        value={values.unit2_cost_vat_ex}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col sm="6">
                    <FormGroup>
                      <Label for="vendor3">Vendor 3</Label>
                      <Select
                        name="vendor3"
                        classNamePrefix="react-select-lg"
                        indicatorSeparator={null}
                        options={vendors}
                        getOptionValue={option => option.id}
                        getOptionLabel={option => option.name}
                        value={values.vendor3}
                        onChange={(value) => {
                          setFieldValue('vendor3', value);
                        }}
                        onBlur={handleBlur}
                      />
                    </FormGroup>
                  </Col>
                  <Col sm="3">
                    <FormGroup>
                      <Label for="unit3_cost_vat_inc">Unit Cost (VAT-Inc)</Label>
                      <Input
                        name="unit3_cost_vat_inc"
                        type="text"
                        value={values.unit3_cost_vat_inc}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </FormGroup>
                  </Col>
                  <Col sm="3">
                    <FormGroup>
                      <Label for="unit3_cost_vat_ex">Unit Cost (VAT-ex)</Label>
                      <Input
                        name="unit3_cost_vat_ex"
                        type="text"
                        disabled
                        value={values.unit3_cost_vat_ex}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </FormGroup>
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

AddItem.defaultProps = {
  onSave: () => {},
  vendors: null
};

export default AddItem;
