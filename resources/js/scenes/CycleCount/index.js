import React, {
  Component
} from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from 'reactstrap';
import CycleCountTable from '../../components/CycleCountTable';
// import { CYCLECOUNTS } from '../../config/data';
import Api from '../../apis/app';
import GeneralModal from '../../components/GeneralModal';


class CycleCount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cycleCounts: [],
      isOpenSuccessModal: false
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

  async handleSaveRecord() {
    const { cycleCounts } = this.state;
    let total_cost = 0;
    for (let i = 0; i < cycleCounts.length; i++) {
      const cycle = cycleCounts[i];
      total_cost += cycle.total_cost;
    }
    const newData = {
      total_cost
    };
    const { response, body } = await Api.post('record', newData);
    switch (response.status) {
      case 200:
        this.setState({
          isOpenSuccessModal: true,
          modalContent: {
            status: 'Success',
            content: 'The cycle count record has been added successfully.',
            action: `Reference: ${body.number}`
          }
        });
        break;
      default:
        break;
    }
  }

  handleCancel() {
    this.setState({
      isOpenSuccessModal: false
    });
    this.props.history.push('view-records');
  }

  render() {
    const {
      cycleCounts,
      isOpenSuccessModal,
      modalContent
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
        {
          isOpenSuccessModal && (
            <GeneralModal
              status={modalContent.status}
              content={modalContent.content}
              action={modalContent.action}
              handleCancel={this.handleCancel.bind(this)}
            />
          )
        }
      </div>
    );
  }
}

export default withRouter(CycleCount);
