/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import {
  Table
} from 'semantic-ui-react';

import _ from 'lodash';
import { ORDER_STATUSES } from '../config/data';

class ViewOrdersTable extends Component {
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
      column,
      direction,
      data
    } = this.state;

    return (
      <Table sortable celled selectable unstackable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              sorted={column === 'trf_number' ? direction : null}
              onClick={this.handleSort.bind(this, 'trf_number')}
            >
              TRF Number
            </Table.HeaderCell>
            <Table.HeaderCell
              width="3"
              sorted={column === 'description' ? direction : null}
              onClick={this.handleSort.bind(this, 'description')}
            >
              Description
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'created_by' ? direction : null}
              onClick={this.handleSort.bind(this, 'created_by')}
            >
              Created by
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'total_cost' ? direction : null}
              onClick={this.handleSort.bind(this, 'total_cost')}
            >
              Total Cost
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'status' ? direction : null}
              onClick={this.handleSort.bind(this, 'status')}
            >
              Status
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
                    <a href={`view-orders/${item.id}`}>{`S1-${item.trf_number}`}</a>
                  </Table.Cell>
                  <Table.Cell>
                    {item.item.description}
                  </Table.Cell>
                  <Table.Cell>
                    {item.created_by}
                  </Table.Cell>
                  <Table.Cell>
                    Php
                    &nbsp;
                    {item.total_cost}
                  </Table.Cell>
                  <Table.Cell>
                    {ORDER_STATUSES.find(v => v.value == item.status) ? ORDER_STATUSES.find(v => v.value == item.status).label : ''}
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

export default ViewOrdersTable;
