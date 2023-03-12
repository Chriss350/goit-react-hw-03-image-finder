import PropTypes from 'prop-types';

export const Search = ({ changeHandler, submitHandler }) => {
  return (
    <form
      onSubmit={submitHandler}
      className="input-group w-25 align-middle align-baselin"
    >
      <input
        type="text"
        className="form-control"
        placeholder="Search images and photos"
        onChange={changeHandler}
      />
      <button
        className="btn btn-outline-secondary"
        type="submit"
        id="button-addon2"
      >
        Search
      </button>
    </form>
  );
};

Search.propTypes = {
  changeHandler: PropTypes.func,
  submitHandler: PropTypes.func,
};
