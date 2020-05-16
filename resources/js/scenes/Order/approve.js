import React, {
  Component
} from 'react';

import ApproveOrderTable from '../../components/ApproveOrderTable';
import { ORDERS } from '../../config/data';

class ApprovedOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: ORDERS
    };
  }

  handleCheck(value) {
    console.log(value);
  }

  handleDelete(id) {
    const { orders } = this.state;
    const result = confirm('Are you sure you want to delete this Order?');
    if (result) {
      this.setState({
        orders: orders.filter(item => item.id !== id)
      });
    }
  }

  render() {
    const {
      orders
    } = this.state;
    return (
      <div className="main-page">
        <div className="page-header">
          <div className="page-title">Approve Order</div>
        </div>
        <div className="table-responsive">
          <ApproveOrderTable
            orders={orders}
            onCheck={this.handleCheck.bind(this)}
            onDelete={this.handleDelete.bind(this)}
          />
        </div>
      </div>
    );
  }
}

export default ApprovedOrder;
