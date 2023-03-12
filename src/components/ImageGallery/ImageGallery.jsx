import css from './ImageGallery.module.css';

export const ImageGallery = ({ children, openModal }) => {
  return (
    <ul className={css.gallery} onClick={openModal}>
      {children}
    </ul>
  );
};
