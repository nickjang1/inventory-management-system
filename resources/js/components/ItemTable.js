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

class ItemTable extends Component {
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
    if (this.props.items.length > 0) {
      this.setState({
        activePage: 1
      });
    }
    const { items } = this.props;
    const { per_page } = this.state;
    this.setState({
      data: items.slice(0, per_page)
    });
  }

  componentWillReceiveProps(props) {
    const { items } = props;

    if (this.props.items !== items) {
      if (props.items.length > 0) {
        this.setState({
          activePage: 1
        });
      }
      const { per_page } = this.state;
      this.setState({
        data: items.slice(0, per_page)
      });
    } else {
      const { per_page } = this.state;
      this.setState({
        data: items.slice(0, per_page)
      });
    }
  }

  handlePaginationChange(e, { activePage }) {
    const { items } = this.props;
    const { per_page } = this.state;
    if (activePage !== 1) {
      this.setState({
        activePage,
        data: items.slice(((activePage - 1) * per_page), activePage * per_page)
      });
    } else {
      this.setState({
        activePage,
        data: items.slice(0, per_page)
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
    const { items } = this.props;
    this.setState({
      activePage: 1,
      current_perPage: page_num,
      per_page: page_num.value,
      data: items.slice(0, page_num.value)
    });
  }

  render() {
    const {
      onDelete,
      onEdit,
      items
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
    const inventories = JSON.parse(localStorage.getItem('inventory_types'));

    return (
      <Table sortable celled selectable unstackable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              sorted={column === 'code' ? direction : null}
              onClick={this.handleSort.bind(this, 'code')}
            >
              Item Code
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'description' ? direction : null}
              onClick={this.handleSort.bind(this, 'description')}
            >
              Description
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'status' ? direction : null}
              onClick={this.handleSort.bind(this, 'status')}
            >
              Status
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'brand' ? direction : null}
              onClick={this.handleSort.bind(this, 'brand')}
            >
              Brand
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'vendor' ? direction : null}
              onClick={this.handleSort.bind(this, 'vendor')}
            >
              Vendor
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'inventory_type' ? direction : null}
              onClick={this.handleSort.bind(this, 'inventory_type')}
            >
              Inventory Type
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'updated' ? direction : null}
              onClick={this.handleSort.bind(this, 'updated')}
            >
              Date Last Updated
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'created_by' ? direction : null}
              onClick={this.handleSort.bind(this, 'created_by')}
            >
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
                    {item.code}
                  </Table.Cell>
                  <Table.Cell>
                    {item.description}
                  </Table.Cell>
                  <Table.Cell>
                    {item.status ? 'Active' : 'Inactive'}
                  </Table.Cell>
                  <Table.Cell>
                    {item.brand}
                  </Table.Cell>
                  <Table.Cell>
                    {item.vendor}
                  </Table.Cell>
                  <Table.Cell>
                    {inventories && inventories.find(iv => iv.id === item.inventory_type_id) ? inventories.find(iv => iv.id === item.inventory_type_id).name : ''}
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
                  totalPages={Math.ceil(items.length / per_page)}
                />
              </Menu>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    );
  }
}

ItemTable.defaultProps = {
  onDelete: () => {},
  onEdit: () => {}
};

export default ItemTable;
