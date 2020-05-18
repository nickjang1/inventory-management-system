import React, {
  Component
} from 'react';

import ViewOrdersTable from '../../components/ViewOrdersTable';
// import { ORDERS } from '../../config/data';
import Api from '../../apis/app';

class ViewOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: []
    };
  }

  async componentDidMount() {
    const { response, body } = await Api.get('orders/all');
    switch (response.status) {
      case 200:
        this.setState({
          orders: body.orders
        });
        break;
      default:
        break;
    }
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
