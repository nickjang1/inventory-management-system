/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import moment from 'moment';
import {
  Table,
  Pagination,
  Menu
} from 'semantic-ui-react';
import Select from 'react-select';

import _ from 'lodash';

class VendorTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      column: null,
      data: [],
      direction: null,
      activePage: 1,
      per_page: 10,
      current_perPage: { label: 10, value: 10 },
      pageOptions: [
        { label: 10, value: 10 },
        { label: 20, value: 20 },
        { label: 50, value: 50 }
      ]
    };
    this.handleChangePerPage = this.handleChangePerPage.bind(this);
  }

  componentDidMount() {
    if (this.props.vendors.length > 0) {
      this.setState({
        activePage: 1
      });
    }
    const { vendors } = this.props;
    const { per_page } = this.state;
    this.setState({
      data: vendors.slice(0, per_page)
    });
  }

  componentWillReceiveProps(props) {

    const { vendors } = props;

    if (this.props.vendors !== vendors) {
      if (props.vendors.length > 0) {
        this.setState({
          activePage: 1
        });
      }
      const { per_page } = this.state;
      this.setState({
        data: vendors.slice(0, per_page)
      });
    } else {
      const { per_page } = this.state;
      this.setState({
        data: vendors.slice(0, per_page)
      });
    }
  }

  handlePaginationChange(e, { activePage }) {
    const { vendors } = this.props;
    const { per_page } = this.state;
    if (activePage !== 1) {
      this.setState({
        activePage,
        data: vendors.slice(((activePage - 1) * per_page), activePage * per_page)
      });
    } else {
      this.setState({
        activePage,
        data: vendors.slice(0, per_page)
      });
    }
  }

  handleSort(clickedColumn) {
    const { column, data, direction } = this.state;

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        data: _.sortBy(data, [clickedColumn]),
        direction: 'ascending'
      });

      return;
    }

    this.setState({
      data: data.reverse(),
      direction: direction === 'ascending' ? 'descending' : 'ascending'
    });
  }

  handleChangePerPage(page_num) {
    const { vendors } = this.props;
    this.setState({
      activePage: 1,
      current_perPage: page_num,
      per_page: page_num.value,
      data: vendors.slice(0, page_num.value)
    });
  }

  render() {
    const {
      onDelete,
      onEdit,
      vendors
    } = this.props;

    const {
      column,
      direction,
      data,
      activePage,
      per_page,
      pageOptions,
      current_perPage
    } = this.state;

    const users = JSON.parse(localStorage.getItem('users'));

    return (
      <Table sortable celled selectable unstackable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              sorted={column === 'code' ? direction : null}
              onClick={this.handleSort.bind(this, 'code')}
            >
              Vendor Code
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'name' ? direction : null}
              onClick={this.handleSort.bind(this, 'name')}
            >
              Vendor Name
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'status' ? direction : null}
              onClick={this.handleSort.bind(this, 'status')}
            >
              Status
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'address' ? direction : null}
              onClick={this.handleSort.bind(this, 'address')}
            >
              Address
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'contact_number_1' ? direction : null}
              onClick={this.handleSort.bind(this, 'contact_number_1')}
            >
              Contact Number
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'contact_person_id' ? direction : null}
              onClick={this.handleSort.bind(this, 'contact_person_id')}
            >
              Contact Person
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'email' ? direction : null}
              onClick={this.handleSort.bind(this, 'email')}
            >
              Email Address
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'vat' ? direction : null}
              onClick={this.handleSort.bind(this, 'vat')}
            >
              VAT Status
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'updated' ? direction : null}
              onClick={this.handleSort.bind(this, 'updated')}
            >
              Date Last Updated
            </Table.HeaderCell>
            <Table.HeaderCell>
              By Whom
            </Table.HeaderCell>
            <Table.HeaderCell>
              Actions
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {
            data && data.length > 0 && (
              data.map((item, index) => (
                <Table.Row
                  key={index}
                >
                  <Table.Cell>
                    {item.company_code}
                  </Table.Cell>
                  <Table.Cell>
                    {item.name}
                  </Table.Cell>
                  <Table.Cell>
                    {item.status ? 'Active' : 'Inactive'}
                  </Table.Cell>
                  <Table.Cell>
                    {item.address}
                  </Table.Cell>
                  <Table.Cell>
                    {item.contact_number_1 || item.contact_number_2}
                  </Table.Cell>
                  <Table.Cell>
                    {users.find(user => user.id === item.contact_person_id) ? users.find(user => user.id === item.contact_person_id).username : ''}
                  </Table.Cell>
                  <Table.Cell>
                    <a href={`mailto:${item.email_1 ? item.email_1 : item.email_2}`}>{item.email_1 ? item.email_1 : item.email_2}</a>
                  </Table.Cell>
                  <Table.Cell>
                    {item.vat_status ? 'VAT' : 'Non-VAT'}
                  </Table.Cell>
                  <Table.Cell>
                    {moment(item.updated_at).format('DD/MM/YYYY HH:mm A')}
                  </Table.Cell>
                  <Table.Cell>
                    {item.modified_by || item.created_by}
                  </Table.Cell>
                  <Table.Cell>
                    <div className="actions d-flex w-100 justify-content-center align-items-center">
                      <i className="fa fa-pencil fa-lg" onClick={() => onEdit(item.id, index)} style={{ marginRight: '10px', cursor: 'pointer' }} />
                      <i className="fa fa-close fa-lg" onClick={() => onDelete(item.id)} style={{ cursor: 'pointer' }} />
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))
            )
          }
        </Table.Body>
        <Table.Footer fullWidth>
          <Table.Row>
            <Table.HeaderCell colSpan="1">
              <Select
                name="pageOption"
                menuPlacement="top"
                classNamePrefix="react-select"
                placeholder="Per Page"
                defaultValue={pageOptions[0]}
                value={current_perPage}
                options={pageOptions}
                getOptionValue={option => option.label}
                getOptionLabel={option => option.value}
                onChange={(num) => {
                  this.handleChangePerPage(num);
                }}
              />
            </Table.HeaderCell>
            <Table.HeaderCell colSpan="10">
              <Menu floated="right" pagination>
                <Pagination
                  activePage={activePage}
                  onPageChange={this.handlePaginationChange.bind(this)}
                  totalPages={Math.ceil(vendors.length / per_page)}
                />
              </Menu>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    );
  }
}

VendorTable.defaultProps = {
  onDelete: () => {},
  onEdit: () => {}
};

export default VendorTable;
