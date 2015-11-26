import React, { Component } from 'react';

import CardDescription from './cardDetails/cardDescription';
import CardComments from './cardDetails/cardComments';
import ChecklistCreatePopup from './childPopups/ChecklistCreatePopup';

export default class CardDetailsPopup extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isEditingDescription: false,
      commentText: "",
      cardDescription: this.props.payload.description,
      isChecklistPopup: false,
      checklistPopup: {},
      newChecklistName: ""
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
                      comments = { this.props.payload.comments }
                    />

                  </div>
                </div>
                <div className = "sidebar">
                  <div className = "add-block">
                    <h3>
                      Add
                    </h3>
                    <div>
                      <a
                        className = "add-block-item"
                        onClick = { this.showAddCheklistPopup.bind(this) }
                        ref = { ref => this.checkListItem = ref }
                      >
                        Checklist
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <ChecklistCreatePopup
                data = { this.state.checklistPopup }
                isShown = { this.state.isChecklistPopup }
                hideAddChecklistPopup = { this.hideAddChecklistPopup.bind(this) }
                handleChecklistNameInput = { this.handleChecklistNameInput.bind(this) }
                addChecklist = { this.addChecklist.bind(this) }
                newChecklistName = { this.state.newChecklistName }
              />
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
    }
  }

  showAddCheklistPopup(evt) {
    evt.persist()
    let item = this.checkListItem;
    let data = {
      positionX: item.getBoundingClientRect().left,
      positionY: item.getBoundingClientRect().top,
      boardId: this.props.payload.boardId,
      listId: this.props.payload.listId,
      cardId: this.props.payload.cardId
    }

    this.setState({isChecklistPopup: true, checklistPopup: data});
  }

  hideAddChecklistPopup(evt) {
    this.setState(
      {
        isChecklistPopup: false,
        checklistPopup: {},
        newChecklistName: ""
      }
    );
  }

  handleChecklistNameInput(evt) {
    evt.persist();
    this.setState({newChecklistName: evt.target.value});
  }

  addChecklist(evt) {
    if(this.state.newChecklistName !== "") {

      let checklistName = this.state.newChecklistName;

      let data = {
        boardId: this.props.payload.boardId,
        listId: this.props.payload.listId,
        cardId: this.props.payload.cardId,
        checklistName: checklistName
      }
      
      this.props.addChecklist(data);
    }
  }
}
