import React from 'react';
import Board from './components/Board';
import Option from './components/Option';
import sudoku from 'sudoku-umd';
import './App.css';

const unsolvable = 'Sorry, this sudoku can\'t be solved. You\'ve made a mistake. Try again!',
      solvable = 'Keep solving! You\'re on the right way :-)',
      solved = 'You solved the sudoku!';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      initialBoard: '',
      board: '',
      level: '',
      newGame: false
    };
    this.start = this.start.bind(this);
    this.enterNumber = this.enterNumber.bind(this);
    this.reset = this.reset.bind(this);
    this.solve = this.solve.bind(this);
    this.check = this.check.bind(this);
    this.showLevels = this.showLevels.bind(this);
  }

  start(e) {
    let level = e.target.value;
    if (!level) return;
    let newBoard = sudoku.generate(level);
    
    this.setState({
      initialBoard: newBoard, 
      board: newBoard,
      level
    });
  }

  showLevels() {
    let toShow = this.state.newGame ? false : true;
    this.setState({
      newGame: toShow
    });
  }

  enterNumber(el, ind) {
    let boardArray = this.state.board.split('');
    let newBoard = boardArray.map((tile, i) => {
      if (i === ind) {
        return tile = el;
      }
      return tile;
    });

    let newBoardString = newBoard.join('');

    this.setState({
      board: newBoardString
    });
  }

  solve() {
    let solvedBoard = sudoku.solve(this.state.board);
    if (solvedBoard) {
      this.setState({
        board: solvedBoard
      });
    } else {
      alert(unsolvable);
    }
  }

  check() {
    let solvedBoard = sudoku.solve(this.state.board);
    if (solvedBoard === this.state.board) {
      return alert(solved);
    }
    solvedBoard ? alert(solvable) : alert(unsolvable);
  }

  reset() {
    this.setState({
      board: this.state.initialBoard
    });
  }

  render() {
    return (
      <div className="app">
        <div className="board">
          <Board
            board={this.state.board}
            initialBoard={this.state.initialBoard}
            onChange={this.enterNumber}
          />
        </div>
        <div className="buttons">
          <button type="text" onClick={this.showLevels}>NEW GAME</button>
          <div className="select">
            {this.state.newGame ? (
              <div>
                <Option value='easy' text='easy' onClick={this.start} />
                <Option value='medium' text='medium' onClick={this.start}/>
                <Option value='hard' text='hard' onClick={this.start}/>
                <Option value='very-hard' text='very hard' onClick={this.start} />
                <Option value='insane' text='insane' onClick={this.start}/>
                <Option value='inhuman' text='inhuman'onClick={this.start} />
              </div>
            ) : (
              false
            )}
          </div>
          <button onClick={this.check}>CHECK</button>
          <button onClick={this.reset}>RESTART</button>
          <button onClick={this.solve}>SOLVE</button>
        </div>
      </div>
    );
  }
}

export default App;
