import React from 'react';
import sudoku from 'sudoku-umd';
import Tile from './Tile.js';

class Board extends React.Component {

	render() {

		let boardArrayOfStrings = this.props.initialBoard.split('');

		return (
			<form>
				{boardArrayOfStrings.map((el, ind) => (
					<Tile 
						key={ind} 
						onChange={event => this.props.onChange(event, ind)} 
						value={el === '.' ? '' : el}
						readOnly={this.props.initialBoard[ind] == '.' ? false : true}
					/>
				))}
			</form>
		);
	}
}

export default Board;