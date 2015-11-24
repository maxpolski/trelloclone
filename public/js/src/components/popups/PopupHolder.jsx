import React, { Component } from 'react';

import PopupTypes from '../../popupTypes';
import ListPopup  from './list/listPopup';
import CardPopup  from './card/cardPopup';
import BoardPopup from './board/boardPopup';

const {
  LIST,
  CARD,
  BOARD
} = PopupTypes;

export default class PopupHolder extends Component {
  render() {
    switch(this.props.type) {
      case LIST:
        return <ListPopup
                 deleteList = { this.props.deleteList }
                 hidePopup  = { this.props.hidePopup }
                 xPosition  = { this.props.xPosition }
                 yPosition  = { this.props.yPosition }
                 payload    = { this.props.payload }
               />
      case CARD:
        return <CardPopup
                 editTask   = { this.props.editTask }
                 deleteCard = { this.props.deleteTask }
                 hidePopup  = { this.props.hidePopup }
                 xPosition  = { this.props.xPosition }
                 yPosition  = { this.props.yPosition }
                 payload    = { this.props.payload }
               />
      case BOARD:
        return <BoardPopup
                 xPosition  = { this.props.xPosition }
                 yPosition  = { this.props.yPosition }
                 payload    = { this.props.payload }
                 editBoard  = { this.props.editBoard }
                 hidePopup  = { this.props.hidePopup }
               />
      default:
        return <div></div>
    }
  }
}
