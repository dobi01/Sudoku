import React from 'react';

class Tile extends React.Component {

	render() {
		return (
			<input type='number' min='1' max='9' onChange={this.props._change} value={this.props.value} />
		);
	}
}

export default Tile;
