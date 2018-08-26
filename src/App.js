import React from 'react';
import './App.css';
import Board from './components/Board.js';
import sudoku from 'sudoku-umd';

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			initialBoard: '',
			board: ''
		};
		this.start = this.start.bind(this);
		this.enterNumber = this.enterNumber.bind(this);
		this.reset = this.reset.bind(this);
		this.solve = this.solve.bind(this);
	}

	start() {
		const newBoard = sudoku.generate('easy');
		this.setState({
			initialBoard: newBoard,
			board: newBoard
		});
	}
	
	enterNumber(el, ind) {
		let boardArray = this.state.board.split('');
		let newBoard = boardArray.map( (tile, i) => { 
			if (i === ind) {
				return tile = el;
			}
			return tile;
		});

		let newBoardString = newBoard.join('');

		this.setState({
			board: newBoardString
		});
		console.log(this.state.board);
	}

	solve() {
		let solvedBoard = sudoku.solve(this.state.board);
		if (solvedBoard) {
			this.setState({
				board: solvedBoard
			});
		} else {
			alert('Sorry, this sudoku can\'t be solved. You\'ve made a mistake. Try again!');
		}
	}

	check() {
		let solvedBoard = sudoku.solve(this.state.board);
		if (solvedBoard) {
			alert('Keep solving! You\'re on the right way :-)');
		} else {
			alert('Sorry, this sudoku can\'t be solved. You\'ve made a mistake. Try again!');
		}
	}

	reset() {
		this.setState({
			board: this.state.initialBoard
		});
	}

	render() {
		return (
			<div className="App">
				<h1>Sudoku</h1>
				<Board 
					board={this.state.board} 
					onChange={this.enterNumber}
				/>
				<div className="buttons">
					<button onClick={this.check}>Check</button>
					<button onClick={this.start}>New Game</button>
					<button onClick={this.solve}>Solve</button>
					<button onClick={this.reset}>Restart</button>
				</div>
			</div>
		);
	}
}

export default App;
