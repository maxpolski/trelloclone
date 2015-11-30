import React, { Component } from 'react';
import update from 'react/lib/update';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import * as _ from 'lodash';

import List from '../../../../../components/lists/List';
import AddList from '../../../../../components/lists/AddList';
import PopupTypes from '../../../../../popupTypes';

class BoardView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      board: Object.assign({}, _.find(props.data.boards, (board) => board._id == props.params.id)),
      isEditing: false
    }
  }

  componentWillReceiveProps(nextProps) {
    let board = Object.assign({}, _.find(nextProps.data.boards, (board) => board._id == nextProps.params.id));
    this.setState({board: board});
  }

  render() {
    let board = this.state.board;
    let lists = this.state.board.lists;

    lists = lists ? lists : [];

    if(board) {
      return (
        <div className="lists-container">
          <div className="board-header">
            <a
              ref = "boardName"
              className = "board-name"
              onClick   = { this.boardPopupShow.bind(this) }
            >
              <span>
                { board.name }
              </span>
            </a>
          </div>
          <div className="board-canvas">
            {
              lists.map( (list, index) => {
                  return <List
                           id = { list.id }
                           boardId = { board._id }
                           key = { list.id }
                           index = { index }
                           data = { list }
                           tasks = { list.tasks }
                           addTask = { this.props.addTask }
                           dropCard = { this.dropCard.bind(this) }
                           deleteList = { this.props.deleteList }
                           editList   = { this.props.editList }
                           deleteTask = { this.props.deleteTask }
                           editTask   = { this.props.editTask }
                           moveTask   = { this.moveTask.bind(this) }
                           moveList   = { this.moveList.bind(this) }
                           moveCardToOtherList = { this.moveCardToOtherList.bind(this) }
                           makePhantomItem = {this.makePhantomItem.bind(this)}
                           detouchCard = { this.detouchCard.bind(this) }
                           syncTasks  = { this.syncTasks.bind(this) }
                           syncListsOrder = { this.syncListsOrder.bind(this) }
                           displayPopup   = { this.props.displayPopup }
                         />
                }
              )
            }
            <AddList
              addList = { this.props.addList }
              id = { board._id }
            />
          </div>
        </div>
      );
    }

    return <div>No boards yet</div>

  }

  boardPopupShow(evt) {
    evt.persist();
    let boardName = this.refs.boardName;
    let xPosition = boardName.getBoundingClientRect().left;
    let yPosition = boardName.getBoundingClientRect().top;
    this.props.displayPopup(
                             {
                               type: PopupTypes.BOARD,
                               xPosition: xPosition,
                               yPosition: yPosition,
                               payload: {
                                 boardId: this.props.params.id,
                                 title: this.state.board.name
                               }
                             }
                           );
  }

  removePlaceholder() {
    let board = Object.assign({}, this.state.board);
    for(let i = 0; i < board.lists.length; i++) {
      let tmpItemIndex = _.findIndex(board.lists[i].tasks, (task) => task.isPlaceholder );
      if(tmpItemIndex !== -1) {
        board.lists[i].tasks.splice(tmpItemIndex, 1);
      }
    }

    this.setState({board: board});

  }

  moveTask(dragIndex, hoverIndex, listId) {
    this.showItem(listId);
    this.removePlaceholder();

    let board = Object.assign({}, this.state.board);
    let listIndex = _.findIndex(board.lists, (list) => {
        return list.id === listId;
      }
    );

    let list = board.lists[listIndex];
    const { tasks } = list;
    let dragItem = tasks[dragIndex];

    board.lists[listIndex] = update(board.lists[listIndex], {
      tasks: {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragItem]
        ]
      }
    });

    this.setState({board: board});
  }

  makePhantomItem(direction, hoverItemIndex, targetListId) {
    let board = Object.assign({}, this.state.board);
    let hoverListIndex = _.findIndex(board.lists, (list) => list.id === targetListId);

    let list = board.lists[hoverListIndex];
    const { tasks } = list;
    const placeholderIndex = _.findIndex(tasks, (task) => task.isPlaceholder === true);
    let hasPlaceholder = placeholderIndex === -1 ? false : true ;

    const placeholder = {id: '-666', isPlaceholder: true, name: 'placeholder'};
    let targetIndex;

    if(direction === 'up') {
      targetIndex = hoverItemIndex - 1;
    } else if(direction === 'down') {
      targetIndex = hoverItemIndex;
    }

    targetIndex = targetIndex < 0 ? 0 : targetIndex;

    if(targetIndex !== placeholderIndex) {

      if(hasPlaceholder) {
        board.lists[hoverListIndex] = update(board.lists[hoverListIndex], {
          tasks: {
            $splice: [
              [placeholderIndex, 1],
              [targetIndex, 0, placeholder]
            ]
          }
        });
      } else {
        board.lists[hoverListIndex] = update(board.lists[hoverListIndex], {
          tasks: {
            $splice: [
              [targetIndex, 0, placeholder]
            ]
          }
        });
      }

      this.setState({board: board});
    }
  }

  dropCard() {
    console.log('dropped', arguments);
  }

  moveList(dragIndex, hoverIndex) {

    let board = Object.assign({}, this.state.board);
    let lists = board.lists;
    let dragList = lists[dragIndex];

    board = update(board, {
      lists: {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragList]
        ]
      }
    });

    this.setState({board: board});
  }

  moveCardToOtherList(direction, sourceItem, hoverItemIndex, targetListId) {
    this.hideItem(sourceItem.id, sourceItem.listId);
    this.makePhantomItem(direction, hoverItemIndex, targetListId);

    let board = Object.assign({}, this.state.board);

    let hoverListIndex = _.findIndex(board.lists, (list) => list.id === targetListId);
    let list = board.lists[hoverListIndex];
    const { tasks } = list;

    console.log('sourceItem', sourceItem);

    let dragItem = {
                     id: sourceItem.id,
                     name: sourceItem.name,
                     order: 0,
                     comments: sourceItem.comments,
                     checklists: sourceItem.checklists,
                     description: sourceItem.description
                   }

  }

  syncListsOrder() {
    this.props.syncListsOrder(this.props.params.id, this.state.board.lists);
  }

  syncTasks() {
    this.props.syncTasks(this.props.params.id, this.state.board.lists);
  }

  hideItem(itemId, listId) {
    let board = Object.assign({}, this.state.board);

    let listIndex = _.findIndex(board.lists, (list) => {
        return list.id == listId;
      }
    );

    let itemIndex = _.findIndex(board.lists[listIndex].tasks, (task) => {
        return task.id == itemId;
      }
    );

    board.lists[listIndex].tasks[itemIndex].isHidden = true;

    this.setState({board: board});
  }

  showItem(listId) {
    let board = Object.assign({}, this.state.board);
    let listIndex = _.findIndex(board.lists, (list) => {
        return list.id == listId;
      }
    );

    const { tasks } = board.lists[listIndex];

    let hiddenItem = _.find(tasks, (task) => task.isHidden === true);
    if(hiddenItem) {
      hiddenItem.isHidden = false;
    }

    this.setState({board: board});

  }

  dropCard(dragItem, listId){

    let board = Object.assign({}, this.state.board);
    let shouldBeDeleted;
    let numOfUntList;

    for( let i = 0; i < board.lists.length; i++ ) {
      let tmpItemIndex = _.findIndex(board.lists[i].tasks, (task) => task.isPlaceholder );
      if(tmpItemIndex !== -1) {
        shouldBeDeleted = true;
        board.lists[i].tasks[tmpItemIndex] = {
                                               id: dragItem.id,
                                               name: dragItem.name,
                                               order: 0,
                                               checklists: dragItem.checklists,
                                               comments: dragItem.comments,
                                               description: dragItem.description
                                             };
        numOfUntList = i;
      }
    }

    if(shouldBeDeleted) {
      for(let i = 0; i < board.lists.length; i++) {
        if(i !== numOfUntList) {
          let toDeleteIndex = _.findIndex(board.lists[i].tasks, (task) => {
              return task.id === dragItem.id;
            }
          );
          if(toDeleteIndex !== -1) {
            board.lists[i].tasks.splice(toDeleteIndex, 1);
          }
        }
      }
    }

    this.setState({board: board});

  }

  detouchCard(cardId, listId){
    let board = Object.assign({}, this.state.board);

    let list = _.find(board.lists, (list) => {
        return list.id == listId;
      }
    );

    let listIndex = board.lists.indexOf(list);

    let cardIndex = _.findIndex(list.tasks, (task) => {
        return task.id == cardId;
      }
    );

    list.tasks.splice(cardIndex, 1);
    board[listIndex] = list;

    this.setState({board: board});
  }
}

export default DragDropContext(HTML5Backend)(BoardView);
