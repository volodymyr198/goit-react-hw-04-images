import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ image, onImageClick }) => {
    return (
        <li className={css.imageGalleryItem}>
            <img
                className={css.imageGalleryItemImage}
                src={image.webformatURL}
                alt={image.tags}
                onClick={() => onImageClick(image.largeImageURL)}
            />
        </li>
    );
};

ImageGalleryItem.propTypes = {
    image: PropTypes.shape({
        webformatURL: PropTypes.string.isRequired,
        tags: PropTypes.string.isRequired,
    }).isRequired,
    onImageClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
