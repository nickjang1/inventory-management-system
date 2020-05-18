import React, {
  Component
} from 'react';
import { withRouter } from 'react-router-dom';

import ViewRecordsTable from '../../components/ViewRecordsTable';
// import { VIEWRECORDS } from '../../config/data';
import Api from '../../apis/app';

class ViewRecords extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewRecords: []
    };
  }

  async componentDidMount() {
    const { response, body } = await Api.get('records');
    switch (response.status) {
      case 200:
        this.setState({
          viewRecords: body.records
        });
        break;
      default:
        break;
    }
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

export default withRouter(ViewRecords);
