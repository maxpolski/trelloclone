import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as _ from 'lodash';

import NavBar from './layout/topNav/NavBar';
import PopupLayer from './layout/workspace/popupLayer';

import {
         addNewBoard,
         editBoard,
         deleteBoard
       } from '../../actions/boards/board';

import {
         addNewList,
         deleteList,
         editList,
         syncListsOrder
       } from '../../actions/lists/list';

import {
         syncTasks,
         addNewTask,
         deleteTask,
         editTask,
         addDescription
       } from '../../actions/tasks/task';

import { searchHandle } from '../../actions/search/quickSearch';

import { initialize } from '../../actions/app/initialization';

import PopupTypes from '../../popupTypes';

import SearchOverlay from '../../components/navigation/SearchOverlay';

class Layout extends Component {

  constructor(props) {
    super(props);
    this.state = {
                   popup: {},
                   isOverlay: false,
                   queryString: '',
                   searchResults: [],
                   isActiveSearchField: false
                 };
  }

  componentWillMount() {
    this.props.dispatch(initialize());
  }

  render() {
    const {
      dispatch,
      boards,
      user,
      app
    } = this.props;

    if(this.props.app !== "INITIALIZED") {
      return null;
    } else {
      return (
        <div>

          <NavBar
            login = { user.login }
            handleOverlayInput = { this.handleOverlayInput.bind(this) }
            showSearchOverlay = { this.showSearchOverlay.bind(this) }
            hideSearchOverlay = { this.hideSearchOverlay.bind(this) }
            isActive = { this.state.isActiveSearchField }
            queryString = { this.state.queryString }
            toggleActivity = { this.toggleSearchFieldActivity.bind(this) }
          />

          <div onClick = { this.closeOpenedPopups.bind(this) } className="col-md-12 workspace" id="workspace">
            { React.Children.map(this.props.children, (child) => {
                  return React.cloneElement(child, {

                    data: {
                      boards: boards
                    },

                    displayPopup: this.displayPopup.bind(this),

                    addBoard : (name) => dispatch(addNewBoard(name)),
                    editBoard: (id, name) => dispatch(editBoard(id, name)),
                    deleteBoard: (id) => dispatch(deleteBoard(id)),
                    addList:  (id, name) => dispatch(addNewList(id, name)),

                    deleteList: (boardId, listId) => {
                        dispatch(deleteList(boardId, listId))
                      },

                    editList: (boardId, listId, newTitle) => {
                        dispatch(editList(boardId, listId, newTitle));
                      },

                    addTask:  (boardId, listId, name) => {
                        dispatch(addNewTask(boardId, listId, name))
                      },

                    deleteTask: (boardId, listId, taskId) => {
                        dispatch(deleteTask(boardId, listId, taskId));
                      },

                    editTask: (boardId, listId, taskId, newTitle) => {
                        dispatch(editTask(boardId, listId, taskId, newTitle));
                      },

                    syncTasks: (boardId, lists) => {
                        let data = {boardId: boardId, lists: lists};
                        dispatch(syncTasks(data));
                      },
                    syncListsOrder: (boardId, lists) => {
                        let data = {boardId: boardId, lists: lists};
                        dispatch(syncListsOrder(data));
                      }
                  });

                  return child;
                }
              )
            }
          </div>

          <PopupLayer
            isDisplaying = { this.state.popup.isPopup }
            currentPopup = { this.state.popup.currentPopup }
            hidePopup    = { this.hidePopup.bind(this) }
            xPosition    = { this.state.popup.xPosition }
            yPosition    = { this.state.popup.yPosition }
            payload      = { this.state.popup.payload }
            getExtendedData = { this.getExtendedData.bind(this) }
            addDescription  = { (data) => dispatch(addDescription(data)) }
            editBoard    = { (id, name) => dispatch(editBoard(id, name)) }

            deleteList   = { (boardId, listId) => {
                dispatch(deleteList(boardId, listId))
              }
            }

            editTask     = { (boardId, listId, taskId, newTitle) => {
                dispatch(editTask(boardId, listId, taskId, newTitle));
              }
            }

            deleteTask   = { (boardId, listId, taskId) => {
                dispatch(deleteTask(boardId, listId, taskId));
              }
            }
          />

          <SearchOverlay
            ref = "searchOverlay"
            isOverlay = { this.state.isOverlay }
            queryString   = { this.state.queryString }
            quickSearch   = { this.props.quickSearch }
            hideSearchOverlay = { this.hideSearchOverlay.bind(this) }
            hideSearchField   = { this.hideSearchField.bind(this) }
          />

        </div>
      )
    }
  }

  toggleSearchFieldActivity() {
    this.setState( { isActiveSearchField: !this.state.isActiveSearchField } )
  }

  hideSearchField() {
    this.setState( { isActiveSearchField: false } );
    this.setState( { queryString: '' } );
  }

  displayPopup(data) {
    this.setState(
                   {
                     popup: {
                       isPopup: true,
                       currentPopup: PopupTypes[data.type],
                       xPosition: data.xPosition,
                       yPosition: data.yPosition,
                       payload  : data.payload
                     }
                   }
                 );
  }

  hidePopup() {
    this.setState(
                   {
                     popup:
                       {
                         isPopup: false,
                         currentPopup: {}
                       }
                   }
                 );
  }

  handleOverlayInput(value) {
    this.setState( { queryString: value } );

    if(value.length > 0 && !this.props.quickSearch.isQuerying) {
      this.props.dispatch(searchHandle(value));
    }
  }

  showSearchOverlay() {
    this.setState( { isOverlay: true } );
  }

  hideSearchOverlay() {
    this.setState( { isOverlay: false, queryString: "" } );

  }

  closeOpenedPopups() {
    this.setState({ isOverlay: false,
                    queryString: '',
                    isActiveSearchField: false
                  });
  }

  getExtendedData(data) {

    let extendedData = {};

    let board = _.find(this.props.boards, (board) =>
      {
        return board._id === data.boardId
      }
    );

    let list = _.find(board.lists, (list) => {
        return list.id === data.listId;
      }
    );

    let card = _.find(list.tasks, (task) => {
        return task.id === data.cardId;
      }
    );

    extendedData = Object.assign({}, {
                                       taskName: card.name,
                                       listName: list.name
                                     },
                                     data
                                );
    return extendedData;
  }

}

function select(state) {
  return {
    app: state.app,
    user: state.user,
    boards: state.boards,
    quickSearch: state.quickSearch
  }
}

export default connect(select)(Layout);
