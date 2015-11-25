import React, { Component } from 'react';

import CardDescription from './cardDetails/cardDescription';
import CardComments from './cardDetails/cardComments';

export default class CardDetailsPopup extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isEditingDescription: false,
      commentText: "",
      cardDescription: this.props.payload.description
    };
  }

  render() {
    let isEditingDescription = this.state.isEditingDescription;

    return (
            <div
              className="card-details-window"
            >
              <div className = "card-details-window-wrapper">
                <div className = "card-details-window-content">
                  <div className = "card-details-window-content-header">
                    <span className = "icon-header">
                    </span>
                    <div className = "card-details-window-content-title">
                      <h2>
                        { this.props.payload.taskName }
                      </h2>

                      <div className = "card-details-window-current-list">
                        <p
                          className = "card-details-window-some-text"
                        >
                          in list
                        </p>
                        <a
                          className = "card-details-window-list-name"
                        >
                          { this.props.payload.listName }
                        </a>
                      </div>
                    </div>
                  </div>
                  <div
                    className = "card-details-window-main-content"
                  >

                    <CardDescription
                      isEditingDescription = { isEditingDescription }
                      toggleEditingDescriptionState = { this.toggleEditingDescriptionState.bind(this) }
                      saveDescription = { this.saveDescription.bind(this) }
                      cardDescrition = { this.state.cardDescription }
                      handleDescriptionInput = { this.handleDescriptionInput.bind(this) }
                      cardDescription = { this.state.cardDescription }
                    />

                    <CardComments
                      commentText = { this.state.commentText }
                      handleCommentInput = { this.handleCommentInput.bind(this) }
                      saveComment = { this.saveComment.bind(this) }
                    />

                  </div>
                </div>
              </div>
            </div>
           );
  }

  toggleEditingDescriptionState() {
    this.setState({isEditingDescription: !this.state.isEditingDescription});
  }

  handleDescriptionInput(evt) {
    evt.persist();
    this.setState({cardDescription: evt.target.value});
  }

  saveDescription() {
    this.props.addDescription(
      {
        boardId: this.props.payload.boardId,
        listId: this.props.payload.listId,
        taskId: this.props.payload.cardId,
        text: this.state.cardDescription
      }
    );
    this.toggleEditingDescriptionState();
  }

  handleCommentInput(evt) {
    evt.persist();
    this.setState({commentText: evt.target.value});
  }

  saveComment(evt) {
    if(this.state.commentText !== "") {
      this.props.saveComment({
          boardId: this.props.payload.boardId,
          listId:  this.props.payload.listId,
          taskId:  this.props.payload.cardId,
          comment: this.state.commentText
        }
      );
      console.log('saveComment');
    }
  }
}
