import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';

import { ItemTypes } from '../../itemTypes'

const taskCpntainerSource = {
  beginDrag(component) {
    console.log('component', component);
    return { pieceId: component.data.id };
  }
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

let TaskContainer = React.createClass ({
  
});

export default DragSource(ItemTypes.TASK_CONTAINER, taskContainerSource, collect)(TaskContainer);
