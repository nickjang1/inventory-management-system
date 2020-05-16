import React, {
  Component
} from 'react';

import ViewOrdersTable from '../../components/ViewOrdersTable';
import { ORDERS } from '../../config/data';

class ViewOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: ORDERS
    };
  }

  render() {
    const {
      orders
    } = this.state;
    return (
      <div className="main-page">
        <div className="page-header">
          <div className="page-title">View Past Orders</div>
        </div>
        <div className="table-responsive">
          <ViewOrdersTable
            orders={orders}
          />
        </div>
      </div>
    );
  }
}

export default ViewOrders;
