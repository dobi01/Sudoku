import React from 'react';
import Board from './components/Board';
import Option from './components/Option';
import sudoku from 'sudoku-umd';
import './App.css';

const unsolvable = 'Sorry, this sudoku can\'t be solved. You\'ve made a mistake. Try again!',
      solvable = 'Keep solving! You\'re on the right way :-)';
class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      initialBoard: '',
      board: '',
      level: ''
    };
    this.start = this.start.bind(this);
    this.enterNumber = this.enterNumber.bind(this);
    this.reset = this.reset.bind(this);
    this.solve = this.solve.bind(this);
    this.check = this.check.bind(this);
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
    solvedBoard ? alert(solvable) : alert(unsolvable);
  }

  reset() {
    this.setState({
      board: this.state.initialBoard
    });
  }

  render() {
    return (
      <div className="App">
        <Board
          board={this.state.board}
          initialBoard={this.state.initialBoard}
          onChange={this.enterNumber}
        />
        <div className="buttons">
          <button onClick={this.check}>CHECK</button>
          <button type="text">NEW GAME</button>
          <select value={this.state.level} onChange={this.start} >
            <Option value='' text='Choose mode' />
            <Option value='easy' text='easy' />
            <Option value='medium' text='medium' />
            <Option value='hard' text='hard' />
            <Option value='very-hard' text='very hard' />
            <Option value='insane' text='insane' />
            <Option value='inhuman' text='inhuman' />
          </select>
          <button onClick={this.solve}>SOLVE</button>
          <button onClick={this.reset}>RESTART</button>
        </div>
      </div>
    );
  }
}

export default App;
