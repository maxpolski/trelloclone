import React, { Component } from 'react';

export default class SearchField extends Component {
  constructor(props) {
    super(props);
    // this.state = {isActive: false}
  }

  render() {
    if(!this.props.isActive) {
      return (
        <span>
          <input
            onClick = {this.toggleState.bind(this)}
            className = "search"
            type = "text"
            value = { this.props.queryString }
          />
          <img className = "search-image" src = "assets/images/search.png" />
        </span>
      );
    } else {
      return (
        <span>
          <input
            ref = "searchInput"
            onKeyUp = { this.handleOverlayInput.bind(this) }
            onChange = { this.handleChanging.bind(this) }
            className = "search-active"
            value = { this.props.queryString }
            type = "text"
          />
          <img
            onClick = { this.toggleState.bind(this) }
            className = "search-image"
            src = "assets/images/delete.png"
          />
        </span>
      )
    }
  }

  handleChanging(evt) {
    evt.persist();
    let value = evt.target.value;
    this.props.handleOverlayInput(value);
  }

  handleOverlayInput(evt) {
    // evt.persist();
    // let value = evt.target.value;
    // this.props.handleOverlayInput(value);
  }

  toggleState() {
    let status = this.props.isActive;
    this.props.toggleActivity();

    if(!status) {
      this.props.showSearchOverlay();
    } else {
      this.refs.searchInput.value = "";
      this.props.handleOverlayInput("");
      this.props.hideSearchOverlay();
    }
  }
}
