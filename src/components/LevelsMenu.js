import React from 'react';

const levels = {
  easy: 'easy',
  medium: 'medium',
  hard: 'hard',
  'very-hard': 'very hard',
  insane: 'insane',
  inhuman: 'inhuman'
};

class LevelsMenu extends React.Component {

  render() {
    return (
      <div key={this.className} className="levels-menu">
        {Object.keys(levels).map(level => {
          let levelsValue = levels[level];
          return <button
            className="levels"
            key={levelsValue}
            value={level}
            onClick={e => this.props.onClick(e)}>
            {levelsValue}
          </button>;
        })}
      </div>
    );
  }
}

export default LevelsMenu;