import React, { Component } from 'react';

export default class CPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
                   editValue: this.props.payload.title,
                   isEditing: false
                 };
  }

  render() {
    return (
        <div className = "popup-panel"
          style = {
            {
              left: this.props.xPosition,
              top:  this.props.yPosition,
              backgroundColor: 'rgba(0,0,0, 0)',
              border: '0',
              boxShadow: 'none',
              height: '200px'
            }
          }
        >
          <div
            style = {{width: this.props.payload.elementWidth}}
            className = "popup-panel-card-editor"
          >
            <div className = "edit-zone">
              <div className = "textarea-container">
                <textarea
                  ref = "newCardText"
                  value = { this.state.editValue }
                  onKeyDown = { this.confirmEditing.bind(this) }
                  onChange  = { this.changeValue.bind(this) }
                />
              </div>
            </div>
            <input
              className = "save-edited-value"
              type = "submit"
              value = "Save"
              onClick = { this.confirmEditingByClick.bind(this) }
            />
          </div>
          <div className = "card-quick-edit-tools">
            <a onClick = { this.deleteCard.bind(this) } className = "card-quick-edit-tools-button">
              <span>Delete</span>
            </a>
          </div>
        </div>
    )
  }

  deleteCard() {
    this.props.deleteCard(this.props.payload.boardId, this.props.payload.listId, this.props.payload.taskId);
    this.props.hidePopup();
  }

  changeValue(event) {
    console.log('changing');
    event.persist();
    this.setState({editValue: event.target.value});
  }

  confirmEditing(event) {
    event.persist();

    if(event.keyCode == 13) {
      var value = event.target.value;
      if(value.length != '') {
        console.log('pr', this.props);
        this.props.editTask(this.props.payload.boardId, this.props.payload.listId, this.props.payload.cardId, value);
        this.props.hidePopup();
      }
    } else if(event.keyCode == 27) {
      this.props.hidePopup();
    }
  }

  confirmEditingByClick(evt) {
    evt.persist();
    let value = this.refs.newCardText.value;
    if(value.length != '') {
      console.log('pr', this.props);
      this.props.editTask(this.props.payload.boardId, this.props.payload.listId, this.props.payload.cardId, value);
      this.props.hidePopup();
    }
    console.log(newText.value);

  }
}
