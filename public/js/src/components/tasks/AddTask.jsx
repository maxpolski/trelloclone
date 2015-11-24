import React, { Component } from 'react';

let AddTask = React.createClass({

  getInitialState: function() {
    return {isEditing: false}
  },

  render: function() {
    return (
      <div>
        <a
          style = { this.state.isEditing ? {display: 'none'} : {} }
          className="open-card-composer"
          onClick = { this.onAddTask }
        >
          Add a card...
        </a>
        <div
          style = { this.state.isEditing ? {} : {display: 'none'} }
          className="card-composer"
        >
          <div className="list-card">
            <div className="list-card-details">
              <textarea
                className="list-card-composer-textarea"
                onKeyDown = { this.addTaskConfirm }
                id = "newCardName"
              >
              </textarea>
            </div>
          </div>
          <div
            className="card-composer-controls">

            <input
              onClick = { this.onAddClick }
              className="create-btn"
              type="submit"
              value="Add"
            />

            <a onClick = { this.onCloseAdding } className="icon-close">
              <img src="assets/images/close-icon.png" />
            </a>
          </div>
        </div>
      </div>
    );
  },

  addTaskConfirm: function(event) {
    event.persist();
    if(event.keyCode == 13) {
      let value = event.target.value;
      if(value.length != '') {
        this.props.addTask(this.props.boardId, this.props.id, value);
        event.target.value = '';
        this.setState({isEditing: false});
      }
    }
  },

  onAddClick: function() {
    let val = document.getElementById('newCardName').value;
    if(val != '') {
      this.props.addTask(this.props.boardId, this.props.id, val);
      this.setState({isEditing: false});
      document.getElementById('newCardName').value = '';
    }
  },

  onAddTask: function() {
    this.setState({isEditing: true});
  },

  onCloseAdding: function() {
    this.setState({isEditing: false})
  }
});

export default AddTask;
