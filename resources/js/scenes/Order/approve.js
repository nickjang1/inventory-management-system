import React, {
  Component
} from 'react';

import ApproveOrderTable from '../../components/ApproveOrderTable';
// import { ORDERS } from '../../config/data';
import Api from '../../apis/app';
import GeneralModal from '../../components/GeneralModal';

class ApprovedOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      isOpenDoneModal: false,
      action: ''
    };
  }

  async componentDidMount() {
    const { response, body } = await Api.get('orders/pending');
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

  async handleCheck(id) {
    const { orders } = this.state;
    const { response, body } = await Api.put(`order/done/${id}`);
    switch (response.status) {
      case 200:
        this.setState({
          orders: orders.filter(item => item.id !== id),
          isOpenDoneModal: true,
          action: body.order.trf_number
        });
        break;
      default:
        break;
    }
  }

  async handleDelete(id) {
    const { orders } = this.state;
    const result = confirm('Are you sure you want to delete this Order?');
    if (result) {
      const { response } = await Api.delete(`order/delete/${id}`);
      switch (response.status) {
        case 200:
          this.setState({
            orders: orders.filter(item => item.id !== id)
          });
          break;
        default:
          break;
      }
    }
  }

  handleCancel() {
    this.setState({
      isOpenDoneModal: false
    });
  }

  render() {
    const {
      orders,
      isOpenDoneModal,
      action
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
        {
          isOpenDoneModal && (
            <GeneralModal
              status="Success"
              content={`TRF # S1-${action} has been approved and submitted to Distribution Center for purchasing.`}
              handleCancel={this.handleCancel.bind(this)}
            />
          )
        }
      </div>
    );
  }
}

export default ApprovedOrder;
