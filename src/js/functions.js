/**
 * Saves data to local storage
 * @param {string} key
 * @param {string} value
 */
const save = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
};

/**
 * Loads data from local storage, checks if data exists
 * @param {string} key
 */
const load = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

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

export { save, load, createMessage };
