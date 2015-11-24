import React, { Component } from 'react';

import Board from '../../../../../components/boards/BoardPreview';
import FakeBoard from '../../../../../components/boards/FakeBoardPreview';

let BoardsListView = React.createClass ({

  render: function() {

    const boards = this.props.data.boards;

    return (
        <div className="content-container">
          <h3 className="boards-section-name">My Boards</h3>
          { boards.map((board, index) => {
                return <Board
                         key = {index}
                         board = {board}
                         addList = { this.props.addList }
                         addTask = { this.props.addTask }
                       />
              }
            )
          }
          <FakeBoard addBoard = { this.props.addBoard }/>
        </div>
    )
  }
});

export default BoardsListView;
