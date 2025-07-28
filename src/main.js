import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api';
import { createGallery } from './js/render-functions';
import {
  showLoader,
  hideLoader,
  clearGallery,
  showLoadMoreButton,
  hideLoadMoreButton,
  perPage,
  checkLoadMoreButton,
  loadMoreBtn
} from './js/helpers';

let currentPage = 1;
let totalPages = 0;
let query = '';

const searchForm = document.querySelector('.js-form');


searchForm.addEventListener('submit', handleSubmit);
loadMoreBtn.addEventListener('click', handleLoadMore);

export async function handleSubmit(event) {
  event.preventDefault();

  const inputText = searchForm.elements['search-text'];
  query = inputText.value.trim();

  if (!query) {
    iziToast.error({
      title: 'Error',
      message: 'field must not be empty',
      position: 'topRight',
    });
    return;
  }

  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(query, (currentPage = 1));
    if (!data.hits.length) {
      iziToast.warning({
        title: '⚠️ Warning',
        message: `Sorry, there are no images matching your "${query}". Please try again!`,
        position: 'topRight',
        timeout: 4000,
      });
      return;
    }
    totalPages = Math.ceil(data.totalHits / perPage);
    createGallery(data.hits);
    checkLoadMoreButton(currentPage, totalPages);
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: error.message,
      position: 'topRight',
    });
  } finally {
    searchForm.reset();
    hideLoader();
  }
}

export async function handleLoadMore() {
  currentPage++;
  hideLoadMoreButton();
  showLoader();
  try {
    const data = await getImagesByQuery(query, currentPage);
    createGallery(data.hits);
    let galleryListItem = document.querySelector('.gallery-item');
    let hightItem = galleryListItem.getBoundingClientRect().height;
    window.scrollBy({
      top: hightItem * 2 + 40,
      behavior: 'smooth',
    });
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: error.message,
      position: 'topRight',
    });
  } finally {
    checkLoadMoreButton(currentPage, totalPages);
    hideLoader();
  }
}
