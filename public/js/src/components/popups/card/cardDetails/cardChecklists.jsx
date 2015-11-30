import React, { Component } from 'react';

import CardChecklist from './cardChecklist';

export default class CardChecklists extends Component {
  render() {
    return(
      <div className = "card-details-window-checklists-area">
        { this.props.checklists.map((checklist, index) => {
              return (
                <CardChecklist
                  id = { checklist.id }
                  key = { checklist.id }
                  name = { checklist.name }
                  tasks = { checklist.tasks }
                  deleteChecklist = { this.handleDeleting.bind(this) }
                  addChecklistItem = { this.addChecklistItem.bind(this) }
                  toggleTaskStatus = { this.toggleTaskStatus.bind(this) }
                />
              )
            }
          )
        }
      </div>
    )
  }

  handleDeleting(checklistId) {

    let data = {
      boardId: this.props.payload.boardId,
      listId: this.props.payload.listId,
      cardId: this.props.payload.cardId,
      checklistId: checklistId
    }

    this.props.deleteChecklist(data);
  }

  addChecklistItem(checklistId, itemName) {
    let data = {
      boardId: this.props.payload.boardId,
      listId: this.props.payload.listId,
      cardId: this.props.payload.cardId,
      checklistId: checklistId,
      itemName: itemName
    }

    this.props.addChecklistItem(data);
  }

  toggleTaskStatus(itemId, checklistId) {
    let data = {
      boardId: this.props.payload.boardId,
      listId: this.props.payload.listId,
      cardId: this.props.payload.cardId,
      checklistId: checklistId,
      itemId: itemId
    }

    this.props.toggleTaskStatus(data);
  }
}
