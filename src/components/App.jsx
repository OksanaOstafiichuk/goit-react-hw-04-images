import { Component } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import * as Api from '../services/api-service';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';

import { Container } from './App.styled';

export class App extends Component {
  state = {
    searchValue: '',
    page: 1,
    per_page: 12,
    images: [],
    showModal: false,
    largeImageURL: '',
    isLoader: false,
    isLoadMore: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchValue, page, per_page } = this.state;

    if (prevState.searchValue !== searchValue || prevState.page !== page) {
      this.setState({ isLoader: true });

      this.fetchImages(searchValue, page, per_page);
    }
  }

  fetchImages = (searchValue, page, per_page) => {
    Api.apiService(searchValue, page, per_page)
      .then(({ hits, totalHits }) => {
        const { page, per_page } = this.state;

        if (hits.length === 0) {
          this.setState({ isLoader: false });

          toast.error('Sorry, but nothing was found for your query. Try again');
          return;
        }

        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
          isLoadMore: page < Math.ceil(totalHits / per_page),
        }));
        this.setState({ isLoader: false });
      })
      .catch(error => console.log(error));
  };

  hendlrSubmitForm = searchValue => {
    this.setState({ searchValue, page: 1, images: [] });
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  toggleModal = img => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
      largeImageURL: img,
    }));
  };

  render() {
    const { images, showModal, largeImageURL, isLoader, isLoadMore } =
      this.state;

    return (
      <Container>
        <Searchbar onSubmit={this.hendlrSubmitForm} />
        {images.langth !== 0 && (
          <ImageGallery images={images} onClick={this.toggleModal} />
        )}
        {isLoadMore && <Button onClick={this.loadMore} />}
        {isLoader && <Loader />}

        {showModal && (
          <Modal imgLarg={largeImageURL} onClose={this.toggleModal} />
        )}
        <ToastContainer autoClose={3000} />
      </Container>
    );
  }
}
