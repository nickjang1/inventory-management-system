/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import moment from 'moment';
import {
  Table
} from 'semantic-ui-react';

import _ from 'lodash';

class ViewRecordsTable extends Component {
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

    const { viewRecords } = props;
    this.setState({
      data: viewRecords
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
              sorted={column === 'reference_number' ? direction : null}
              onClick={this.handleSort.bind(this, 'reference_number')}
            >
              Reference Number
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'date_time' ? direction : null}
              onClick={this.handleSort.bind(this, 'date_time')}
            >
              Date and Time Added
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'created_by' ? direction : null}
              onClick={this.handleSort.bind(this, 'created_by')}
            >
              Added by
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
                    <a href={`view-records/${item.id}`}>{item.reference_number}</a>
                  </Table.Cell>
                  <Table.Cell>
                    {moment(item.date_time).format('YYYY-MMM-DD HH:mm A')}
                  </Table.Cell>
                  <Table.Cell>
                    {item.created_by}
                  </Table.Cell>
                  <Table.Cell>
                    {item.total_cost}
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

export default ViewRecordsTable;
