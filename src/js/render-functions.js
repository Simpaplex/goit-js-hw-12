import { refreshLightbox, galleryList } from './helpers';

export function createGallery(images) {
  const markup = images
    .map(({ largeImageURL, webformatURL, tags, ...rest }) => {
      const trimmedTags = tags
        .split(',')
        .map(tag => tag.trim())
        .slice(0, 3)
        .join(',');
      const infoItems = ['Likes', 'Views', 'Comments', 'Downloads']
        .map(
          item => `
            <li class="images-info-item">
              <h3 class="images-info-subtitle">${item}</h3>
              <p class="images-info-value">${rest[item.toLowerCase()]}</p>
            </li>`
        )
        .join('');
      return `<li class="gallery-item">
          <a class="gallery-link" href="${largeImageURL}">
            <img class="gallery-image" src="${webformatURL}" alt="${trimmedTags}" />
            <ul class="images-info-list">${infoItems}</ul>
          </a>
        </li>`;
    })
    .join('');
  galleryList.insertAdjacentHTML('beforeend', markup);
  refreshLightbox();
  }
