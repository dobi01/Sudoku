import React from 'react';

class Tile extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e) {
		this.props.onChange(e.target.value);
	}

	render() {
		return (
			<input type='number' min='1' max='9' onChange={this.handleChange} value={this.props.value} />
		);
	}
}

export default Tile;
