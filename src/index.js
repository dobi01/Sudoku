import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

function storageAvailable(type) {
  try {
    var storage = window[type],
      x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  }
  catch(e) {
    return e instanceof DOMException && (
      // everything except Firefox
      e.code === 22 ||
      // Firefox
      e.code === 1014 ||
      // test name field too, because code might not be present
      // everything except Firefox
      e.name === 'QuotaExceededError' ||
      // Firefox
      e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage.length !== 0;
  }
}

const isStorageAvailable = storageAvailable('localStorage');

function makeBubbles(colorStart, colorStop) {
  const winWidth = window.innerWidth;
  let bubbles = winWidth <= 910 ? 7 : 23;
  window.bubbly({
    colorStart: colorStart,
    colorStop: colorStop,
    bubbleFunc: () => `hsla(${Math.random() * 360}, 100%, 50%, ${Math.random() * 0.3})`,
    blur: 6,
    shadowColor: '#DDE7F2',
    bubbles: bubbles,
  });
}

ReactDOM.render(<App 
  isStorageAvailable={isStorageAvailable} 
  makeBubbles={makeBubbles} 
/>, 
document.getElementById('root'));

registerServiceWorker();
