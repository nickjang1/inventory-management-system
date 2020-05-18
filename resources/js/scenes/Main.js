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
import ApprovedOrder from './Order/Approve';
import DCOrdering from './DCOrdering';
import CreatePurchaseOrder from './DCOrdering/createPurchase';
import ApprovedPurchaseOrder from './DCOrdering/approvePurchase';
import ReceiveOrder from './Receive';
import DispatchStores from './Receive/dispatchStore';
import ViewOrders from './Order/View';
import ViewRecord from './ViewRecords/View';
import OrderDetail from './Order/Detail';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
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
          <Route component={OrderDetail} path="/view-orders/:id" exact />
          <Route component={ViewOrders} path="/view-orders" exact />
          <Route component={ApprovedOrder} path="/approved-order" exact />
          <Route component={Order} path="/create-order" exact />
          <Route component={ViewRecords} path="/view-records" exact />
          <Route component={ViewRecord} path="/view-records/:id" exact />
          <Route component={CycleCount} path="/" exact />
          <Route component={Costing} path="/standard-costing" exact />
          <Route component={User} path="/users" exact />
          <Route component={Store} path="/store" exact />
          <Route component={Item} path="/item" exact />
          <Route component={Vendor} path="/vendor" exact />
          <Route component={CycleCount} path="/daily-cycle-count" exact />
        </Switch>
      </Layout>
    );
  }
}

export default Main;
