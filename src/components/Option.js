import React from 'react';

const Option = (props) => {
  return (
    <button className="levels" value={props.value} onClick={e => props.onClick(e)}>{props.text}</button>
  );
};

export default Option;