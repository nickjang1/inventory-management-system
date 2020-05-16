import React, {
  Component, Fragment
} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import {
  Form, FormGroup, Input, Button, Alert
} from 'reactstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Layout from '../../layouts/Auth';

import Api from '../../apis/app';
import {
  login
} from '../../actions/common';
import AppHelper from '../../helpers/AppHelper';

class Login extends Component {
  async handleSubmit(values, bags) {
    const data = await Api.post('login', values);
    const { response, body } = data;
    switch (response.status) {
      case 422:
        bags.setErrors(body.data);
        break;
      case 406:
        bags.setStatus(AppHelper.getStatusAlertData(body));
        break;
      case 200:
        this.login(body.data);
        this.props.history.push('/');
        break;
      default:
        break;
    }
    bags.setSubmitting(false);
  }

  async login(auth) {
    await this.props.login(auth);
    const users = await Api.get('users');
    switch (users.response.status) {
      case 200:
        localStorage.setItem('users', JSON.stringify(users.body.users));
        break;
      default:
        break;
    }
    const vendors = await Api.get('companies');
    switch (vendors.response.status) {
      case 200:
        localStorage.setItem('vendors', JSON.stringify(vendors.body.companies));
        break;
      default:
        break;
    }
    const roles = await Api.get('roles');
    switch (roles.response.status) {
      case 200:
        localStorage.setItem('roles', JSON.stringify(roles.body.data));
        break;
      default:
        break;
    }
    const inventory_types = await Api.get('inventory-types');
    switch (inventory_types.response.status) {
      case 200:
        localStorage.setItem('inventory_types', JSON.stringify(inventory_types.body.data));
        break;
      default:
        break;
    }
    const store_types = await Api.get('store-types');
    switch (store_types.response.status) {
      case 200:
        localStorage.setItem('store_types', JSON.stringify(store_types.body.data));
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <Layout
        form={(
          <Formik
            initialValues={{
              email: '',
              password: ''
            }}
            validationSchema={
              Yup.object().shape({
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
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting
            }) => (
              <Form className="intro-box-form-field" onSubmit={handleSubmit}>
                {status && <Alert {...status} />}
                <div className="form-fields">
                  <FormGroup>
                    <Input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      invalid={touched.email && !!errors.email}
                    />
                    <i className="far fa-mail-bulk" />
                  </FormGroup>
                  <FormGroup>
                    <Input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      invalid={touched.password && !!errors.password}
                    />
                    <i className="fa fa-fingerprint" />
                  </FormGroup>
                </div>
                <div className="form-links">
                  <FormGroup className="text-center">
                    <Button
                      disabled={isSubmitting}
                      type="submit"
                      color="success"
                      className="btn-lg"
                    >
                      {
                        isSubmitting && (
                          <Fragment>
                            <span className="fa fa-spinner fa-spin" />
                            &nbsp;&nbsp;
                          </Fragment>
                        )
                      }
                      Continue
                    </Button>
                  </FormGroup>
                  <FormGroup>
                    <div className="text-center">
                      <Link to="/forgot">I forgot my password</Link>
                    </div>
                  </FormGroup>
                </div>
              </Form>
            )}
          />
        )}
      />
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  login: bindActionCreators(login, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
