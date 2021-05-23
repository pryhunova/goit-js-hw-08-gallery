import galleryItems from './gallery-items.js';

const refs = {
    galleryContainer: document.querySelector('.js-gallery'),
    lightbox: document.querySelector('.js-lightbox'),
    lightboxImage: document.querySelector('.lightbox__image'),
    lightboxCloseBtn: document.querySelector('[data-action="close-lightbox"]'),
    lightboxOverlay: document.querySelector(".lightbox__overlay"),
};

refs.galleryContainer.addEventListener('click', onGalleryItemClick);
refs.lightboxCloseBtn.addEventListener('click', onCloseModal);
refs.lightboxOverlay.addEventListener('click', onBackdropClick)

/*добавляет коллекцию в виде шаблонной строки*/
const galleryMarkup = createGalleryCardsMarkup(galleryItems);

function createGalleryCardsMarkup(galleryItems) {
  return galleryItems
    .map(({ preview,  original, description }, index) => {
      return `
    <li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      data-index="${index}"
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>
    `;
    })
    .join('');
}

refs.galleryContainer.insertAdjacentHTML('beforeend', galleryMarkup);

/*слушает клики, preventDefault - отменяет любое действие по умолчанию*/

function onGalleryItemClick(evt) {
evt.preventDefault()
   if (!evt.target.classList.contains('gallery__image')) {
    return;
  }
  setAttribute(evt)
   onOpenModal();
}
  
/*открывает модалку*/
function onOpenModal(evt) {
   window.addEventListener('keydown', onEscKeyPress);
  refs.lightbox.classList.add('is-open');
  refs.lightboxCloseBtn.addEventListener("click", onCloseModal); //добавляет слушателя события кнопки "закрыть"
    setAttribute(evt);
}
  
/*закрывает модалку */
function onCloseModal() {
  window.removeEventListener('keydown', onEscKeyPress);
refs.lightbox.classList.remove('is-open');
refs.lightboxCloseBtn.removeEventListener("click", onCloseModal); //убирает слушателя события кнопки "закрыть"
}
  
/*закрывает кнопкой ESC*/
function onEscKeyPress(evt) {
  const ESC_KEY_CODE = 'Escape';
  const isEscKey = evt.code === ESC_KEY_CODE; 

  if (isEscKey) {
    onCloseModal();
  }
}

/*Кликнули именно в бекдроп*/
function onBackdropClick(evt) {
  if (evt.currentTarget === evt.target) {
        onCloseModal();
  }
}

/*Очистка значения атрибута src элемента img.lightbox__image
Это необходимо для того, чтобы при следующем открытии модального окна, пока грузится изображение, мы не видели предыдущее.*/
function setAttribute(evt) {
  refs.lightboxImage.src = evt.target.dataset.source;
  refs.lightboxImage.alt = evt.target.alt;
}