/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import {
  Table
} from 'semantic-ui-react';

import _ from 'lodash';
import { CustomInput } from 'reactstrap';

class CycleCountTable extends Component {
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

    const { cycleCounts } = props;
    this.setState({
      data: cycleCounts
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

  handleCheck(item, index) {
    let newData = {};
    newData = {
      id: item.id,
      item_id: item.item_id,
      on_hand_yesterday: item.on_hand_yesterday,
      on_hand_today: item.on_hand_today ? 0 : 1,
      net_consumption: item.net_consumption,
      standard_cost: item.standard_cost,
      total_cost: item.total_cost
    };
    const { onCheck } = this.props;
    onCheck(newData, item.item, index);
  }

  render() {
    const {
      column,
      direction,
      data
    } = this.state;
    let total_cost = 0;
    const inventories = JSON.parse(localStorage.getItem('inventory_types'));
    for (let i = 0; i < data.length; i++) {
      const cycle = data[i];
      total_cost += cycle.total_cost;
    }

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
              width="1"
              sorted={column === 'on_hand_yesterday' ? direction : null}
              onClick={this.handleSort.bind(this, 'on_hand_yesterday')}
            >
              On Hand Yesterday
            </Table.HeaderCell>
            <Table.HeaderCell
              width="1"
            >
              On Hand Today
            </Table.HeaderCell>
            <Table.HeaderCell
              width="1"
            >
              Net Consumption
            </Table.HeaderCell>
            <Table.HeaderCell
              width="1"
              sorted={column === 'standard_cost' ? direction : null}
              onClick={this.handleSort.bind(this, 'standard_cost')}
            >
              Standard Cost(VAT-ex)
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'total_cost' ? direction : null}
              onClick={this.handleSort.bind(this, 'total_cost')}
            >
              Total Cost
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
                    {item.on_hand_yesterday}
                  </Table.Cell>
                  <Table.Cell className="text-center">
                    <CustomInput
                      id="on_hand_today"
                      type="checkbox"
                      checked={item.on_hand_today}
                      onChange={this.handleCheck.bind(this, item, index)}
                    />
                  </Table.Cell>
                  <Table.Cell>
                    {item.net_consumption}
                  </Table.Cell>
                  <Table.Cell>
                    {item.standard_cost}
                  </Table.Cell>
                  <Table.Cell>
                    {item.total_cost}
                  </Table.Cell>
                </Table.Row>
              ))
            )
          }
        </Table.Body>
        <Table.Footer fullWidth>
          <Table.Row>
            <Table.HeaderCell colSpan="8">
            </Table.HeaderCell>
            <Table.HeaderCell style={{ fontWeight: 700 }}>
              Php
              &nbsp;
              {total_cost}
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    );
  }
}

CycleCountTable.defaultProps = {
  onCheck: () => {}
};

export default CycleCountTable;
