import React, { Component } from 'react';

export default class CardComments extends Component {
  render() {
    let commentText = this.props.commentText;
    return (
      <div className = "card-details-window-comments">
        <div className = "card-details-window-comments-header">
          <h3>Add comment</h3>
        </div>
        <div
          className = "card-details-window-comment-new-comment"
        >
          <div className = "member">

            <span className = "member-initials">
              UU
            </span>

          </div>
          <textarea
            className = "new-comment-text"
            placeholder = "Write a comment..."
            value = { commentText }
            onChange = { this.props.handleCommentInput }
          />
        </div>
        <div className = "add-comment-control">
          <input
            style = { commentText === "" ? {background: "grey", cursor: "default"} : {} }
            className = "save-comment"
            type="submit"
            value = "Save Comment"
            onClick = { this.props.saveComment }
          />
        </div>
      </div>
    )
  }
}
