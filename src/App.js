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
		this.startNewGame = this.startNewGame.bind(this);
		this.enterNumber = this.enterNumber.bind(this);
	}

	startNewGame() {
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

	render() {
		return (
			<div className="App">
				<h1>Sudoku</h1>
				<Board 
					board={this.state.board} 
					onChange={this.enterNumber}
				/>
				<div className="buttons">
					<button>Check</button>
					<button onClick={this.startNewGame}>New Game</button>
					<button>Solve</button>
					<button>Restart</button>
				</div>
			</div>
		);
	}
}

export default App;
