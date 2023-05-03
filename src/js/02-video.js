import Player from '@vimeo/player';
import throttle from 'lodash.throttle';
import { save, load, createMessage } from './functions.js';

const refs = {
  iframe: document.querySelector('iframe'),
  container: document.querySelector('.container'),
};

const variables = {
  player: null,
  dataFromStorage: load('videoplayer-current-time'),
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
 * Converts local storage value (float) to minutes and seconds
 * @param {number} time
 */
const convertTime = time => {
  variables.minutes = Math.floor(time / 60);
  variables.sec = Math.floor(time - variables.minutes * 60);
  variables.minutes =
    variables.minutes < 10 ? `0${variables.minutes}` : `${variables.minutes}`;
  variables.sec = variables.sec < 10 ? `0${variables.sec}` : `${variables.sec}`;
};
/**
 * Shows a modal window with playback time saved in local storage
 */
const attachMessage = () => {
  convertTime(variables.dataFromStorage);
  const createdMessage = createMessage(
    `Video was stopped at ${variables.minutes}:${variables.sec}`
  );
  refs.container.insertAdjacentHTML('afterbegin', createdMessage);
  const messageBoxRef = document.querySelector('.message-box ');
  messageBoxRef.classList.toggle('active');
  setTimeout(() => {
    messageBoxRef.classList.toggle('active');
  }, 4000);
};
/**
 * Sets the playback time for the player from the previous browser session
 */
const onPageLoad = () => {
  variables.dataFromStorage === undefined
    ? (variables.dataFromStorage = 0)
    : attachMessage();
  variables.player.setCurrentTime(variables.dataFromStorage);
  window.removeEventListener('load', onPageLoad);
};
window.addEventListener('load', onPageLoad);
