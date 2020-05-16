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

  render() {
    const {
      onCheck
    } = this.props;

    const {
      column,
      direction,
      data
    } = this.state;

    return (
      <Table sortable celled selectable unstackable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              sorted={column === 'item_code' ? direction : null}
              onClick={this.handleSort.bind(this, 'item_code')}
            >
              Item Code
            </Table.HeaderCell>
            <Table.HeaderCell
              width="3"
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
              sorted={column === 'inventory_type' ? direction : null}
              onClick={this.handleSort.bind(this, 'inventory_type')}
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
                    {item.item_code}
                  </Table.Cell>
                  <Table.Cell>
                    {item.description}
                  </Table.Cell>
                  <Table.Cell>
                    {item.status ? 'Active' : 'Inactive'}
                  </Table.Cell>
                  <Table.Cell>
                    {item.inventory_type}
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
                      onChange={() => { onCheck(item); }}
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
