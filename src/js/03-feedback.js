import { save, load } from './functions.js';
import throttle from 'lodash.throttle';

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
  variables.formelement.elements.email.value = dataFromLocalStorage.email;
  variables.formelement.elements.message.value = dataFromLocalStorage.message;
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
    alert('Please, fill in all the form fields');
    return;
  }
  const dataFromLocalStorage = load(variables.localstorage_key);
  console.log(dataFromLocalStorage);
  localStorage.removeItem(variables.localstorage_key);
  variables.formelement.reset();
};

variables.formelement.addEventListener('input', throttle(getFormData, 500));
variables.formelement.addEventListener('submit', onSubmit);
