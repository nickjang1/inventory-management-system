import React, { Component } from 'react';
import {
  NavLink as Link
} from 'react-router-dom';
import {
  NavbarBrand, NavLink, Nav, Navbar, NavItem
} from 'reactstrap';
import Bitmaps from '../../theme/Bitmaps';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.toggleClose = this.toggleClose.bind(this);
    this.toggleOpen = this.toggleOpen.bind(this);
  }

  toggleClose() {
    document.body.classList.remove('sidebar-view');
  }

  toggleOpen() {
    const { isOpen } = this.state;
    this.setState({
      isOpen: !isOpen
    });
  }

  render() {
    return (
      <div className="site-sidebar">
        <div className="brand-logo">
          <NavbarBrand tag={Link} to="/">
            <img src={Bitmaps.logo} alt="brand logo" />
          </NavbarBrand>
        </div>
        <Nav>
          <div className="navbar-item">
            >> Setup
          </div>
        </Nav>
        <Nav className="main-menu">
          <Navbar>
            <NavItem onClick={this.toggleClose}>
              <NavLink tag={Link} to="/vendor" exact>
                Vendor Setup
              </NavLink>
            </NavItem>
            <NavItem onClick={this.toggleClose}>
              <NavLink tag={Link} to="/item" exact>
                Item Setup
              </NavLink>
            </NavItem>
            <NavItem onClick={this.toggleClose}>
              <NavLink tag={Link} to="/store" exact>
                Store Setup
              </NavLink>
            </NavItem>
            <NavItem onClick={this.toggleClose}>
              <NavLink tag={Link} to="/users" exact>
                User Maintenance
              </NavLink>
            </NavItem>
            <NavItem onClick={this.toggleClose}>
              <NavLink tag={Link} to="/standard-costing" exact>
                Standard Costing
              </NavLink>
            </NavItem>
          </Navbar>
        </Nav>
        <Nav>
          <div className="navbar-item">
            >> Cycle Counting
          </div>
        </Nav>
        <Nav className="main-menu">
          <Navbar>
            <NavItem onClick={this.toggleClose}>
              <NavLink tag={Link} to="/">
                Daily Cycle Count
              </NavLink>
            </NavItem>
            <NavItem onClick={this.toggleClose}>
              <NavLink tag={Link} to="/view-records">
                View Records
              </NavLink>
            </NavItem>
          </Navbar>
        </Nav>
        <Nav>
          <div className="navbar-item">
            >> Store Ordering
          </div>
        </Nav>
        <Nav className="main-menu">
          <Navbar>
            <NavItem onClick={this.toggleClose}>
              <NavLink tag={Link} to="/create-order">
                Create Order
              </NavLink>
            </NavItem>
            <NavItem onClick={this.toggleClose}>
              <NavLink tag={Link} to="/approved-order">
                Approved Order
              </NavLink>
            </NavItem>
          </Navbar>
        </Nav>
        <Nav>
          <div className="navbar-item">
            >> DC Ordering
          </div>
        </Nav>
        <Nav className="main-menu">
          <Navbar>
            <NavItem onClick={this.toggleClose}>
              <NavLink tag={Link} to="/assign-vendors">
                Assign Vendors
              </NavLink>
            </NavItem>
            {/* <NavItem>
              <NavLink tag={Link} to="/create-po">
                Create PO
              </NavLink>
            </NavItem> */}
            <NavItem onClick={this.toggleClose}>
              <NavLink tag={Link} to="/create-purchase-order">
                Create Purchase Order
              </NavLink>
            </NavItem>
            <NavItem onClick={this.toggleClose}>
              <NavLink tag={Link} to="/approved-purchase-order">
                Approved Purchase Order
              </NavLink>
            </NavItem>
          </Navbar>
        </Nav>
        <Nav>
          <div className="navbar-item">
            >> Receiving & Dispatch
          </div>
        </Nav>
        <Nav className="main-menu">
          <Navbar>
            <NavItem onClick={this.toggleClose}>
              <NavLink tag={Link} to="/receive-order">
                Receive Order
              </NavLink>
            </NavItem>
            <NavItem onClick={this.toggleClose}>
              <NavLink tag={Link} to="/dispatch-stores">
                Dispatch to Stores
              </NavLink>
            </NavItem>
          </Navbar>
        </Nav>
      </div>
    );
  }
}

export default Sidebar;
