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

class EditCosting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: true,
      inventory_types: JSON.parse(localStorage.getItem('inventory_types'))
    };
    this.formikRef = React.createRef();
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentDidMount() {
    this.componentWillReceiveProps(this.props);
  }

  componentWillReceiveProps(props) {
    const {
      formikRef
    } = this;
    const { item } = props;
    const values = {
      ...item
    };

    formikRef.current.setValues({
      id: values.id,
      item: values.item,
      total_qty: values.total_qty,
      rgevi_standard_cost: values.rgevi_standard_cost,
      franchise_standard_cost: values.franchise_standard_cost,
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
      item_id: values.item.id,
      total_qty: values.total_qty,
      rgevi_standard_cost: values.rgevi_standard_cost,
      franchise_standard_cost: values.franchise_standard_cost,
      created_by: values.created_by,
      modified_by: values.modified_by
    };
    const { onSave } = this.props;
    onSave(newData, values.item);
  }

  render() {
    const { isOpen } = this.state;
    const { items } = this.props;
    return (
      <Modal
        isOpen={isOpen}
        toggle={this.handleCancel}
        onClosed={this.handleCancel}
        className="modal-edit-item"
      >
        <ModalHeader toggle={this.handleCancel} style={{ borderBottom: 'none' }}>
          <div className="model-title">Edit Costing</div>
        </ModalHeader>
        <ModalBody>
          <Formik
            ref={this.formikRef}
            initialValues={{
              item: null,
              total_qty: '',
              rgevi_standard_cost: '',
              franchise_standard_cost: ''
            }}
            validationSchema={
              Yup.object().shape({
                item: Yup.mixed().required('This field is required!'),
                total_qty: Yup.string().required('This field is required!'),
                rgevi_standard_cost: Yup.string().required('This field is required!'),
                franchise_standard_cost: Yup.string().required('This field is required!')
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
                      <Label for="item">Item</Label>
                      <Select
                        name="item"
                        classNamePrefix={!!errors.item && touched.item ? 'invalid react-select-lg' : 'react-select-lg'}
                        indicatorSeparator={null}
                        options={items}
                        getOptionValue={option => option.id}
                        getOptionLabel={option => option.description}
                        value={values.item}
                        onChange={(value) => {
                          setFieldValue('item', value);
                        }}
                        onBlur={handleBlur}
                      />
                    </FormGroup>
                  </Col>
                  <Col xs="12">
                    <FormGroup>
                      <Label for="total_qty">
                        Total Qty Ordered in past 60 days
                      </Label>
                      <Input
                        name="total_qty"
                        type="text"
                        value={values.total_qty}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        invalid={!!errors.total_qty && touched.total_qty}
                      />
                    </FormGroup>
                  </Col>
                  <Col xs="12">
                    <FormGroup>
                      <Label for="rgevi_standard_cost">
                        RGEVI Standard Cost(VAT-ex)
                      </Label>
                      <Input
                        name="rgevi_standard_cost"
                        type="text"
                        value={values.rgevi_standard_cost}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        invalid={!!errors.rgevi_standard_cost && touched.rgevi_standard_cost}
                      />
                    </FormGroup>
                  </Col>
                  <Col xs="12">
                    <FormGroup>
                      <Label for="franchise_standard_cost">
                        Franchise Standard Cost(VAT-ex)
                      </Label>
                      <Input
                        name="franchise_standard_cost"
                        type="text"
                        value={values.franchise_standard_cost}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        invalid={!!errors.franchise_standard_cost && touched.franchise_standard_cost}
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

EditCosting.defaultProps = {
  onSave: () => {}
};

export default EditCosting;
