/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { Component } from 'react';
import Bitmaps from '../../theme/Bitmaps';

class Header extends Component {
  render() {
    return (
      <div className="site-header">
        <div className="banner left-banner" />
        <img src={Bitmaps.header} alt="header image" />
        <div className="banner right-banner" />
      </div>
    );
  }
}

export default Header;
