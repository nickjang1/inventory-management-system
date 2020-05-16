import React, {
  Component
} from 'react';
import { Button } from 'reactstrap';

import VendorTable from '../../components/VendorTable';
import VendorAdd from './Add.js';
import VendorEdit from './Edit.js';
import Api from '../../apis/app';
// import { VENDORS } from '../../config/data';

class Vendor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vendors: [],
      edit_vendor: {},
      editIndex: -1,
      isOpenAddVendorModal: false,
      isOpenEditVendorModal: false
    };
  }

  componentDidMount() {
    this.componentWillReceiveProps(this.props);
  }

  async componentWillReceiveProps() {
    const companies = await Api.get('companies');
    const { response, body } = companies;
    switch (response.status) {
      case 200:
        this.setState({
          vendors: body.companies
        });
        break;
      default:
        break;
    }
  }

  handleAddVendor() {
    const { isOpenAddVendorModal } = this.state;
    this.setState({
      isOpenAddVendorModal: !isOpenAddVendorModal
    });
  }

  async handleAddItem(vendor) {
    const { response, body } = await Api.post('company', vendor);
    switch (response.status) {
      case 200:
        this.setState({
          vendors: body.data,
          isOpenAddVendorModal: false
        });
        break;
      default:
        break;
    }
  }

  handleEdit(id, index) {
    const { isOpenEditVendorModal, vendors } = this.state;
    this.setState({
      isOpenEditVendorModal: !isOpenEditVendorModal,
      edit_vendor: vendors.find(item => item.id === id),
      editIndex: index
    });
  }

  async handleDelete(id) {
    const { vendors } = this.state;
    const result = confirm('Are you sure you want to delete this Vendor?');
    if (result) {
      const { response } = await Api.delete(`company/${id}`);
      switch (response.status) {
        case 200:
          this.setState({
            vendors: vendors.filter(item => item.id !== id)
          });
          break;
        default:
          break;
      }
    }
  }

  async handleSaveItem(value) {
    const { vendors, editIndex } = this.state;
    const { response } = await Api.put(`company/${value.id}`, value);
    switch (response.status) {
      case 200:
        vendors[editIndex] = value;
        this.setState({
          vendors,
          isOpenEditVendorModal: false
        });
        break;
      default:
        break;
    }
  }

  handleCancel() {
    this.setState({
      isOpenAddVendorModal: false,
      isOpenEditVendorModal: false
    });
  }

  render() {
    const {
      isOpenAddVendorModal,
      isOpenEditVendorModal,
      vendors,
      edit_vendor
    } = this.state;
    return (
      <div className="main-page">
        <div className="page-header">
          <div className="page-title">Vendor Setup</div>
          <div className="header-action">
            <Button
              type="button"
              color="secondary"
              onClick={this.handleAddVendor.bind(this)}
            >
              Add Vendor...
            </Button>
          </div>
        </div>
        <div className="table-responsive">
          <VendorTable
            vendors={vendors}
            onEdit={this.handleEdit.bind(this)}
            onDelete={this.handleDelete.bind(this)}
          />
        </div>
        {
          isOpenAddVendorModal && (
            <VendorAdd
              onSave={this.handleAddItem.bind(this)}
              handleCancel={this.handleCancel.bind(this)}
            />
          )
        }
        {
          isOpenEditVendorModal && (
            <VendorEdit
              vendor={edit_vendor}
              handleSave={this.handleSaveItem.bind(this)}
              handleCancel={this.handleCancel.bind(this)}
            />
          )
        }
      </div>
    );
  }
}

export default Vendor;
