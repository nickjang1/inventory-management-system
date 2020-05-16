import React, {
  Component
} from 'react';
import { Button } from 'reactstrap';
import CycleCountTable from '../../components/CycleCountTable';
import { CYCLECOUNTS } from '../../config/data';

class CycleCount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cycleCounts: CYCLECOUNTS
    };
  }

  handleCheck(value) {
    console.log(value);
  }

  handleSaveRecord() {

  }

  render() {
    const {
      cycleCounts
    } = this.state;
    return (
      <div className="main-page">
        <div className="page-header">
          <div className="page-title">Daily Cycle Count</div>
        </div>
        <div className="table-responsive">
          <CycleCountTable
            cycleCounts={cycleCounts}
            onCheck={this.handleCheck.bind(this)}
          />
        </div>
        <div className="d-flex justify-content-end mt-4">
          <Button
            type="button"
            color="secondary"
            onClick={this.handleSaveRecord.bind(this)}
          >
            Save Record...
          </Button>
        </div>
      </div>
    );
  }
}

export default CycleCount;
