import React, { Component } from 'react';

export default class ChecklistCreatePopup extends Component {
  render() {
    return (
      <div
        className = "add-checklist-popup"
        style = { { display: this.props.isShown ? 'block' : 'none' } }
      >
        <div className = "add-checklist-popup-header">
          <span className = "add-checklist-popup-title">
            Add Checklist
          </span>
          <a
            className = "add-checklist-popup-close"
            onClick = { this.props.hideAddChecklistPopup }
          >
            <img src = "assets/images/delete.png" />
          </a>
        </div>
        <div className = "add-checklist-popup-body">
          <div>
            <div>
              <label>
                Title
              </label>
              <input
                className = "checklist-name"
                placeholder = "Checklist Name..."
                type = "text"
                onChange = { this.props.handleChecklistNameInput }
                value = { this.props.newChecklistName }
              />
              <input
                className = "add-checklist-btn"
                value = "Add"
                type = "submit"
                onClick = { this.props.addChecklist }
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
