import React, {
  Component
} from 'react';
import { Button } from 'reactstrap';

import CostingTable from '../../components/CostingTable';
import { COSTINGS } from '../../config/data';

class Costing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      costings: COSTINGS,
      edit_costing: {},
      isOpenEditCostingModal: false
    };
  }

  handleEdit(id) {
    const { isOpenEditCostingModal, costings } = this.state;
    this.setState({
      isOpenEditCostingModal: !isOpenEditCostingModal,
      edit_costing: costings.find(item => item.id === id)
    });
  }

  handleDelete(id) {
    const { costings } = this.state;
    const result = confirm('Are you sure you want to delete this Costing?');
    if (result) {
      this.setState({
        costings: costings.filter(item => item.id !== id)
      });
    }
  }

  handleSaveItem(value) {
    console.log(value);
  }

  handleCancel() {
    this.setState({
      isOpenEditCostingModal: false
    });
  }

  render() {
    const {
      isOpenEditCostingModal,
      costings,
      edit_costing
    } = this.state;
    return (
      <div className="main-page">
        <div className="page-header">
          <div className="page-title">Standard Costing</div>
          <div className="header-action">
            <Button
              type="button"
              color="secondary"
            >
              View Another Date...
            </Button>
          </div>
        </div>
        <h3>as of Monday, September 30, 2019</h3>
        <div className="table-responsive">
          <CostingTable
            costings={costings}
            onEdit={this.handleEdit.bind(this)}
            onDelete={this.handleDelete.bind(this)}
          />
        </div>
      </div>
    );
  }
}

export default Costing;
