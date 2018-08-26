import React from 'react';

const Option = (props) => {
  return (
    <option value={props.value} onChange={e => this.props.onClick(e)}>{props.text}</option>
  );
};

export default Option;