import React, {
  Component
} from 'react';

import Bitmaps from '../theme/Bitmaps';

class Auth extends Component {
  render() {
    const {
      form, header
    } = this.props;

    return (
      <div className="site-intro">
        <div className="site-intro-box">
          <div style={{
            backgroundImage: `url('${Bitmaps.intro}')`, height: '300px', backgroundPosition: 'center', backgroundSize: 'cover'
          }} />
          <div className="intro-box-content">
            {form}
          </div>
          <div className="intro-box-footer">
            <span>Inventory Management System, Copyright ©2020</span>
          </div>
        </div>
        <div className="site-intro-content">
          <div className="intro-header">
            {header}
          </div>
          <div className="intro-footer">
            <span />
          </div>
        </div>
      </div>
    );
  }
}

export default Auth;
