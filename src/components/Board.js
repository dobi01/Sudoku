import React from 'react';
import Tile from './Tile';

const Board = (props) => 
  <form id="board">
    {props.board.split('').map((el, ind) => {
      let initialBoardArray = props.initialBoard.split(''),
        initialTile = initialBoardArray[ind] !== '.';
      
      return (
        <Tile
          key={ind}
          updateBoard={e => props.updateBoard(e, ind)}
          value={el === '.' ? '' : el}
          readOnly={initialTile || props.cheated ? true : false}
          className={initialTile ? 'inmutable-tile' : 'mutable-tile'}
        />);

    })}
  </form>;

export default Board;
