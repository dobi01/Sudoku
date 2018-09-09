import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import Board from './components/Board';
import LevelsMenu from './components/LevelsMenu';
import sudoku from 'sudoku-umd';
import './App.css';
import './AppMediaQueries.css';

const unsolvable = 'You\'ve made a mistake somewhere. Try again!',
  solvable = 'Keep solving! You\'re on the right way :-)',
  solved = 'You\'ve solved the sudoku! Wow!';
let alertClass = '';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      initialBoard: '',
      board: '',
      level: '',
      newGame: false,
      alert: '',
      shownMenu: true,
      shownBoard: false,
      cheated: false,
      width: window.innerWidth
    };

    this.start = this.start.bind(this);
    this.enterNumber = this.enterNumber.bind(this);
    this.reset = this.reset.bind(this);
    this.solve = this.solve.bind(this);
    this.check = this.check.bind(this);
    this.toggleLevels = this.toggleLevels.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.toggleBoard = this.toggleBoard.bind(this);
  }

  start(e) {
    alertClass = '';
    let level = e.target.value;
    if (!level) return;
    let newBoard = sudoku.generate(level);
    
    if (this.state.width <= 910) {
      this.toggleMenu();
    }
    
    this.setState({
      initialBoard: newBoard, 
      board: newBoard,
      level,
      newGame: false,
      alert: '',
      shownBoard: true
    });
  }

  toggleLevels() {
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
    this.setState({
      alert: ''
    });
    let solvedBoard = sudoku.solve(this.state.board);
    if (this.state.width <= 910) {
      this.toggleMenu();
    }
    if (!this.state.cheated && solvedBoard === this.state.board) {
      this.setState({
        alert: solved
      });
      alertClass = 'win';
      return;
    }
    if (solvedBoard) {
      this.setState({
        board: solvedBoard,
        cheated: true
      });
    } else {
      this.setState({
        alert: unsolvable
      });
    }
  }

  check() {
    if (!this.state.cheated) {
      let solvedBoard = sudoku.solve(this.state.board);
      if (this.state.width <= 910) {
        this.toggleMenu();
      }
      if (solvedBoard === this.state.board) {
        this.setState({
          alert: solved
        });
        alertClass = 'win';
        return;
      }
      solvedBoard ? this.setState({ alert: solvable }) : this.setState({ alert: unsolvable });
    } 
  }

  reset() {
    this.setState({
      board: this.state.initialBoard,
      alert: '',
      cheated: false
    });
    alertClass = '';
    if (this.state.width <= 910 && this.state.initialBoard) {
      this.toggleMenu();
    }
  }

  toggleMenu() {
    const menuDiv = document.getElementById('buttons');
    if (menuDiv) menuDiv.classList.toggle('is-not-visible');
    this.state.shownMenu ? this.setState({shownMenu: false, shownBoard: true}) : this.setState({shownMenu: true, shownBoard: false});
    this.setState({
      alert: ''
    });
    if (this.state.initialBoard && this.state.width <= 910) {
      this.toggleBoard();
    }
  }

  toggleBoard() {
    const boardDiv = document.getElementById('board');
    if (boardDiv) boardDiv.classList.toggle('is-not-visible');
  }

  render() {
    const levelsMenu = <LevelsMenu onClick={this.start} />,
      board = <Board
        key="board"
        board={this.state.board}
        cheated={this.state.cheated}
        initialBoard={this.state.initialBoard}
        onChange={this.enterNumber}
      />,
      menu = <div id="buttons">
        <button type="text" onClick={this.toggleLevels}>NEW&nbsp;GAME</button>
        <div className="select">
          <CSSTransitionGroup
            component="div"
            transitionName="show-levels"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}>
            {this.state.newGame ? levelsMenu : null}
          </CSSTransitionGroup>
        </div>
        <button onClick={this.check}>CHECK</button>
        <button onClick={this.reset}>RESTART</button>
        <button onClick={this.solve}>SOLVE</button>
      </div>,
      alertSpan = <span className={alertClass}>{this.state.alert}</span>;

    return (
      <div className="app">
        <i className="fas fa-bars" onClick={this.toggleMenu}></i>
        <div className="container clearfix">
          <CSSTransitionGroup
            component="div"
            transitionName="show"
            transitionAppear={true}
            transitionAppearTimeout={1000}
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}>
            {this.state.shownMenu ? menu : null}
          </CSSTransitionGroup>
          <CSSTransitionGroup
            component="div"
            transitionName="show-alert"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}>
            {this.state.alert ? alertSpan : null}
          </CSSTransitionGroup>
          <CSSTransitionGroup
            component="div"
            transitionName="show"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}>
            {this.state.shownBoard ? board : null}
          </CSSTransitionGroup>
        </div>
      </div>
    );
  }
}

export default App;
