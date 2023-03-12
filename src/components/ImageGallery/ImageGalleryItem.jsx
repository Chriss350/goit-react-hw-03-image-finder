import { nanoid } from 'nanoid';
import css from './ImageGallery.module.css';

export const ImageGalleryItem = ({ images }) => {
  return (
    <>
      {images.map(image => (
        <li key={nanoid()} className={css.galleryItem}>
          <img src={image.webformatURL} alt={image.tags} />
        </li>
      ))}
    </>
  );
};
