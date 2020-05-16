import React, { Component } from 'react';
import { Button } from 'reactstrap';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import Main from './Main';


class Full extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  handleToggler() {
    if (document.getElementsByClassName('sidebar-view').length > 0) {
      document.body.classList.remove('sidebar-view');
    } else {
      document.body.classList.add('sidebar-view');
    }
  }

  render() {
    const {
      props
    } = this;
    return (
      <div className="site">
        <Header {...props} />
        <div className="toggler">
          <Button
            type="button"
            color="light"
            onClick={this.handleToggler.bind(this)}
          >
            <i className="fa fa-bars" />
          </Button>
        </div>
        <div className="site-body">
          <Sidebar {...props} />
          <Main {...props} />
        </div>
        <Footer {...props} />
      </div>
    );
  }
}

export default Full;
