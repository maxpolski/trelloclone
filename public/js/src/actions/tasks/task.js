import { CALL_API } from 'redux-api-middleware';

export const REQUEST_STARTED  = 'REQUEST_STARTED';
export const REQUEST_FAILED   = 'REQUEST_FAILED';
export const ADD_NEW_TASK     = 'ADD_NEW_TASK';
export const DELETE_TASK      = 'DELETE_TASK';
export const EDIT_TASK        = 'EDIT_TASK';
export const SYNC_TASKS_ORDER = 'SYNC_TASK_ORDER';
export const ADD_TASK_DESCRIPTION  = 'ADD_TASK_DESCRIPTION';
export const SAVE_TASK_COMMENT     = 'SAVE_TASK_COMMENT';
export const ADD_CHECKLIST         = 'ADD_CHECKLIST';
export const DELETE_CHECKLIST      = 'DELETE_CHECKLIST';
export const ADD_CHECKLIST_ITEM    = 'ADD_CHECKLIST_ITEM';
export const TOGGLE_TASK_STATUS    = 'TOGGLE_TASK_STATUS';

export function addNewTask(boardId, listId, name) {
  return {[CALL_API]: {
      endpoint: '/addtask',
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      body: 'boardId=' + boardId + '&listId=' + listId + '&name=' + name,
      types: [
        REQUEST_STARTED,
        ADD_NEW_TASK,
        REQUEST_FAILED
      ]
    }
  }
}

export function deleteTask(boardId, listId, taskId) {
  return {[CALL_API]: {
      endpoint: '/deletetask',
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      body: 'boardId=' + boardId + '&listId=' + listId + '&taskId=' + taskId,
      types: [
        REQUEST_STARTED,
        DELETE_TASK,
        REQUEST_FAILED
      ]
    }
  }
}

export function editTask(boardId, listId, taskId, newTitle) {
  return {[CALL_API]: {
      endpoint: '/edittask',
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      body: 'boardId=' + boardId + '&listId=' + listId + '&taskId=' + taskId + '&newTitle=' + newTitle,
      types: [
        REQUEST_STARTED,
        EDIT_TASK,
        REQUEST_FAILED
      ]
    }
  }
}

export function syncTasks(data) {
  data = JSON.stringify(data);
  return {[CALL_API]: {
      endpoint: '/synctasks',
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: data,
      types: [
        REQUEST_STARTED,
        SYNC_TASKS_ORDER,
        REQUEST_FAILED
      ]
    }
  }
}

export function addDescription(data) {
  return {[CALL_API]: {
      endpoint: '/adddescription',
      method: 'POST',
      credentials: 'same-origin',
      headers: {
      "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      body: "boardId=" + data.boardId +
            "&listId=" + data.listId +
            "&taskId=" + data.taskId +
            "&text=" + data.text,
      types: [
        REQUEST_STARTED,
        ADD_TASK_DESCRIPTION,
        REQUEST_FAILED
      ]
    }
  }
}

export function saveTaskComment(data) {
  data = JSON.stringify(data);
  return {[CALL_API]: {
      endpoint: '/addtaskcomment',
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: data,
      types: [
        REQUEST_STARTED,
        SAVE_TASK_COMMENT,
        REQUEST_FAILED
      ]
    }
  }
}

export function addChecklist(data) {
  data = JSON.stringify(data);
  return {[CALL_API]: {
      endpoint: '/addchecklist',
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: data,
      types: [
        REQUEST_STARTED,
        ADD_CHECKLIST,
        REQUEST_FAILED
      ]
    }
  }
}

export function deleteChecklist(data) {
  data = JSON.stringify(data);
  return {[CALL_API]: {
      endpoint: '/deletechecklist',
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: data,
      types: [
        REQUEST_STARTED,
        DELETE_CHECKLIST,
        REQUEST_FAILED
      ]
    }
  }
}

export function addChecklistItem(data) {
  data = JSON.stringify(data);
  return {[CALL_API]: {
      endpoint: '/addchecklistitem',
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: data,
      types: [
        REQUEST_STARTED,
        ADD_CHECKLIST_ITEM,
        REQUEST_FAILED
      ]
    }
  }
}

export function toggleTaskStatus(data) {
  data = JSON.stringify(data);
  return {[CALL_API]: {
      endpoint: '/toggletaskstatus',
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: data,
      types: [
        REQUEST_STARTED,
        TOGGLE_TASK_STATUS,
        REQUEST_FAILED
      ]
    }
  }
}
