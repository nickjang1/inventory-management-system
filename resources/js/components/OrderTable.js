/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import {
  Table
} from 'semantic-ui-react';

import _ from 'lodash';
import { CustomInput } from 'reactstrap';

class OrderTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      column: null,
      data: [],
      direction: null
    };
  }

  componentDidMount() {
    this.componentWillReceiveProps(this.props);
  }

  componentWillReceiveProps(props) {
    const { orders } = props;
    this.setState({
      data: orders
    });
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

  handleCheck(order, index) {
    let newData = {};
    newData = {
      id: order.id,
      final_order: order.final_order,
      item_id: order.item_id,
      modified_by: order.modified_by,
      on_hand: order.on_hand,
      on_order: order.on_order,
      status: order.status,
      suggested_order: order.suggested_order,
      total_cost: order.total_cost,
      trf_number: order.trf_number
    };
    const { onCheck } = this.props;
    const { data } = this.state;
    data[index].final_order = !data[index].final_order;
    this.setState({
      data
    });
    onCheck(newData);
  }

  render() {
    const {
      column,
      direction,
      data
    } = this.state;
    const inventories = JSON.parse(localStorage.getItem('inventory_types'));
    return (
      <Table sortable celled selectable unstackable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
            >
              Item Code
            </Table.HeaderCell>
            <Table.HeaderCell
              width="3"
            >
              Description
            </Table.HeaderCell>
            <Table.HeaderCell
            >
              Status
            </Table.HeaderCell>
            <Table.HeaderCell
            >
              Inventory Type
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'on_hand' ? direction : null}
              onClick={this.handleSort.bind(this, 'on_hand')}
            >
              On Hand
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'on_order' ? direction : null}
              onClick={this.handleSort.bind(this, 'on_order')}
            >
              On Order
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'suggested_order' ? direction : null}
              onClick={this.handleSort.bind(this, 'suggested_order')}
            >
              Suggested Order
            </Table.HeaderCell>
            <Table.HeaderCell
            >
              Final Order
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
                    {item.item.code}
                  </Table.Cell>
                  <Table.Cell>
                    {item.item.description}
                  </Table.Cell>
                  <Table.Cell>
                    {item.item.status ? 'Active' : 'Inactive'}
                  </Table.Cell>
                  <Table.Cell>
                    {inventories && inventories.find(v => v.id === item.item.inventory_type_id) ? inventories.find(v => v.id === item.item.inventory_type_id).name : ''}
                  </Table.Cell>
                  <Table.Cell>
                    {item.on_hand}
                  </Table.Cell>
                  <Table.Cell>
                    {item.on_order}
                  </Table.Cell>
                  <Table.Cell>
                    {item.suggested_order}
                  </Table.Cell>
                  <Table.Cell>
                    <CustomInput
                      id="final_order"
                      type="checkbox"
                      checked={item.final_order}
                      onChange={this.handleCheck.bind(this, item, index)}
                    />
                  </Table.Cell>
                </Table.Row>
              ))
            )
          }
        </Table.Body>
      </Table>
    );
  }
}

OrderTable.defaultProps = {
  onCheck: () => {}
};

export default OrderTable;
