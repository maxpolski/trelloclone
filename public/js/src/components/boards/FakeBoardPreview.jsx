import React, { findDOMNode, Component } from 'react';
import { Link } from 'react-router';

import AddBoard from './AddBoard';

let FakeBoard = React.createClass({

  getInitialState() {
    return({isAddingPaneOpen: false});
  },

  render: function() {

    return (
           <div className="fake-board-preview-container">
            <div
              onClick = { this.openAddingPane }
              style = { this.state.isAddingPaneOpen ? {display: 'none'} : {}}>
              <a>Create new board...</a>
            </div>
            <AddBoard
              isOpened = { this.state.isAddingPaneOpen }
              closeAddingPane = { this.closeAddingPane }
              addBoardConfirm = { this.addBoardConfirm }
            />
           </div>

         )
  },

  openAddingPane(event) {
    this.setState({isAddingPaneOpen: true});
  },

  closeAddingPane: function(event) {
    this.setState({isAddingPaneOpen: false})
  },

  addBoard: function(event) {
    this.setState({isAdding: true});
  },

  addBoardConfirm: function(event) {
    event.persist();
    if(event.keyCode == 13) {
      var value = event.target.value;
      if(value.length != '') {
        this.props.addBoard(value);
        event.target.value = '';
        this.setState({isAdding: false});
      }
    }
  }
})

export default FakeBoard;
