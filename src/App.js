import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import Board from './components/Board';
import LevelsMenu from './components/LevelsMenu';
import sudoku from 'sudoku-umd';
import './App.css';
import './AppMediaQueries.css';
import * as bubbly from 'bubbly-bg';

function makeBubbles(colorStart, colorStop) {
  const winWidth = window.innerWidth;
  let bubbles = winWidth <= 910 ? 7 : 23;
  window.bubbly({
    colorStart: colorStart,
    colorStop: colorStop,
    bubbleFunc: () => `hsla(${Math.random() * 360}, 100%, 50%, ${Math.random() * 0.3})`,
    blur: 6,
    shadowColor: '#DDE7F2',
    bubbles: bubbles,
  });
}

const colors = [
    ['#5D4157', '#A8CABA'],
    ['#6900ff', '#9951ff'],
    ['#c21500', '#ffc500'],
    ['#FC354C', '#0ABFBC'],
    ['#000428', '#004e92'],
    ['#544a7d', '#ffd452'],
    ['#009FFF', '#ec2F4B'],
    ['#200122', '#6f0000']
  ],
  colorsLength =  colors.length;

const unsolvable = 'You\'ve made a mistake somewhere. Try again!',
  solvable = 'Keep solving! You\'re on the right way :-)',
  solved = 'You\'ve solved the sudoku! Wow!',
  noStorage = 'Sorry! Your browser doesn\'t support local storage or you\'re in private browsing mode',
  saved = 'Saved! You can return any time :-)';
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
      colorIndex: 0,
      width: window.innerWidth,
      isStorageAvailable: this.props.isStorageAvailable 
    };

    this.start = this.start.bind(this);
    this.enterNumber = this.enterNumber.bind(this);
    this.reset = this.reset.bind(this);
    this.solve = this.solve.bind(this);
    this.check = this.check.bind(this);
    this.toggleLevels = this.toggleLevels.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.toggleBoard = this.toggleBoard.bind(this);
    this.changeColor = this.changeColor.bind(this);
    this.setColor = this.setColor.bind(this);
    this.save = this.save.bind(this);
    this.load = () => {
      this.state.colorIndex = localStorage.getItem('colorIndex');
      this.state.initialBoard = localStorage.getItem('initialBoard');
      this.state.board = localStorage.getItem('board');
      this.state.shownBoard = true;
      this.state.width <= 910 ? this.state.shownMenu = false : null;
      this.setColor();
    };

    localStorage.length ? this.load() : this.setColor();
  }

  save() {
    if (this.state.initialBoard) {
      if (this.state.isStorageAvailable) {
        localStorage.setItem('colorIndex', this.state.colorIndex);
        localStorage.setItem('initialBoard', this.state.initialBoard);
        localStorage.setItem('board', this.state.board);
        this.state.width <= 910 ? this.toggleMenu() : null;
        this.setState({alert: saved});
      } else {
        this.setState({alert: noStorage});
      }
    } 
  }

  changeColor() {
    let newColorIndex = this.state.colorIndex;
    newColorIndex++;
    if (newColorIndex >= colorsLength) newColorIndex = 0;
    this.setState({
      colorIndex: newColorIndex,
      alert: ''
    }, function() {
      this.setColor();
    });
  }

  setColor() {
    makeBubbles(colors[this.state.colorIndex][0], colors[this.state.colorIndex][1]);
    let canvas = document.getElementsByTagName('canvas');
    canvas.length > 1 ? canvas[0].remove() : null;
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
      localStorage.clear();
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
        localStorage.clear();
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
        <button onClick={this.save}>SAVE</button>
        <button onClick={this.changeColor}>COLOR</button>
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
