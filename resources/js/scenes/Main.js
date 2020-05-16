/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from '../layouts/Full';
import Vendor from './Vendor';
import Item from './Item';
import Store from './Store';
import User from './User';
import Costing from './Costing';
import CycleCount from './CycleCount';
import ViewRecords from './ViewRecords';
import Order from './Order';
import ApprovedOrder from './Order/approve';
import DCOrdering from './DCOrdering';
import CreatePurchaseOrder from './DCOrdering/createPurchase';
import ApprovedPurchaseOrder from './DCOrdering/approvePurchase';
import ReceiveOrder from './Receive';
import DispatchStores from './Receive/dispatchStore';
import ViewOrders from './Order/view';
import Api from '../apis/app';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  async componentDidMount() {
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
  }

  render() {
    return (
      <Layout>
        <Switch>
          <Route component={DispatchStores} path="/dispatch-stores" exact />
          <Route component={ReceiveOrder} path="/receive-order" exact />
          <Route component={ApprovedPurchaseOrder} path="/approved-purchase-order" exact />
          <Route component={CreatePurchaseOrder} path="/create-purchase-order" exact />
          <Route component={DCOrdering} path="/assign-vendors" exact />
          <Route component={ViewOrders} path="/view-orders" exact />
          <Route component={ApprovedOrder} path="/approved-order" exact />
          <Route component={Order} path="/create-order" exact />
          <Route component={ViewRecords} path="/view-records" exact />
          <Route component={CycleCount} path="/" exact />
          <Route component={Costing} path="/standard-costing" exact />
          <Route component={User} path="/users" exact />
          <Route component={Store} path="/store" exact />
          <Route component={Item} path="/item" exact />
          <Route component={Vendor} path="/vendor" exact />
          <Route component={CycleCount} path="/" exact />
        </Switch>
      </Layout>
    );
  }
}

export default Main;
