import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import LevelsMenu from './LevelsMenu';

const MainMenu = (props) => 
  <div id="buttons">
    <button type="text" onClick={props.toggleLevels}>NEW&nbsp;GAME</button>
    <div className="select">
      <CSSTransitionGroup
        component="div"
        transitionName="show-levels"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}>
        {props.newGame && <LevelsMenu start={props.start} />}
      </CSSTransitionGroup>
    </div>
    <button onClick={props.check}>CHECK</button>
    <button onClick={props.reset}>RESTART</button>
    <button onClick={props.solve}>SOLVE</button>
    <button onClick={props.save}>SAVE</button>
    <button onClick={props.changeColor}>COLOR</button>
  </div>;

export default MainMenu;