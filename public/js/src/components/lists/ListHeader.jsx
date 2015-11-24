import React, { Component } from 'react';

export default class ListHeader extends Component {

  constructor(props) {
    super(props);
    this.state = { newName: props.name };
  }

  render() {
    if( !this.props.isNameEditing ) {
      return (
        <div className="list-header">

          <h2
            onClick = { this.props.editListName }
            className="list-name"
          >
            { this.props.name }
          </h2>

          <img
            onClick = { this.props.listPopupShow }
            src="assets/images/dropdown.png"
          />

        </div>
      )
    } else {
      return (
        <div className = "list-header-editing">
          <div className = "textarea-container">

            <input
              className = "new-header-name"
              value = { this.state.newName }
              onChange = { this.handleChange.bind(this) }
              onKeyUp  = { this.onEnter.bind(this) }
            />

            <div className = "controls-list-header-editing">
              <input
                onClick = { this.onConfirmChange.bind(this) }
                className = "confirm-header-editing"
                type = "submit"
                value = "Save"
              />
              <a onClick = { this.props.cancelEditing } className="icon-close">
                <img src="assets/images/close-icon.png" />
              </a>
            </div>

          </div>
        </div>
      )
    }
  }

  handleChange(evt) {
    evt.persist();
    let value = evt.target.value;
    this.setState( { newName: value } );
  }

  onConfirmChange() {
    this.props.confirmEditListName(this.state.newName);
  }

  onEnter(evt) {
    evt.persist();
    if(evt.keyCode === 13) {
      evt.preventDefault();
      this.onConfirmChange();
    } else if (evt.keyCode === 27) {
      this.props.cancelEditing();
    }

  }

}
