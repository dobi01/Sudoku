import React from 'react';
import {levels} from '../data/data';

const LevelsMenu = (props) => 
  <div key={this.className} className="levels-menu">
    {Object.keys(levels).map(level => {
      let levelsValue = levels[level];
      return <button
        className="levels"
        key={levelsValue}
        value={level}
        onClick={e => props.start(e)}>
        {levelsValue}
      </button>;
    })}
  </div>;

export default LevelsMenu;