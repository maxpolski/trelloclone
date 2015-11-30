import React, { Component } from 'react';

export default class CardChecklistItem extends Component {
  render() {

    let itemNameStyle = this.props.isCompleted ? {
        color: '#8c8c8c',
        fontStyle: 'italic',
        textDecoration: 'line-through'
      }
    :
      {};

    return (
      <div
        className = "checklist-item-holder"
      >
        <div className = "checklist-item">
          <div>
            <span
              className = "checkbox-item"
              onClick = { this.toggleTaskStatus.bind(this) }
            >
              <img
                src = "assets/images/accept.png"
                style = { this.props.isCompleted ? {display: 'block'} : {} }
              />
            </span>
            <div>
              <p style = {itemNameStyle}>{ this.props.name }</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  toggleTaskStatus(evt) {
    this.props.toggleTaskStatus(this.props.id, this.props.checklistId);
  }

}
