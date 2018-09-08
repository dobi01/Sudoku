import React from 'react';
import Tile from './Tile';

class Board extends React.Component {

  render() {
    let boardArray = this.props.board.split(''),
      initialBoardArray = this.props.initialBoard.split('');

    return (
      <form id="board">
        {boardArray.map((el, ind) => {
          let initialTile = initialBoardArray[ind] !== '.';

          
          return (
            <Tile
              key={ind}
              onChange={e => this.props.onChange(e, ind)}
              value={el === '.' ? '' : el}
              readOnly={initialTile || this.props.cheated ? true : false}
              className={initialTile ? 'inmutable-tile' : 'mutable-tile'}
            />);
        })}
      </form>
    );
  }
}

export default Board;
