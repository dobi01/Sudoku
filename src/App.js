import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import Board from './components/Board';
import LevelsMenu from './components/LevelsMenu';
import sudoku from 'sudoku-umd';
import './App.css';

const unsolvable = 'You\'ve made a mistake somewhere. Try again!',
      solvable = 'Keep solving! You\'re on the right way :-)',
      solved = 'You\'ve solved the sudoku!';
let alertClass = '';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      initialBoard: '',
      board: '',
      level: '',
      newGame: false,
      alert: ''
    };
    this.start = this.start.bind(this);
    this.enterNumber = this.enterNumber.bind(this);
    this.reset = this.reset.bind(this);
    this.solve = this.solve.bind(this);
    this.check = this.check.bind(this);
    this.showLevels = this.showLevels.bind(this);
  }

  start(e) {
    alertClass = '';
    let level = e.target.value;
    if (!level) return;
    let newBoard = sudoku.generate(level);
    
    this.setState({
      initialBoard: newBoard, 
      board: newBoard,
      level,
      newGame: false,
      alert: ''
    });
  }

  showLevels() {
    this.setState({
      newGame: true
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
      board: newBoardString,
      alert: ''
    });
  }

  solve() {
    let solvedBoard = sudoku.solve(this.state.board);
    if (solvedBoard) {
      this.setState({
        board: solvedBoard
      });
    } else {
      this.setState({
        alert: unsolvable
      });
    }
  }

  check() {
    let solvedBoard = sudoku.solve(this.state.board);
    if (solvedBoard === this.state.board) {
      this.setState({
        alert: solved
      });
      alertClass = 'win';
      return;
    }
    solvedBoard ? this.setState({ alert: solvable }) : this.setState({ alert: unsolvable });
  }

  reset() {
    this.setState({
      board: this.state.initialBoard,
      alert: ''
    });
    alertClass = '';
  }

  render() {
    const levelsMenu = <LevelsMenu onClick={this.start} />;

    return (
      <div className="app">
        <span className={alertClass}>{this.state.alert}</span>
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
            <CSSTransitionGroup
              component="div"
              transitionName="show-menu"
              transitionEnterTimeout={500}
              transitionLeaveTimeout={500}>
              {this.state.newGame ? levelsMenu : null}
            </CSSTransitionGroup>
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
