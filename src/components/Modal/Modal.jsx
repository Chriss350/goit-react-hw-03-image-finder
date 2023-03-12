import css from './Modal.module.css';

export const Modal = ({ closeModal, img, alt }) => {
  return (
    <div className={css.Overlay} onClick={closeModal}>
      <div className={css.Modal}>
        <img src={img} alt={alt} />
      </div>
    </div>
  );
};
