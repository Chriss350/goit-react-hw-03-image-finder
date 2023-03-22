import { Component } from 'react';
import PropTypes from 'prop-types';
import { ThreeCircles } from 'react-loader-spinner';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGallery/ImageGalleryItem';
import { Navbar } from './Navbar/Navbar';
import { Search } from 'components/Search/Search';
import { LoadMore } from './Button/LoadMore';
import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    page: 1,
    images: [],
    isLoaded: false,
    searchInput: '',
    largeImg: '',
    largeImgAlt: '',
    isModalOpen: false,
    totalImages: 0,
    imagesDisplayed: 0,
  };

  fetchImages = (searchValue, page) => {
    try {
      fetch(
        `https://pixabay.com/api/?&key=24785169-ce0e5464f046c25feb9965069&q=${searchValue}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(data => data.json())
        .then(data => {
          this.setState({ totalImages: data.total });
          this.state.page === 1
            ? this.setState({
                images: data.hits,
                page: page + 1,
                imagesDisplayed: data.hits.length,
              })
            : this.setState({
                images: [...this.state.images, ...data.hits],
                page: page + 1,
                imagesDisplayed: this.state.imagesDisplayed + data.hits.length,
              });
        })
        .finally(() => this.setState({ isLoaded: true }));
    } catch (error) {
      console.error(error);
    }
  };

  componentDidMount() {
    this.fetchImages(this.state.searchInput, this.state.page);
  }

  changeHandler = e => {
    const value = e.target.value;
    this.setState({ searchInput: value });
  };

  submitHandler = e => {
    e.preventDefault();
    this.setState({ page: 1 });
    this.fetchImages(this.state.searchInput, this.state.page);
  };

  loadMoreHandler = e => {
    e.preventDefault();
    this.fetchImages(this.state.searchInput, this.state.page);
  };

  closeModalHandler = e => {
    if (e.code === 'Escape') {
      this.setState({ isModalOpen: false });
    }

    this.setState({ isModalOpen: false });
  };

  openModalHandler = e => {
    if (e.target.nodeName !== 'IMG') {
      return;
    }

    this.setState({
      largeImg: e.target.src,
      largeImgAlt: e.target.alt,
      isModalOpen: true,
    });
  };

  render() {
    window.addEventListener('keydown', this.closeModalHandler);

    return (
      <>
        <Navbar>
          <Search
            changeHandler={this.changeHandler}
            submitHandler={this.submitHandler}
          />
        </Navbar>
        <div className="container text-center pt-3">
          {this.state.isLoaded === true ? (
            <ImageGallery openModal={this.openModalHandler}>
              <ImageGalleryItem images={this.state.images} />
            </ImageGallery>
          ) : (
            <ThreeCircles
              height="100"
              width="100"
              color="#343a40"
              wrapperClass="justify-content-center"
              visible={true}
              ariaLabel="three-circles-rotating"
            />
          )}
          {this.state.imagesDisplayed === this.state.totalImages ? (
            <></>
          ) : (
            <LoadMore onClick={this.loadMoreHandler} />
          )}

          {this.state.isModalOpen === true ? (
            <Modal
              closeModal={this.closeModalHandler}
              img={this.state.largeImg}
              alt={this.state.largeImgAlt}
            />
          ) : (
            <></>
          )}
        </div>
      </>
    );
  }
}

App.propTypes = {
  page: PropTypes.number,
  images: PropTypes.array,
  isLoaded: PropTypes.bool,
  searchInput: PropTypes.string,
  largeImg: PropTypes.string,
  largeImgAlt: PropTypes.string,
  isModalOpen: PropTypes.bool,
  totalImages: PropTypes.number,
  imagesDisplayed: PropTypes.number,
};
