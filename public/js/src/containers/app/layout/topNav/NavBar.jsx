import React, { Component } from 'react';
import { Link } from 'react-router';

import SearchField from '../../../../components/navigation/SearchField';
 let NavBar = React.createClass  ({

  getInitialState: function() {
    return {isDropSubmenuOpened: false};
  },

  render: function() {
    const login = this.props.login;
    return (
      <div>

        <nav id="navbar">
          <div className="header-boards">

            <Link className="header-btn" to="boardslist">
              <span className="header-btn-text">
                Boards
              </span>
            </Link>

            <SearchField
              showSearchOverlay  = { this.props.showSearchOverlay }
              hideSearchOverlay  = { this.props.hideSearchOverlay }
              handleOverlayInput = { this.props.handleOverlayInput }
              isActive = { this.props.isActive }
              toggleActivity = { this.props.toggleActivity }
              queryString = { this.props.queryString }
            />

          </div>

          <Link to="/" className="header-logo">
            <img src="https://d78fikflryjgj.cloudfront.net/images/50b4ebc64391dc394a38e73aed57f0e2/header-logo.png" />
          </Link>

          <div onClick = { this.showDropdown } className="header-user header-btn">
            <span className="member">
              <span className="header-btn-text user-name">User "{ login }" User</span>
            </span>
          </div>

        </nav>
        <div
          className = "user-name-dropdown"
          style = { this.state.isDropSubmenuOpened ? { display: 'block' } : { display: 'none' } }
        >
          <div className = "user-name-dropdown-header">
            <span className = "user-name-dropdown-header-title">User "user" User</span>
          </div>

          <div className = "user-name-dropdown-content">
            <div>
              <ul type="none">
                <li>
                  <a href="logout" className = "user-name-dropdown-content-item">Logout</a>
                </li>
              </ul>
            </div>
          </div>

        </div>

      </div>
    )
  },

  showDropdown: function(event) {
    this.setState(
      {
        isDropSubmenuOpened: !this.state.isDropSubmenuOpened
      }
    );
  }


});

export default NavBar;
