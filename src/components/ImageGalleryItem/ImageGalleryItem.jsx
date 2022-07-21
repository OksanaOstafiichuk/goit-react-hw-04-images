import PropTypes from 'prop-types';
import { GalleryItem, GalleryImage } from './ImageGalleryItem.stuled';

export const ImageGalleryItem = ({ image, onClick }) => {
  const { webformatURL, tags, largeImageURL } = image;

  return (
    <GalleryItem>
      <GalleryImage
        src={webformatURL}
        alt={tags}
        onClick={() => onClick(largeImageURL)}
      />
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
  onClick: PropTypes.func.isRequired,
};
