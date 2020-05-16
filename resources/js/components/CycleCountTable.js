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
                    {item.on_hand_yesterday}
                  </Table.Cell>
                  <Table.Cell>
                    <CustomInput
                      id="on_hand_today"
                      type="checkbox"
                      checked={item.on_hand_today}
                      onChange={() => { onCheck(item); }}
                    />
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
            <Table.HeaderCell colSpan="7">
            </Table.HeaderCell>
            <Table.HeaderCell style={{ fontWeight: 700 }}>
              Php
              &nbsp;
              11,840.50
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
