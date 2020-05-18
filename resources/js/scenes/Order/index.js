import React, {
  Component
} from 'react';
import { Button } from 'reactstrap';
import OrderTable from '../../components/OrderTable';
// import { ORDERS } from '../../config/data';
import Api from '../../apis/app';
import GeneralModal from '../../components/GeneralModal';

class CreateOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      isOpenSubmittedModal: false,
      action: ''
    };
  }

  async componentDidMount() {
    const { response, body } = await Api.get('orders/active');
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

  async handleCheck(value) {
    await Api.put(`order/check/${value.id}`);
  }

  async handleApproval() {
    const { orders } = this.state;
    if (orders.length > 0) {
      const { response, body } = await Api.post('orders/approve', orders);
      switch (response.status) {
        case 200:
          this.setState({
            orders: [],
            action: body.orders.length > 0 ? `TRF # ${body.orders.pop().trf_number}` : '',
            isOpenSubmittedModal: true
          });
          break;
        default:
          break;
      }
    }
  }

  handleCancel() {
    this.setState({
      isOpenSubmittedModal: false
    });
  }

  render() {
    const {
      orders,
      isOpenSubmittedModal,
      action
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
        {
          isOpenSubmittedModal && (
            <GeneralModal
              status="Success"
              content="Order has been created and is submitted for approval."
              action={action}
              handleCancel={this.handleCancel.bind(this)}
            />
          )
        }
      </div>
    );
  }
}

export default CreateOrder;
