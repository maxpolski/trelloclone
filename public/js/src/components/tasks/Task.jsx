import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';

import { ItemTypes } from '../../itemTypes'
import PopupTypes from '../../popupTypes';

const taskSource = {
  beginDrag(component) {
    return {
             id: component.id,
             listId: component.listId,
             index: component.index,
             origin: component
           };
  },

  endDrag(props, monitor, component) {
    monitor.getItem().origin.dropCard(monitor.getItem().origin, props.listId, component);
  }
}

const taskTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    const hoverBoundingRect = ReactDOM.findDOMNode(component).getBoundingClientRect();
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
    const clientOffset = monitor.getClientOffset();
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;


    if(props.listId == monitor.getItem().listId) {
      if(dragIndex !== hoverIndex) {
        if(dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return;
        }

        if(dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return;
        }

        props.moveTask(dragIndex, hoverIndex, props.listId);
        monitor.getItem().index = hoverIndex;
      }

    } else {

      let direction = '';

      if(hoverClientY < hoverMiddleY) {
        direction = 'up';
      }

      if(hoverClientY > hoverMiddleY) {
        direction = 'down';
      }

      props.moveCardToOtherList(direction, monitor.getItem().origin, hoverIndex, props.listId);

    }

  },

  drop(props, monitor, component) {
    if(props.listId == monitor.getItem().listId) {
      props.syncTasks(props.boardId);
    } else {
      monitor.getItem().origin.detouchCard(monitor.getItem().id, monitor.getItem().listId);
      monitor.getItem().origin.dropCard(monitor.getItem().origin, props.listId);
      props.syncTasks(props.boardId);
    }
  }
}

@DropTarget(ItemTypes.TASK, taskTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))

@DragSource(ItemTypes.TASK, taskSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))

export default class Task extends Component {

  constructor(props) {
      super(props);
      this.state = { isEditing: false, editValue: '' };
  }

  render(){
    const { connectDragSource, connectDropTarget, isDragging, isPlaceholder, isHidden } = this.props;

    let background = isDragging || isPlaceholder ? 'grey' : '';
    let opacity    = isDragging || isPlaceholder ? '0'    : '1';
    let display    = isHidden && isDragging ? 'none' : 'block';

    return connectDragSource(connectDropTarget(
      <div
        className="list-card"
        style = { { backgroundColor: background, display: display }}
        ref = { (ref) => this.cardItem = ref }
      >
        <div className="list-card-details" style = { { opacity: opacity } } >
          <div className="list-card-labels">
          </div>
          <a
            className="list-card-title"
            style = { this.state.isEditing ? {display: 'none'} : {} }
          >
            { this.props.name }
          </a>
          <input
            type  = "text"
            value = { this.state.editValue }
            style = { this.state.isEditing ? {} : {display: 'none'} }
            onChange  = { this.changeValue.bind(this) }
            onKeyDown = { this.confirmEditing.bind(this) }
          />
          <span
            className="edit-task"
            onClick = { this.cardPopupShow.bind(this) }
          >
            <img src="assets/images/edit.png" />
          </span>
        </div>
      </div>
    ));
  }

  deleteTask(event) {
    this.props.deleteTask(this.props.boardId, this.props.listId, this.props.id);
  }

  editTitle(event) {
    event.persist();
    this.setState({isEditing: true, editValue: this.props.name});
  }

  changeValue(event) {
    event.persist();
    this.setState({editValue: event.target.value});
  }

  confirmEditing(event) {
    event.persist();
    if(event.keyCode == 13) {
      var value = event.target.value;
      if(value.length != '') {
        this.props.editTask(this.props.boardId, this.props.listId, this.props.id, value);
        this.setState({isEditing: false});
      }
    } else if(event.keyCode == 27) {
      this.setState({isEditing: false, editValue: ''});
    }
  }

  cardPopupShow(evt) {
    evt.persist();
    let cardItem = this.cardItem;
    let xPosition = cardItem.getBoundingClientRect().left;
    let yPosition = cardItem.getBoundingClientRect().top;
    let width     = cardItem.offsetWidth;

    this.props.displayPopup(
                             {
                               type: PopupTypes.CARD,
                               xPosition: xPosition,
                               yPosition: yPosition,
                               payload: {
                                 boardId: this.props.boardId,
                                 listId:  this.props.listId,
                                 cardId:  this.props.id,
                                 title:   this.props.name,
                                 elementWidth: width
                               }
                             }
                           );
  }
}
