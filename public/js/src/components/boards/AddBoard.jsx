import React, { findDOMNode, Component } from 'react';

let AddBoard = React.createClass({

  render: function() {

    return <div style = { this.props.isOpened ? {} : {display: 'none'} } className="add-board-container">
            <span className="add-board-title">
              Create Board
            </span>
            <span onClick = { this.props.closeAddingPane }><img className="close-btn" src="assets/images/close-icon.png" /></span>
            <div className="add-board-content">
              <div>
                <div>
                  <label htmlFor="newBoardName">Title</label>
                  <input
                    onKeyDown = { this.props.addBoardConfirm }
                    placeholder="Like some stuff.."
                    type="text"
                    className="add-board-input"
                    id="newBoardName"
                    onKeyUp = { this.addBoardConfirm }
                  />
                  <input onClick = { this.confirmAdding } type="submit" className="create-btn" value="Create" />
                </div>
              </div>
            </div>
           </div>
  },

  confirmAdding: function() {
    let inp = document.getElementById('newBoardName');
    if(inp.length > 0) {
      this.props.addBoardConfirm({keyCode: 13, value: inp.value});
    }
  }
});

export default AddBoard;
