import React, { Component } from 'react';

export default class CardComment extends Component {
  render() {
    return (
      <div className = "card-details-window-comments-section-body-item">
        <div></div>
        <div
          className = "card-details-window-comments-section-body-item-content"
        >
          <span className = "member-full-name">
            Some Dude
          </span>
          <div className = "comment-text">
            { this.props.text }
          </div>
        </div>

      </div>
    )
  }
}
