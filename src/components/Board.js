import React from 'react';
import Tile from './Tile.js';

class Board extends React.Component {

	render() {

		let boardArrayOfStrings = this.props.board.split('');

		return (
			<form> 
				{boardArrayOfStrings.map((el, ind) => (
					<Tile 
						key={ind} 
						onChange={e => this.props.onChange(e, ind)} 
						value={el === '.' ? '' : el}
						// readOnly={boardArrayOfStrings[ind] === '.' ? false : true}
					/>
				))}
			</form>
		);
	}
}

export default Board;
