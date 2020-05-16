import React, {
  Component
} from 'react';
import { Button } from 'reactstrap';
import OrderTable from '../../components/OrderTable';
import { ORDERS } from '../../config/data';

class CreateOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: ORDERS
    };
  }

  handleCheck(value) {
    console.log(value);
  }

  handleApproval() {

  }

  render() {
    const {
      orders
    } = this.state;
    return (
      <div className="main-page">
        <div className="page-header">
          <div className="page-title">Create Order</div>
        </div>
        <div className="table-responsive">
          <OrderTable
            orders={orders}
            onCheck={this.handleCheck.bind(this)}
          />
        </div>
        <div className="d-flex justify-content-end mt-4">
          <Button
            type="button"
            color="secondary"
            onClick={this.handleApproval.bind(this)}
          >
            Submit for Approval...
          </Button>
        </div>
      </div>
    );
  }
}

export default CreateOrder;
