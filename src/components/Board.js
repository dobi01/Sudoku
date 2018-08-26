import React from 'react';
import Tile from './Tile.js';

class Board extends React.Component {

  render() {
    let boardArray = this.props.board.split(''),
      initialBoardArray = this.props.initialBoard.split('');

    return (
      <form>
        {boardArray.map((el, ind) => {
          return (
            <Tile
              key={ind}
              onChange={e => this.props.onChange(e, ind)}
              value={el === '.' ? '' : el}
              readOnly={initialBoardArray[ind] === '.' ? false : true}
            />);
        })}
      </form>
    );
  }
}

export default Board;
