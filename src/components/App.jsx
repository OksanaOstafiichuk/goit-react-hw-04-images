import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import * as Api from '../services/api-service';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';

import { Container } from './App.styled';

export const App = () => {
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [per_page] = useState(12);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');

  useEffect(() => {
    if (searchValue === '') {
      return;
    }

    setIsLoader(true);

    Api.apiService(searchValue, page, per_page)
      .then(({ hits, totalHits }) => {
        if (hits.length === 0) {
          toast.error('Sorry, but nothing was found for your query. Try again');
          setIsLoader(false);
          return;
        }

        setImages(prevState => [...prevState, ...hits]);
        setIsLoadMore(page < Math.ceil(totalHits / per_page));
        setIsLoader(false);
      })
      .catch(error => console.log(error));
  }, [page, per_page, searchValue]);

  const hendlrSubmitForm = searchValue => {
    setSearchValue(searchValue);
    setPage(1);
    setImages([]);
  };

  const toggleModal = largeImageURL => {
    setShowModal(!showModal);
    setLargeImageURL(largeImageURL);
  };

  const loadMore = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <Container>
      <Searchbar onSubmit={hendlrSubmitForm} />
      {images.langth !== 0 && (
        <ImageGallery images={images} onClick={toggleModal} />
      )}
      {isLoadMore && <Button onClick={loadMore} />}
      {isLoader && <Loader />}

      {showModal && <Modal imgLarg={largeImageURL} onClose={toggleModal} />}
      <ToastContainer autoClose={3000} />
    </Container>
  );
};
