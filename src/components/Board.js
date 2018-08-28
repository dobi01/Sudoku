import React from 'react';
import Tile from './Tile';

class Board extends React.Component {

  render() {
    let boardArray = this.props.board.split(''),
      initialBoardArray = this.props.initialBoard.split('');

    return (
      <form>
        {boardArray.map((el, ind) => {
          let initialTile = initialBoardArray[ind] === '.',
              verticalBorderTile,
              horizontalBorderTile,
              componentClasses = [];
             
          for (let i = 2; i < 82; i = i + 9) {
            if (i === ind) verticalBorderTile = el;
          }
          for (let i = 5; i < 82; i = i + 9) {
            if (i === ind) verticalBorderTile = el;
          }
          for (let i = 27; i < 36; i++) {
            if (i === ind) horizontalBorderTile = el;
          }
          for (let i = 54; i < 63; i++) {
            if (i === ind) horizontalBorderTile = el;
          }

          if (initialTile) {
            componentClasses.push('mutable-tile');
          } else {
            componentClasses.push('inmutable-tile');
          }

          verticalBorderTile ? componentClasses.push('border-right') : null;
          horizontalBorderTile ? componentClasses.push('border-top') : null;

          return (
            <Tile
              key={ind}
              onChange={e => this.props.onChange(e, ind)}
              value={el === '.' ? '' : el}
              readOnly={initialTile ? false : true}
              className={componentClasses.join(' ')}
            />);
        })}
      </form>
    );
  }
}

export default Board;
