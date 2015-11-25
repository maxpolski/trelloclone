import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import update from 'react/lib/update';
import classNames from 'classnames'
import {
         DragDropContext,
         DragSource,
         DropTarget
       } from 'react-dnd';

import Task from '../tasks/Task';
import AddTask from '../tasks/AddTask';
import { ItemTypes } from '../../itemTypes';
import PopupTypes from '../../popupTypes';
import ListHeader from './ListHeader';

const listSource = {
  beginDrag(component) {
    return {
             boardId: component.boardId,
             index: component.index,
             order: component.data.order
           };
  }
}

const listTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    if(dragIndex === hoverIndex) {
      return;
    }

    const hoverBoundingRect = ReactDOM.findDOMNode(component).getBoundingClientRect();
    const hoverMiddleX = (hoverBoundingRect.left - hoverBoundingRect.right) / 2;
    const clientOffset = monitor.getClientOffset();
    const hoverClientX = clientOffset.x - hoverBoundingRect.right;

    if(dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
      return;
    }

    if(dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
      return;
    }

    props.moveList(dragIndex, hoverIndex);
    monitor.getItem().index = hoverIndex;
  },

  drop(props, monitor, component) {
    props.syncListsOrder()
  }
}

const cardTarget = {
  hover(props, monitor, component) {
    let taskId = monitor.getItem().id;
    let hoverListId = props.id;
    if(taskId != hoverListId && props.tasks.length === 0) {
      props.makePhantomItem('down', -1, hoverListId);
    }
  }
}

@DropTarget(ItemTypes.TASK, cardTarget, connect => ({
  connectDropCardTarget: connect.dropTarget()
}))

@DropTarget(ItemTypes.LIST, listTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))

@DragSource(ItemTypes.LIST, listSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
  connectDragPreview: connect.dragPreview()
}))

export default class List extends Component {

  constructor(props) {
    super(props);
    this.state = { isEditing: false }
  }

  render() {

    const tasks = this.props.tasks;

    const {
            connectDragSource,
            connectDropTarget,
            connectDropCardTarget,
            connectDragPreview,
            isDragging
          } = this.props;
    const background = '#026aa7';

    return connectDropTarget(connectDropCardTarget(connectDragPreview(
      <div className="list-wrapper" style = {{background: "#026aa7"}}>
        <div
          ref="listWrapper"
          className={classNames({"list-container": true, "list-draggable": isDragging })}
          style = {isDragging ? {opacity: '0'} : {}}
        >
          {connectDragSource(
            <div>
              <ListHeader
                listPopupShow = { this.listPopupShow.bind(this) }
                name = { this.props.data.name }
                isNameEditing = { this.state.isEditing }
                editListName  = { this.editListName.bind(this) }
                confirmEditListName = { this.confirmEditListName.bind(this) }
                cancelEditing       = { this.cancelEditing.bind(this) }
              />
            </div>

          )}

          <div className="list-cards" type="none">
            { tasks.map( (task, index) => {
                  return (
                    <Task
                      className = "task"
                      id = {task.id}
                      index = { index }
                      key = { task.id }
                      name = { task.name }
                      description = { task.description }
                      isHidden = { task.isHidden }
                      isPlaceholder = { task.isPlaceholder }
                      displayPopup = { this.props.displayPopup }
                      showItem = { this.props.showItem }
                      boardId = { this.props.boardId }
                      listId = { this.props.data.id }
                      deleteTask = { this.props.deleteTask }
                      editTask  = { this.props.editTask }
                      removePlaceholder = {this.props.removePlaceholder}
                      moveTask = { this.props.moveTask }
                      syncTasks = { this.props.syncTasks }
                      moveCardToOtherList = {this.props.moveCardToOtherList}
                      makePhantomItem = {this.props.makePhantomItem}
                      deletePhantomItem = {this.props.deletePhantomItem}
                      detouchCard = {this.props.detouchCard}
                      dropCard    = {this.props.dropCard}
                    />
                  )
                }
              )
            }
            <AddTask
              boardId = { this.props.boardId }
              id = { this.props.data.id }
              addTask = { this.props.addTask }
            />
          </div>
        </div>
      </div>
    )));
  }

  listPopupShow(evt) {
    evt.persist();
    this.props.displayPopup(
                             {
                               type: PopupTypes.LIST,
                               xPosition: evt.clientX,
                               yPosition: evt.clientY,
                               payload: {
                                 boardId: this.props.boardId,
                                 listId:  this.props.id
                               }
                             }
                           );
  }

  deleteList(event) {
    this.props.deleteList(this.props.boardId, this.props.data.id);
  }

  editListName(event) {
    this.setState({isEditing: true, newNameValue: this.props.data.name});
  }

  changeEditing(event) {
    event.persist();
    this.setState({newNameValue: event.target.value});
  }

  confirmEditing(event) {
    event.persist();
    if(event.keyCode == 13) {
      var value = this.state.newNameValue;
      if(value.length != '') {
        this.editListName(value);
        this.setState({isEditing: false});
      }
    } else if(event.keyCode == 27) {
      this.setState({isEditing: false, newNameValue: ''});
    }
  }

  confirmEditListName(value) {
    this.props.editList(this.props.boardId, this.props.data.id, value);
    this.cancelEditing();
  }

  cancelEditing() {
      this.setState( { isEditing: false } );
  }
}
