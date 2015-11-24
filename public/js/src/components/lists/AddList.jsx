import React, { Component } from 'react';

let AddList = React.createClass({

  getInitialState: function() {
    return {
             isAdding: false,
             addingValue: ''
           }
  },

  render: function() {
    let currentClassName = "add-new-list-container " + (this.state.isAdding ? 'mode-add' : '' );
    return (
      <div className = { currentClassName } >
        <span
          style = { this.state.isAdding ? { display: 'none' } : { display: 'block' } }
          onClick = { this.addList }
          className="add-new-list"
        >
          Add a list...
        </span>
        <input
          style = { this.state.isAdding ? { display: 'block' } : { display: 'none' } }
          type="text"
          id = "addingListName"
          onKeyUp = { this.addListConfirm }
          className = "add-new-list"
          placeholder="add new list..."
        />
        <div
          className="edit-controls"
          style ={ this.state.isAdding ? { display: "block" } : { display: "none" } }
        >
          <input
            className="create-btn"
            type="submit"
            value="Save"
            onClick = { this.onSaveClick }
          />
          <a onClick = { this.onCloseAdding } className="icon-close">
            <img src="assets/images/close-icon.png" />
          </a>
        </div>
      </div>
    );
  },

  addList: function(event) {
    this.setState({ isAdding: true });
  },

  onSaveClick: function() {
    let value = document.getElementById('addingListName').value;
    console.log(value);
    if(value.length != '') {
      this.props.addList(this.props.id, value);
    }
  },

  addListConfirm: function(event) {
    event.persist();
    if(event.keyCode == 13) {
      var value = event.target.value;
      if(value.length != '') {
        this.props.addList(this.props.id, value);
        event.target.value = '';
      }
    } else if(event.keyCode == 27) {
      this.onCloseAdding();
    }
  },

  onCloseAdding: function(event) {
    this.setState({isAdding: false});
  }
});

export default AddList;
