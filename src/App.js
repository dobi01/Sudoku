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
	}

	render() {
		return (
			<div className="App">
				<h1>Sudoku</h1>
				<Board board={this.state.board} initialBoard={sudoku.generate('easy')}/>
				<div className="buttons">
					<button>Check</button>
					<button>New Game</button>
					<button>Solve</button>
					<button>Restart</button>
				</div>
			</div>
		);
	}
}



export default App;
