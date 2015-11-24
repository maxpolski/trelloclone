import React, { Component } from 'react';
import { Link } from 'react-router';

export default class SearchResult extends Component {
  render() {

    let linkUrl = 'board/' + this.props.id;

    return(
      <div className = "search-result-board">
        <Link
          to = { linkUrl }
          onClick = { this.hideSearchItems.bind(this) }
          className = "search-result-board-container"
        >
          <span className = "search-result-board-marker" />
          <span className = "search-result-board-content-container">
            <span className = "search-result-board-content">
              { this.props.name }
            </span>
          </span>
        </Link>
      </div>
    )
  }

  hideSearchItems() {
    this.props.hideSearchOverlay();
    this.props.hideSearchField();
  }
}
