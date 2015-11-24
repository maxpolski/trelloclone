import React, { findDOMNode, Component } from 'react';
import { Link } from 'react-router';

let Board = React.createClass({
  getInitialState: function() {
    return ({
      isEditing: false,
      editingText: ''
    });
  },

  render: function() {

    const board = this.props.board;
    const linkUrl = "board/" + board._id;

    return <Link to={ linkUrl } className="board-preview-container">
            <span
              style = { this.state.isEditing ? {display: 'none'} : {} }
              className="board-name"
            >
              {board.name}
            </span>
            <span
              style = { this.state.isEditing ? {display: 'none'} : {} }
              onClick = { this.editBoard }
              className="glyphicon glyphicon-pencil edit-board-preview"
            >
            </span>
            <span
              className = "glyphicon glyphicon-remove delete-board-preview"
              onClick   = { this.deleteBoard }
            >
            </span>
            <input
              className = "edit-board-preview-input"
              style = { this.state.isEditing ? {} : {display: 'none'} }
              onChange = { this.changeEditing }
              onKeyDown = { this.confirmEditing }
              value = { this.state.editingText }
            />
           </Link>
  },

  editBoard: function() {
    this.setState({isEditing: true, editingText: this.props.board.name});
  },

  confirmEditing: function(event) {
    event.persist();
    if(event.keyCode == 13) {
      var value = event.target.value;
      if(value.length != '') {
        this.props.editBoard(this.props.board._id, value);
        this.setState({isEditing: false});
      }
    } else if(event.keyCode == 27) {
      this.setState({isEditing: false, editingText: ''});
    }
  },

  changeEditing: function(event) {
    event.persist();
    this.setState({editingText: event.target.value});
  },

  deleteBoard: function(event) {
    this.props.deleteBoard(this.props.board._id);
  }
})

export default Board;
