import React, {
  Component
} from 'react';
import { Button } from 'reactstrap';

import UserTable from '../../components/UserTable';
import UserAdd from './Add.js';
import UserEdit from './Edit.js';
import { USERS } from '../../config/data';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: USERS,
      edit_user: {},
      isOpenAddUserModal: false,
      isOpenEditUserModal: false
    };
  }

  handleAddUser() {
    const { isOpenAddUserModal } = this.state;
    this.setState({
      isOpenAddUserModal: !isOpenAddUserModal
    });
  }

  handleAddItem(user) {
    console.log(user);
  }

  handleEdit(id) {
    const { isOpenEditUserModal, users } = this.state;
    this.setState({
      isOpenEditUserModal: !isOpenEditUserModal,
      edit_user: users.find(item => item.id === id)
    });
  }

  handleDelete(id) {
    const { users } = this.state;
    const result = confirm('Are you sure you want to delete this User?');
    if (result) {
      this.setState({
        users: users.filter(item => item.id !== id)
      });
    }
  }

  handleSaveItem(value) {
    console.log(value);
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
              onSave={this.handleAddItem.bind(this)}
              handleCancel={this.handleCancel.bind(this)}
            />
          )
        }
        {
          isOpenEditUserModal && (
            <UserEdit
              user={edit_user}
              handleSave={this.handleSaveItem.bind(this)}
              handleCancel={this.handleCancel.bind(this)}
            />
          )
        }
      </div>
    );
  }
}

export default User;
