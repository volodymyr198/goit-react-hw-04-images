import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Loader from '../Loader/Loader';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';
import ImageGallery from '../ImageGallery/ImageGallery';
import Searchbar from '../Searchbar/Searchbar';
import css from '../App/App.module.css';

const PER_PAGE = 12;
const KEY = '31814066-d36b2cc87cac42beedbbff451';
const BASE_URL =
    'https://pixabay.com/api/?&image_type=photo&orientation=horizontal&';

const App = () => {
    const [images, setImages] = useState([]);
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [largeImageURL, setLargeImageurl] = useState('');
    const [totalHits, setTotalHits] = useState('');

    //-----------------------форма-сабмит----------------
    const searchImage = value => {
        if (value !== searchQuery) {
            setImages([]);
            setPage(1);
            setSearchQuery('');
        }

        if (value !== '') {
            setSearchQuery(value);
        }
    };

    // -------------------------запрос------------------
    useEffect(() => {
        const fetchImages = async () => {
            if (searchQuery === '') {
                return;
            }

            const url = `${BASE_URL}q=${searchQuery}&page=${page}&key=${KEY}&per_page=${PER_PAGE}`;
            setIsLoading(true);
            try {
                const response = await axios(url);
                const { data } = response;

                setIsLoading(false);

                if (data.totalHits === 0) {
                    toast.info(`Sorry, no images found for ${searchQuery}`, {
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: 2000,
                    });
                }
                setImages(prevState => [...prevState, ...data.hits]);
                setTotalHits(data.totalHits);
            } catch (error) {
                errorNotify();
                setIsLoading(false);
            }
        };
        fetchImages();
    }, [searchQuery, page]);
    //----------кнопка загрузить еще----------------------
    const loadMore = () => {
        setPage(() => page + 1);
    };
    //----------------клик по картинке----открываем модалку------
    const onImageClick = largeImageURL => {
        setLargeImageurl(largeImageURL);
        setIsModalOpen(true);
    };
    //------------------закрываем модалку---------------------
    const onCloseModal = () => {
        setIsModalOpen(false);
    };

    const onCloseBackdropClick = e => {
        if (e.currentTarget === e.target) {
            setIsModalOpen(false);
        }
    };

    //---------очищаем картинки, если инпут пустой---------
    const onClearByInput = () => {
        setImages([]);
        setPage(1);
        setSearchQuery('');
        setTotalHits('');
    };
    //-----------------нотификашки---------------------------

    const errorNotify = () =>
        toast.error('Unable to connect to server, please try again later', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
        });

    return (
        <div className={css.App}>
            <Searchbar onSubmit={searchImage} onClearByInput={onClearByInput} />
            <ImageGallery images={images} onImageClick={onImageClick} />
            {!isLoading && images.length > 0 && images.length < totalHits && (
                <Button loadMore={loadMore} />
            )}
            {isLoading && <Loader />}

            <ToastContainer />

            {isModalOpen && (
                <Modal
                    largeImageURL={largeImageURL}
                    onCloseModal={onCloseModal}
                    onCloseBackdropClick={onCloseBackdropClick}
                />
            )}
        </div>
    );
};

export default App;
