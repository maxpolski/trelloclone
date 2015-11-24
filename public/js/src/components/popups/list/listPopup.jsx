import React, { Component } from 'react';

export default class ListPopup extends Component {
  render() {
    return (

        <div className = "popup-panel"
          style = {
            {
              left: this.props.xPosition,
              top:  this.props.yPosition + 30
            }
          }
        >
          <div
            className = "popup-panel-header"
          >
            <span className = "popup-panel-header-title">List Actions</span>
          </div>
          <div className = "popup-panel-content">
            <div>
              <ul className = "popup-panel-content-list" type="none">
                <li>
                  <a
                    onClick = { this.deleteList.bind(this) }
                  >
                    Delete this list
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

    )
  }

  deleteList() {
    this.props.deleteList(this.props.payload.boardId, this.props.payload.listId);
    this.props.hidePopup();
  }
}
