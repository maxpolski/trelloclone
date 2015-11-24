import React, { Component } from 'react';

export default class BoardPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
                   editValue: this.props.payload.title,
                   isEditing: false
                 };
  }

  render() {
    return (
             <div
               className = "popup-panel"
               style = {
                 {
                   left: this.props.xPosition,
                   top:  this.props.yPosition + 40,
                   backgroundColor: 'rgba(0,0,0, 0)',
                   border: '0',
                   boxShadow: 'none',
                   height: '200px'
                 }
               }
             >
              <div
                className = "board-popup"
              >
                <div
                  className = "board-popup-header"
                >
                  <span
                    className = "board-popup-header-title"
                  >
                    Rename Board
                  </span>
                </div>
                <div className = "board-popup-content">
                  <div>
                    <form>
                      <label className = "board-name-label">Name</label>
                      <input
                        className = "board-name-input"
                        type = "text"
                        onChange = { this.handleChange.bind(this) }
                        value = { this.state.editValue }
                      />
                      <input
                        className = "board-name-submit"
                        type = "submit"
                        onClick = { this.onConfirm.bind(this) }
                        value = "Rename"
                      />
                    </form>
                  </div>
                </div>
              </div>
             </div>
           )
  }

  handleChange(evt) {
    evt.persist();
    let value = evt.target.value;
    this.setState({editValue: value});
  }

  onConfirm(evt) {
    console.log('this', this);
    evt.preventDefault();
    this.props.editBoard(this.props.payload.boardId, this.state.editValue);
    this.props.hidePopup();
  }
}
