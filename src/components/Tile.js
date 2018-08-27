import React from 'react';

class Tile extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    let value = e.target.value;
    if (value.length > 1) { 
      value = value.slice(0, 1);
    } else if (value.length === 0) {
      value = ' ';
    }
    this.props.onChange(value);
  }

  render() {
    return (
      <input      
        type="number"
        min="1"
        max="9"
        pattern="[1-9]*" 
        inputMode="numeric"
        className={this.props.className}
        onChange={this.handleChange}
        value={this.props.value}
        readOnly={this.props.readOnly}
      />);
  }
}

export default Tile;
