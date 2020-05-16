import React, {
  Component
} from 'react';
import { Button } from 'reactstrap';

import ItemTable from '../../components/ItemTable';
import ItemAdd from './Add.js';
import ItemEdit from './Edit.js';
// import { ITEMS, VENDORS } from '../../config/data';
import Api from '../../apis/app';

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      edit_item: {},
      editIndex: -1,
      isOpenAddItemModal: false,
      isOpenEditItemModal: false
    };
  }

  async componentDidMount() {
    const companies = await Api.get('items');
    const { response, body } = companies;
    switch (response.status) {
      case 200:
        this.setState({
          items: body.items
        });
        break;
      default:
        break;
    }
  }

  handleAddItemModal() {
    const { isOpenAddItemModal } = this.state;
    this.setState({
      isOpenAddItemModal: !isOpenAddItemModal
    });
  }

  async handleAddItem(item) {
    const { response, body } = await Api.post('item', item);
    switch (response.status) {
      case 200:
        this.setState({
          items: body.data,
          isOpenAddItemModal: false
        });
        break;
      default:
        break;
    }
  }

  handleEdit(id, index) {
    const { isOpenEditItemModal, items } = this.state;
    this.setState({
      isOpenEditItemModal: !isOpenEditItemModal,
      edit_item: items.find(item => item.id === id),
      editIndex: index
    });
  }

  async handleDelete(id) {
    const { items } = this.state;
    const result = confirm('Are you sure you want to delete this Item?');
    if (result) {
      const { response } = await Api.delete(`item/${id}`);
      switch (response.status) {
        case 200:
          this.setState({
            items: items.filter(item => item.id !== id)
          });
          break;
        default:
          break;
      }
    }
  }

  async handleSaveItem(value) {
    const { items, editIndex } = this.state;
    const { response } = await Api.put(`item/${value.id}`, value);
    switch (response.status) {
      case 200:
        items[editIndex] = value;
        this.setState({
          items,
          isOpenEditItemModal: false
        });
        break;
      default:
        break;
    }
  }

  handleCancel() {
    this.setState({
      isOpenAddItemModal: false,
      isOpenEditItemModal: false
    });
  }

  render() {
    const {
      isOpenAddItemModal,
      isOpenEditItemModal,
      items,
      edit_item
    } = this.state;
    return (
      <div className="main-page">
        <div className="page-header">
          <div className="page-title">Item Setup</div>
          <div className="header-action">
            <Button
              type="button"
              color="secondary"
              onClick={this.handleAddItemModal.bind(this)}
            >
              Add Item...
            </Button>
          </div>
        </div>
        <div className="table-responsive">
          <ItemTable
            items={items}
            onEdit={this.handleEdit.bind(this)}
            onDelete={this.handleDelete.bind(this)}
          />
        </div>
        {
          isOpenAddItemModal && (
            <ItemAdd
              onSave={this.handleAddItem.bind(this)}
              handleCancel={this.handleCancel.bind(this)}
            />
          )
        }
        {
          isOpenEditItemModal && (
            <ItemEdit
              item={edit_item}
              onSave={this.handleSaveItem.bind(this)}
              handleCancel={this.handleCancel.bind(this)}
            />
          )
        }
      </div>
    );
  }
}

export default Item;
