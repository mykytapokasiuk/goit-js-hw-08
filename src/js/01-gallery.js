import simpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { galleryItems } from './gallery-items';

const refs = {
  targetElement: document.querySelector('.gallery'),
};

const variables = {
  modal: document.createElement('div'),
  modalBox: document.createElement('div'),
  modalText: document.createElement('p'),
  modalOkBtn: document.createElement('button'),
  modalCancelBtn: document.createElement('button'),
  modalLink: document.createElement('a'),
};

/**
 * Creates markup for one gallery item
 * @param {object} galleryItem
 * @returns {string} String with markup
 */
const createGalleryElement = galleryItem => {
  const { preview, original, description } = galleryItem;
  return `
    <li class="gallery__item">
   <a class="gallery__link" href=${original}>
      <img class="gallery__image" src=${preview} alt=${description} />
   </a>
</li>`;
};

const createdGallery = galleryItems.map(createGalleryElement).join('');
refs.targetElement.insertAdjacentHTML('afterbegin', createdGallery);

const lightbox = new simpleLightbox('.gallery > li a', {
  captionsData: 'alt',
  navText: ['〈', '〉'],
  captionDelay: 250,
  overlayOpacity: 0.3,
});

/**
 * Creates modal window
 */
const createModal = () => {
  variables.modal.classList.add('modal', 'active');
  variables.modalBox.classList.add('modalbox');
  variables.modalOkBtn.classList.add('modal_btn', 'modalok_btn');
  variables.modalCancelBtn.classList.add('modal_btn');
  variables.modalText.textContent = 'Want to see more beautiful photos?';
  variables.modalOkBtn.setAttribute('type', 'button');
  variables.modalOkBtn.textContent = 'Ok';
  variables.modalCancelBtn.setAttribute('type', 'button');
  variables.modalCancelBtn.textContent = 'Cancel';
  variables.modalLink.setAttribute('href', 'https://pixabay.com/');
  variables.modalLink.setAttribute('target', '_blank');
  variables.modalLink.setAttribute('rel', 'noreferrer noopener nofollow');
  variables.modalLink.appendChild(variables.modalOkBtn);
  variables.modalBox.append(
    variables.modalText,
    variables.modalLink,
    variables.modalCancelBtn
  );
  variables.modal.appendChild(variables.modalBox);
  document.body.appendChild(variables.modal);
  variables.modalOkBtn.addEventListener('click', () => {
    variables.modal.remove();
  });
  variables.modalCancelBtn.addEventListener('click', () => {
    variables.modal.remove();
  });
};

lightbox.on('closed.simplelightbox', createModal);
