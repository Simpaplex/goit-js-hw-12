import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export const galleryList = document.querySelector('.js-gallery');
export const loader = document.querySelector('.loader');
export const loadMoreBtn = document.querySelector('.load-more-btn');

export const BASE_URL = 'https://pixabay.com/api/';
export const API_KEY = '51361709-3ae7eddc83ad637b7c3fc8345';
export const perPage = 15;

export const defaultParams = {
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  per_page: perPage,
};

export function clearGallery() {
  galleryList.innerHTML = '';
}

export function showLoader() {
  loader.classList.remove('hidden');
}

export function hideLoader() {
  loader.classList.add('hidden');
}

export function showLoadMoreButton() {
  loadMoreBtn.classList.replace('hidden', 'load-more-btn');
}

export function hideLoadMoreButton() {
  loadMoreBtn.classList.add('load-more-btn', 'hidden');
}

let lightbox = null;

export function refreshLightbox() {
  if (lightbox) {
    lightbox.refresh();
  } else {
    lightbox = new SimpleLightbox('.js-gallery a', {
      captionsData: 'alt',
      captionDelay: 500,
      doubleTapZoom: 1.2,
      maxZoom: 4,
      disableScroll: true,
    });
  }
}

export function checkLoadMoreButton(currentPage, totalPages) {
  if (currentPage >= totalPages) {
    hideLoadMoreButton();
    iziToast.warning({
      title: '⚠️ Warning',
      message: `We're sorry, but you've reached the end of search results.`,
      position: 'topRight',
      timeout: 4000,
    });
  } else {
    showLoadMoreButton();
  }
}
