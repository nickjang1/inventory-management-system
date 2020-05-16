import React, {
  Component
} from 'react';
import { Button } from 'reactstrap';

import UserTable from '../../components/UserTable';
import UserAdd from './Add.js';
import UserEdit from './Edit.js';
// import { USERS } from '../../config/data';
import Api from '../../apis/app';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      edit_user: {},
      stores: [],
      editIndex: -1,
      isOpenAddUserModal: false,
      isOpenEditUserModal: false
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
    this.componentWillReceiveProps(this.props);
  }

  async componentWillReceiveProps() {
    const users = await Api.get('users');
    const { response, body } = users;
    switch (response.status) {
      case 200:
        this.setState({
          users: body.users.filter(user => user.is_superuser !== 1)
        });
        break;
      default:
        break;
    }
  }

  handleAddUser() {
    const { isOpenAddUserModal } = this.state;
    this.setState({
      isOpenAddUserModal: !isOpenAddUserModal
    });
  }

  async handleAddItem(user) {
    const { response, body } = await Api.post('user', user);
    switch (response.status) {
      case 200:
        this.setState({
          users: body.users.filter(u => u.is_superuser !== 1),
          isOpenAddUserModal: false
        });
        break;
      default:
        break;
    }
  }


  handleEdit(id, index) {
    const { isOpenEditUserModal, users } = this.state;
    this.setState({
      isOpenEditUserModal: !isOpenEditUserModal,
      edit_user: users.find(item => item.id === id),
      editIndex: index
    });
  }

  async handleDelete(id) {
    const { users } = this.state;
    const result = confirm('Are you sure you want to delete this User?');
    if (result) {
      const { response } = await Api.delete(`user/${id}`);
      switch (response.status) {
        case 200:
          this.setState({
            users: users.filter(item => item.id !== id)
          });
          break;
        default:
          break;
      }
    }
  }

  async handleSaveItem(value) {
    const { users, editIndex } = this.state;
    const { response } = await Api.put(`user/${value.id}`, value);
    switch (response.status) {
      case 200:
        users[editIndex] = value;
        this.setState({
          users,
          isOpenEditUserModal: false
        });
        break;
      default:
        break;
    }
  }

  handleCancel() {
    this.setState({
      isOpenAddUserModal: false,
      isOpenEditUserModal: false
    });
  }

  render() {
    const {
      isOpenAddUserModal,
      isOpenEditUserModal,
      users,
      stores,
      edit_user
    } = this.state;
    return (
      <div className="main-page">
        <div className="page-header">
          <div className="page-title">User Maintenance</div>
          <div className="header-action">
            <Button
              type="button"
              color="secondary"
              onClick={this.handleAddUser.bind(this)}
            >
              Add User...
            </Button>
          </div>
        </div>
        <div className="table-responsive">
          <UserTable
            users={users}
            onEdit={this.handleEdit.bind(this)}
            onDelete={this.handleDelete.bind(this)}
          />
        </div>
        {
          isOpenAddUserModal && (
            <UserAdd
              stores={stores}
              onSave={this.handleAddItem.bind(this)}
              handleCancel={this.handleCancel.bind(this)}
            />
          )
        }
        {
          isOpenEditUserModal && (
            <UserEdit
              stores={stores}
              user={edit_user}
              onSave={this.handleSaveItem.bind(this)}
              handleCancel={this.handleCancel.bind(this)}
            />
          )
        }
      </div>
    );
  }
}

export default User;
