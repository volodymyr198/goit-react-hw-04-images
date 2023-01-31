import React, { Component } from 'react';
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

class App extends Component {
    state = {
        images: [],
        page: 1,
        searchQuery: '',
        isLoading: false,
        isModalOpen: false,
        largeImageURL: '',
        totalHits: '',
    };
    //-----------------------форма-сабмит----------------
    searchImage = value => {
        if (value !== this.state.searchQuery) {
            this.setState({
                images: [],
                page: 1,
                searchQuery: '',
            });
        }

        if (value !== '') {
            this.setState({ searchQuery: value });
        }
    };
    // -------------------------запрос------------------
    async fetchImages() {
        if (this.state.searchQuery === '') {
            return;
        }

        const url = `${BASE_URL}q=${this.state.searchQuery}&page=${this.state.page}&key=${KEY}&per_page=${PER_PAGE}`;

        this.setState({ isLoading: true });
        try {
            const response = await axios.get(url);
            const { data } = await response;
            this.setState({ isLoading: false });

            if (data.totalHits === 0) {
                this.notify();
            }
            this.setState(prevState => ({
                images: [...prevState.images, ...data.hits],
                totalHits: data.totalHits,
            }));
        } catch (error) {
            this.errorNotify();
        }
    }

    //----------кнопка загрузить еще----------------------
    loadMore = () => {
        this.setState(prevState => ({
            page: prevState.page + 1,
        }));
    };
    //----------------клик по картинке----открываем модалку------
    onImageClick = largeImageURL => {
        this.setState({
            largeImageURL,
            isModalOpen: true,
        });
    };
    //------------------закрываем модалку---------------------
    onCloseModal = () => {
        this.setState({
            isModalOpen: false,
        });
    };

    onCloseBackdropClick = e => {
        if (e.currentTarget === e.target) {
            this.setState({
                isModalOpen: false,
            });
        }
    };

    //----------метод цикла---вызов запроса-----------
    componentDidUpdate(_, prevState) {
        if (
            prevState.searchQuery !== this.state.searchQuery ||
            prevState.page !== this.state.page
        ) {
            this.fetchImages(this.state.searchQuery);
        }
    }
    //---------очищаем картинки, если инпут пустой---------
    onClearByInput = () => {
        this.setState({ images: [], page: 1, searchQuery: '', totalHits: '' });
    };
    //-----------------нотификашки---------------------------
    notify = () =>
        toast.info(`Sorry, no images found for ${this.state.searchQuery}`, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
        });
    errorNotify = () =>
        toast.error('Unable to connect to server, please try again later', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
        });

    render() {
        const {
            images,
            largeImageURL,
            isLoading,
            isModalOpen,
            totalHits,
            page,
        } = this.state;
        return (
            <div className={css.App}>
                <Searchbar
                    onSubmit={this.searchImage}
                    onClearByInput={this.onClearByInput}
                />
                <ImageGallery
                    images={images}
                    onImageClick={this.onImageClick}
                />
                {totalHits > PER_PAGE &&
                    !isLoading &&
                    totalHits / PER_PAGE > page && (
                        <Button loadMore={this.loadMore} />
                    )}

                {isLoading && <Loader />}

                <ToastContainer />

                {isModalOpen && (
                    <Modal
                        largeImageURL={largeImageURL}
                        onCloseModal={this.onCloseModal}
                        onCloseBackdropClick={this.onCloseBackdropClick}
                    />
                )}
            </div>
        );
    }
}

export default App;
