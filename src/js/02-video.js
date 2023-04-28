import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const refs = {
  iframe: document.querySelector('iframe'),
  container: document.querySelector('.container'),
};

const player = new Player(refs.iframe);

player.on(
  'timeupdate',
  throttle(data => {
    try {
      const dataToStorage = JSON.stringify(data.seconds);
      localStorage.setItem('videoplayer-current-time', dataToStorage);
    } catch (error) {
      console.error(`${error.name} ${error.message}`);
    }
  }, 1000)
);

/**
 * Creates markup for message
 * @param {string} text
 * @returns {string} String with markup
 */
const createMessage = text => {
  return `
  <div class="message-box">
  <p class="message-text">${text}</p>
</div>
`;
};

/**
 * Sets the playback time for the player from the previous browser session, shows a window with this time
 */
const onPageLoad = () => {
  try {
    const dataFromStorage = localStorage.getItem('videoplayer-current-time'),
      parsedData = JSON.parse(dataFromStorage);
    player
      .setCurrentTime(parsedData)
      .then(seconds => {
        const minutes = Math.floor(seconds / 60),
          sec = Math.floor(seconds - minutes * 60),
          createdMessage = createMessage(
            `Video was stopped at ${minutes}.${sec}`
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
  } catch (error) {
    console.error(`${error.name} ${error.message}`);
  }
};

window.addEventListener('load', onPageLoad);
