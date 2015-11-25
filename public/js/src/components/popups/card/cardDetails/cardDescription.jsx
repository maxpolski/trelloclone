import React, { Component } from 'react';

export default class CardDescription extends Component {
  render() {
    return (

      <div
        className = "card-details-window-card-description"
      >
        <p
          className = "card-details-window-card-description-header"
          style = { this.props.isEditingDescription ? {display: "none"} : {} }
          onClick = { this.props.toggleEditingDescriptionState }
        >
          <a
            className = "card-details-window-card-description-header-title"
          >
            <img src = "assets/images/menu.png" alt="" />
            Edit the description...
          </a>
        </p>
        <div
          style = { this.props.isEditingDescription ? {display: "none"} : {} }
        >
          { this.props.cardDescription }
        </div>
        <div
          className = "card-details-window-edit-description"
          style = {this.props.isEditingDescription ? {} : {display: 'none'} }
        >
          <textarea
            value = { this.props.cardDescription }
            onChange = { this.props.handleDescriptionInput }
          />
          <div
            className = "card-details-window-edit-controls"
          >
            <input
              className = "save-button"
              type = "submit"
              value = "Save"
              onClick = { this.props.saveDescription }
            />
            <img
              onClick = { this.props.toggleEditingDescriptionState}
              src = "assets/images/delete.png"
            />
          </div>
        </div>
      </div>
    )
  }
}
