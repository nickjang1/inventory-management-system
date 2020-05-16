import React, {
  Component
} from 'react';

import ViewRecordsTable from '../../components/ViewRecordsTable';
import { VIEWRECORDS } from '../../config/data';

class ViewRecords extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewRecords: VIEWRECORDS
    };
  }

  render() {
    const {
      viewRecords
    } = this.state;
    return (
      <div className="main-page">
        <div className="page-header">
          <div className="page-title">View Records</div>
        </div>
        <div className="table-responsive">
          <ViewRecordsTable
            viewRecords={viewRecords}
          />
        </div>
      </div>
    );
  }
}

export default ViewRecords;
