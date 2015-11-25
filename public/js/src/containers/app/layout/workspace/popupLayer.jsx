import React, { Component } from 'react';
import PopupHolder from '../../../../components/popups/PopupHolder';

export default class PopupLayer extends Component {
  render() {

    let style = {
      width: "200px",
      height: "400px",
      background: "white",
      position: "absolute",
      left: this.props.xPosition,
      top:  this.props.yPosition + 30
    }

    if(this.props.isDisplaying) {
      return (
        <div
          className = "popup-layer"
          onClick = { this.hidePopup.bind(this) }
        >
          <PopupHolder
            type       = { this.props.currentPopup }
            xPosition  = { this.props.xPosition }
            yPosition  = { this.props.yPosition }
            editBoard  = { this.props.editBoard }
            deleteList = { this.props.deleteList.bind(this) }
            editTask   = { this.props.editTask.bind(this) }
            deleteTask = { this.props.deleteTask }
            hidePopup  = { this.props.hidePopup.bind(this) }
            payload    = { this.props.payload }
            getExtendedData = { this.props.getExtendedData }
            addDescription  = { this.props.addDescription }
          />
        </div>
      )
    }

    return <div></div>

  }

  hidePopup(evt) {
    evt.persist();
    let targetClasses = evt.target.classList;
    let targetClassesArray = [];

    for(let i = 0; i < targetClasses.length; i++) {
      targetClassesArray.push(targetClasses[i]);
    }

    if(targetClassesArray.indexOf("popup-layer") != -1) {
      this.props.hidePopup();
    }
  }
}
