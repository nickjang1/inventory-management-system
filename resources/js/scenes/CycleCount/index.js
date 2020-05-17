import React, {
  Component
} from 'react';
import { Button } from 'reactstrap';
import CycleCountTable from '../../components/CycleCountTable';
// import { CYCLECOUNTS } from '../../config/data';
import Api from '../../apis/app';

class CycleCount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cycleCounts: []
    };
  }

  async componentDidMount() {
    const { response, body } = await Api.get('cycles');
    switch (response.status) {
      case 200:
        this.setState({
          cycleCounts: body.cycles
        });
        break;
      default:
        break;
    }
  }

  async handleCheck(value, item, index) {
    const { cycleCounts } = this.state;
    const { response } = await Api.put(`cycle/${value.id}`, value);
    switch (response.status) {
      case 200:
        cycleCounts[index] = value;
        cycleCounts[index].item = item;
        this.setState({
          cycleCounts
        });
        break;
      default:
        break;
    }
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
