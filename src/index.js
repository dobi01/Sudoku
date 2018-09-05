import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import * as bubbly from 'bubbly-bg';

function makeBubbles(bubbles) {
  window.bubbly({
    colorStart:'#6900ff',
    colorStop:'#9951ff',
    bubbleFunc: () => `hsla(${Math.random() * 360}, 100%, 50%, ${Math.random() * 0.3})`,
    blur: 6,
    shadowColor: '#DDE7F2',
    bubbles: bubbles,
  });
}

const winWidth = window.innerWidth;
winWidth <= 910 ? makeBubbles(7) : makeBubbles(23);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
