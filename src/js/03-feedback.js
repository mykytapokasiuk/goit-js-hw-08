import { save, load } from './functions.js';
import throttle from 'lodash.throttle';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const variables = {
  formelement: document.querySelector('.feedback-form'),
  localstorage_value: {
    email: '',
    message: '',
  },
  localstorage_key: 'feedback-form-state',
};

updateFormInputs();
/**
 * Gets data from form input fields, saves result to local storage
 */
const getFormData = () => {
  variables.localstorage_value.email =
    variables.formelement.elements.email.value;
  variables.localstorage_value.message =
    variables.formelement.elements.message.value;
  save(variables.localstorage_key, variables.localstorage_value);
};

/**
 * Updates form input fields after page reload
 */
function updateFormInputs() {
  const dataFromLocalStorage = load(variables.localstorage_key);
  if (dataFromLocalStorage === undefined) {
    (variables.formelement.elements.email.value = ''),
      (variables.formelement.elements.message.value = '');
    return;
  }
  setTimeout(() => {
    variables.formelement.elements.email.value = dataFromLocalStorage.email;
    variables.formelement.elements.message.value = dataFromLocalStorage.message;
  }, 2000);
  Loading.dots('Loading data from local storage...', {
    backgroundColor: 'rgba(255, 250, 240, 0.7)',
    messageFontSize: '22px',
    messageColor: '#000000',
    svgSize: '60',
    svgColor: '#000000',
  });
  Loading.remove(2000);
}

/**
 * Deletes form data from local storage, resets the form, writes form data from local storage to the console
 * @param {event} event
 */
const onSubmit = event => {
  event.preventDefault();
  if (
    variables.formelement.elements.email.value === '' ||
    variables.formelement.elements.message.value === ''
  ) {
    Notify.failure('Please, fill in all the form fields', {
      width: '350px',
      showOnlyTheLastOne: true,
      position: 'right-bottom',
      distance: '50px',
      timeout: 2000,
      fontSize: '20px',
      borderRadius: '8px',
      cssAnimationStyle: 'from-bottom',
    });
    return;
  }
  const dataFromLocalStorage = load(variables.localstorage_key);
  console.log(dataFromLocalStorage);
  localStorage.removeItem(variables.localstorage_key);
  variables.formelement.reset();
  Notify.success('Thanks for the feedback!', {
    width: '350px',
    showOnlyTheLastOne: true,
    position: 'right-top',
    distance: '50px',
    timeout: 2000,
    fontSize: '20px',
    borderRadius: '8px',
    cssAnimationStyle: 'from-top',
  });
};

variables.formelement.addEventListener('input', throttle(getFormData, 500));
variables.formelement.addEventListener('submit', onSubmit);
