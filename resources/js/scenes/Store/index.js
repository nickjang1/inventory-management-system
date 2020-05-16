import React, {
  Component
} from 'react';
import { Button } from 'reactstrap';

import StoreTable from '../../components/StoreTable';
import StoreAdd from './Add.js';
import StoreEdit from './Edit.js';
// import { STORES } from '../../config/data';
import Api from '../../apis/app';

class Store extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stores: [],
      edit_store: {},
      editIndex: -1,
      isOpenAddStoreModal: false,
      isOpenEditStoreModal: false
    };
  }

  async componentDidMount() {
    const { response, body } = await Api.get('stores');
    switch (response.status) {
      case 200:
        this.setState({
          stores: body.stores
        });
        break;
      default:
        break;
    }
  }

  handleAddStore() {
    const { isOpenAddStoreModal } = this.state;
    this.setState({
      isOpenAddStoreModal: !isOpenAddStoreModal
    });
  }

  async handleAddItem(store) {
    const { response, body } = await Api.post('store', store);
    switch (response.status) {
      case 200:
        this.setState({
          stores: body.data,
          isOpenAddStoreModal: false
        });
        break;
      default:
        break;
    }
  }

  handleEdit(id, index) {
    const { isOpenEditStoreModal, stores } = this.state;
    this.setState({
      isOpenEditStoreModal: !isOpenEditStoreModal,
      edit_store: stores.find(item => item.id === id),
      editIndex: index
    });
  }

  async handleDelete(id) {
    const { stores } = this.state;
    const result = confirm('Are you sure you want to delete this Store?');
    if (result) {
      const { response } = await Api.delete(`store/${id}`);
      switch (response.status) {
        case 200:
          this.setState({
            stores: stores.filter(item => item.id !== id)
          });
          break;
        default:
          break;
      }
    }
  }

  async handleSaveItem(value) {
    const { stores, editIndex } = this.state;
    const { response } = await Api.put(`store/${value.id}`, value);
    switch (response.status) {
      case 200:
        stores[editIndex] = value;
        this.setState({
          stores,
          isOpenEditStoreModal: false
        });
        break;
      default:
        break;
    }
  }

  handleCancel() {
    this.setState({
      isOpenAddStoreModal: false,
      isOpenEditStoreModal: false
    });
  }

  render() {
    const {
      isOpenAddStoreModal,
      isOpenEditStoreModal,
      stores,
      edit_store
    } = this.state;
    return (
      <div className="main-page">
        <div className="page-header">
          <div className="page-title">Store Setup</div>
          <div className="header-action">
            <Button
              type="button"
              color="secondary"
              onClick={this.handleAddStore.bind(this)}
            >
              Add Store...
            </Button>
          </div>
        </div>
        <div className="table-responsive">
          <StoreTable
            stores={stores}
            onEdit={this.handleEdit.bind(this)}
            onDelete={this.handleDelete.bind(this)}
          />
        </div>
        {
          isOpenAddStoreModal && (
            <StoreAdd
              onSave={this.handleAddItem.bind(this)}
              handleCancel={this.handleCancel.bind(this)}
            />
          )
        }
        {
          isOpenEditStoreModal && (
            <StoreEdit
              store={edit_store}
              onSave={this.handleSaveItem.bind(this)}
              handleCancel={this.handleCancel.bind(this)}
            />
          )
        }
      </div>
    );
  }
}

export default Store;
