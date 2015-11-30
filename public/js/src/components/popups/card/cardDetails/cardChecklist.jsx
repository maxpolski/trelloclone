import React, { Component } from 'react';

import CardChecklistItem from './cardChecklistItem';

export default class CardChecklist extends Component {

  constructor(props) {
    super(props);
    this.state = { addingItemValue: "" }
  }

  render() {

    let numCompletedTasks = 0;
    let numTasks = this.props.tasks.length;

    for(let i = 0; i < numTasks; i++) {
      if(this.props.tasks[i].isCompleted) {
        numCompletedTasks++;
      }
    }

    let ratio = 0;

    if(numTasks > 0) {
      ratio = Math.floor((numCompletedTasks / numTasks).toFixed(3) * 100);
    }

    let progressBarStyle = {
      backgroundColor: ratio === 100 ? "green" : "",
      width: ratio + "%"
    }

    return (
      <div
        className = "card-details-window-checklist"
      >
        <div className = "card-details-window-checklist-header">
          <div
            className = "card-details-window-checklist-header-title"
          >
            <h3>
              { this.props.name }
            </h3>
            <div
              className = "card-details-window-checklist-header-delete"
            >
              <a
                onClick = { this.handleDeleting.bind(this) }
              >
                Delete
              </a>
            </div>
          </div>

          <div className = "card-details-window-checklist-propgress">
            <span className = "procents">
              { ratio }%
            </span>
            <div
              className = "progress-holder"
            >
              <div style = { progressBarStyle } className = "progress-completed" />
            </div>
          </div>
        </div>
        <div
          className = "card-details-window-checklist-items-list"
        >
          { this.props.tasks.map((task, index) => {
                return (
                  <CardChecklistItem
                    id = { task.id }
                    key = { task.id }
                    checklistId = { this.props.id }
                    name = { task.name }
                    isCompleted = { task.isCompleted }
                    toggleTaskStatus = { this.props.toggleTaskStatus }
                  />
                )
              }
            )
          }
          <div className = "card-details-window-checklist-items-add">
            <input
              type = "text"
              placeholder = "Add an item..."
              value = { this.state.addingItemValue }
              onChange = { this.handleEditingItem.bind(this) }
              onKeyDown = { this.handleAddingItem.bind(this) }
            />
          </div>
        </div>
      </div>
    );
  }

  handleEditingItem(evt) {
    evt.persist();
    this.setState({addingItemValue: evt.target.value});
  }

  handleAddingItem(evt) {
    evt.persist();
    if(evt.keyCode === 13 && this.state.addingItemValue !== "") {
      console.log('props', this.props);
      this.props.addChecklistItem(this.props.id, this.state.addingItemValue);
      this.setState( {addingItemValue: ""} );
      evt.target.blur();
    }
  }

  handleDeleting(evt) {
    this.props.deleteChecklist(this.props.id);
  }
}
