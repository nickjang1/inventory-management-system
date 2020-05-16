import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Router, Switch
} from 'react-router-dom';

import history from './history';
import Main from './scenes/Main';
import Login from './scenes/Auth/Login';
import Forgot from './scenes/Auth/Forgot';
import Reset from './scenes/Auth/Reset';

import {
  login
} from './actions/common';
import Api from './apis/app';
import {
  AuthRoute, RedirectIfAuthenticatedRoute
} from './components/PrivateRoutes';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialized: false
    };
  }

  async componentDidMount() {
    const auth = Api.getAuth();
    if (auth !== null) {
      await this.props.login(auth);
      const users = await Api.get('users');
      const { response, body } = users;
      switch (response.status) {
        case 200:
          localStorage.setItem('users', JSON.stringify(body.users));
          break;
        default:
          break;
      }
      this.componentWillReceiveProps();
    }
    this.setState({
      initialized: true
    });
  }

  async componentWillReceiveProps() {
    const vendors = await Api.get('companies');
    const { response, body } = vendors;
    switch (response.status) {
      case 200:
        localStorage.setItem('vendors', JSON.stringify(body.companies));
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
    const {
      initialized
    } = this.state;
    return (
      initialized ? (
        <Router history={history}>
          <Switch>
            <RedirectIfAuthenticatedRoute path="/forgot" name="Forgot" component={Forgot} />
            <RedirectIfAuthenticatedRoute path="/login" name="Login" component={Login} />
            <RedirectIfAuthenticatedRoute path="/reset/:token" name="Reset" component={Reset} />
            <AuthRoute path="/" name="Main" component={Main} />
          </Switch>
        </Router>
      ) : null
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  login: bindActionCreators(login, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
