import { ADD_NEW_BOARD,
         EDIT_BOARD,
         DELETE_BOARD
       }     from '../../actions/boards/board';

import { ADD_NEW_LIST,
         DELETE_LIST,
         EDIT_LIST,
         SYNC_LISTS_ORDER
       }     from '../../actions/lists/list';

import { ADD_NEW_TASK,
         DELETE_TASK,
         EDIT_TASK,
         SYNC_TASKS_ORDER,
         ADD_TASK_DESCRIPTION,
         SAVE_TASK_COMMENT,
         ADD_CHECKLIST,
         DELETE_CHECKLIST,
         ADD_CHECKLIST_ITEM,
         TOGGLE_TASK_STATUS
       }     from '../../actions/tasks/task';
import { APP_INITIALIZED } from '../../actions/app/initialization';
import * as _ from 'lodash';

export default function boards(state = [], action) {
  switch (action.type) {
    case ADD_NEW_BOARD:
      return [ ...state, action.payload];
    case EDIT_BOARD:
      let _id = action.payload._id;
      let item = _.find(state, function(board) {
        return board._id == _id;
      });
      let index = state.indexOf(item);
      return [
        ...state.slice(0, index),
        Object.assign({}, state[index], action.payload),
        ...state.slice(index + 1)
      ];
    case DELETE_BOARD:
      _id = action.payload._id;
      item = _.find(state, function(board) {
        return board._id == _id;
      });
      index = state.indexOf(item);
      return [
        ...state.slice(0, index),
        ...state.slice(index + 1)
      ];
    case ADD_NEW_LIST:
      _id   = action.payload._id;
      index = _.find(state, function(board) {
        return board._id == _id;
      });
      let boardIndex = state.indexOf(index);
      return [
        ...state.slice(0, boardIndex),
        Object.assign({}, state[boardIndex], action.payload),
        ...state.slice(boardIndex + 1)
      ];
    case DELETE_LIST:
      _id  = action.payload._id;
      item = _.find(state, function(board) {
        return board._id == _id;
      });
      index = state.indexOf(item);
      return [
        ...state.slice(0, index),
        Object.assign({}, state[index], action.payload),
        ...state.slice(index + 1)
      ];
    case EDIT_LIST:
      _id  = action.payload._id;
      item = _.find(state, function(board) {
        return board._id == _id;
      });
      index = state.indexOf(item);
      return [
        ...state.slice(0, index),
        Object.assign({}, state[index], action.payload),
        ...state.slice(index + 1)
      ];
    case SYNC_LISTS_ORDER:
      _id  = action.payload._id;
      item = _.find(state, function(board) {
        return board._id == _id;
      });
      index = state.indexOf(item);
      return [
        ...state.slice(0, index),
        Object.assign({}, state[index], action.payload),
        ...state.slice(index + 1)
      ];
    case ADD_NEW_TASK:
      _id = action.payload._id;
      item = _.find(state, function(board) {
        return board._id == _id;
      });
      index = state.indexOf(item);
      return [
        ...state.slice(0, index),
        Object.assign({}, state[index], action.payload),
        ...state.slice(index + 1)
      ];
    case DELETE_TASK:
      _id = action.payload._id;
      item = _.find(state, function(board) {
        return board._id == _id;
      });
      index = state.indexOf(item);
      return [
        ...state.slice(0, index),
        Object.assign({}, state[index], action.payload),
        ...state.slice(index + 1)
      ];
    case EDIT_TASK:
      _id = action.payload._id;
      item = _.find(state, function(board) {
        return board._id == _id;
      });
      index = state.indexOf(item);
      return [
        ...state.slice(0, index),
        Object.assign({}, state[index], action.payload),
        ...state.slice(index + 1)
      ];
    case SYNC_TASKS_ORDER:
      _id = action.payload._id;
      item = _.find(state, function(board) {
        return board._id == _id;
      });
      index = state.indexOf(item);
      return [
        ...state.slice(0, index),
        Object.assign({}, state[index], action.payload),
        ...state.slice(index + 1)
      ];
    case ADD_TASK_DESCRIPTION:
      _id = action.payload._id;
      item = _.find(state, function(board) {
        return board._id == _id;
      });
      index = state.indexOf(item);
      return [
        ...state.slice(0, index),
        Object.assign({}, state[index], action.payload),
        ...state.slice(index + 1)
      ];
    case ADD_CHECKLIST:
      _id = action.payload._id;
      item = _.find(state, function(board) {
        return board._id == _id;
      });
      index = state.indexOf(item);
      return [
        ...state.slice(0, index),
        Object.assign({}, state[index], action.payload),
        ...state.slice(index + 1)
      ];
    case DELETE_CHECKLIST:
      _id = action.payload._id;
      item = _.find(state, function(board) {
        return board._id == _id;
      });
      index = state.indexOf(item);
      return [
        ...state.slice(0, index),
        Object.assign({}, state[index], action.payload),
        ...state.slice(index + 1)
      ];
    case SAVE_TASK_COMMENT:
      _id = action.payload._id;
      item = _.find(state, function(board) {
        return board._id == _id;
      });
      index = state.indexOf(item);
      return [
        ...state.slice(0, index),
        Object.assign({}, state[index], action.payload),
        ...state.slice(index + 1)
      ];
    case ADD_CHECKLIST_ITEM:
      _id = action.payload._id;
      item = _.find(state, function(board) {
        return board._id == _id;
      });
      index = state.indexOf(item);
      return [
        ...state.slice(0, index),
        Object.assign({}, state[index], action.payload),
        ...state.slice(index + 1)
      ];
    case TOGGLE_TASK_STATUS:
      _id = action.payload._id;
      item = _.find(state, function(board) {
        return board._id == _id;
      });
      index = state.indexOf(item);
      return [
        ...state.slice(0, index),
        Object.assign({}, state[index], action.payload),
        ...state.slice(index + 1)
      ];
    case APP_INITIALIZED:
      let data = action.payload.data;
      let boards = [];

      _.forIn(data, function(value, key) {
        boards.push(value);
      });
      return boards;
    default:
      return state;
  }
}
