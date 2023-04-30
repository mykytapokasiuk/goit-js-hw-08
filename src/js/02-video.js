import Player from '@vimeo/player';
import throttle from 'lodash.throttle';
import { save, load, createMessage } from './functions.js';

const refs = {
  iframe: document.querySelector('iframe'),
  container: document.querySelector('.container'),
};

const variables = {
  player: null,
  dataToStorage: '',
  dataFromStorage: localStorage.getItem('videoplayer-current-time'),
  createdMessage: '',
  minutes: 0,
  sec: 0,
};

variables.player = new Player(refs.iframe);
variables.player.on(
  'timeupdate',
  throttle(data => {
    save('videoplayer-current-time', data.seconds);
  }, 1000)
);

/**
 * Sets the playback time for the player from the previous browser session, shows a window with this time
 */
const onPageLoad = () => {
  load('videoplayer-current-time');
  const parsedData = JSON.parse(variables.dataFromStorage);
  variables.player
    .setCurrentTime(parsedData)
    .then(seconds => {
      (variables.minutes = Math.floor(seconds / 60)),
        (variables.sec = Math.floor(seconds - variables.minutes * 60));
      const createdMessage = createMessage(
        `Video was stopped at ${variables.minutes}.${variables.sec}`
      );

      refs.container.insertAdjacentHTML('afterbegin', createdMessage);
      const messageBoxRef = document.querySelector('.message-box ');
      messageBoxRef.classList.toggle('active');
      setTimeout(() => {
        messageBoxRef.classList.toggle('active');
      }, 4000);
    })
    .catch(error => {
      console.error(`${error.name} ${error.message}`);
    });
};
window.addEventListener('load', onPageLoad);
