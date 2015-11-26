import React, { Component } from 'react';

import CardComment from './cardComment';

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

        <div
          className = "card-details-window-comments-section"
          style = { this.props.comments.length > 0 ? {display: 'block'} : {display: 'none'} }
        >
          <div className = "card-details-window-comments-section-header">
            <span></span>
            <h3
              className = "card-details-window-comments-section-header-title"
            >
              Comments
            </h3>
          </div>
          <div className = "card-details-window-comments-section-body">
            { this.props.comments.map((comment, index) => {
                  return (
                    <CardComment
                      text = { comment.text }
                      key  = { comment.id }
                    />
                  )
                }
              )
            }
          </div>

        </div>

      </div>
    )
  }
}
