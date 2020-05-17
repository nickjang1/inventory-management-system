import React, {
  Component
} from 'react';
import { Button } from 'reactstrap';

import CostingTable from '../../components/CostingTable';
// import { COSTINGS } from '../../config/data';
import Api from '../../apis/app';
import CostingEdit from './Edit.js';

class Costing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      costings: [],
      items: [],
      edit_costing: {},
      editIndex: -1,
      isOpenEditCostingModal: false
    };
  }

  async componentDidMount() {
    const { response, body } = await Api.get('costings');
    switch (response.status) {
      case 200:
        this.setState({
          costings: body.costings
        });
        break;
      default:
        break;
    }
    const items = await Api.get('items');
    switch (items.response.status) {
      case 200:
        this.setState({
          items: items.body.items
        });
        break;
      default:
        break;
    }
  }

  handleEdit(id, index) {
    const { isOpenEditCostingModal, costings } = this.state;
    this.setState({
      isOpenEditCostingModal: !isOpenEditCostingModal,
      edit_costing: costings.find(item => item.id === id),
      editIndex: index
    });
  }

  async handleDelete(id) {
    const { costings } = this.state;
    const result = confirm('Are you sure you want to delete this Costing?');
    if (result) {
      const { response } = await Api.delete(`costing/${id}`);
      switch (response.status) {
        case 200:
          this.setState({
            costings: costings.filter(item => item.id !== id)
          });
          break;
        default:
          break;
      }
    }
  }

  async handleSaveItem(value, item) {
    const { costings, editIndex } = this.state;
    const { response } = await Api.put(`costing/${value.id}`, value);
    switch (response.status) {
      case 200:
        costings[editIndex] = value;
        costings[editIndex].item = item;
        this.setState({
          costings,
          isOpenEditCostingModal: false
        });
        break;
      default:
        break;
    }
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
      items,
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
        {
          isOpenEditCostingModal && (
            <CostingEdit
              items={items}
              item={edit_costing}
              onSave={this.handleSaveItem.bind(this)}
              handleCancel={this.handleCancel.bind(this)}
            />
          )
        }
      </div>
    );
  }
}

export default Costing;
