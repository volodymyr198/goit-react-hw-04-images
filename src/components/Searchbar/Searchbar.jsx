import React, { useState } from 'react';
import { MdOutlineImageSearch } from 'react-icons/md';
import PropTypes from 'prop-types';

import css from './Searchbar.module.css';

const Searchbar = ({ onSubmit, onClearByInput }) => {
    const [searchFormValue, setSearchFormValue] = useState('');

    const handleSubmit = e => {
        e.preventDefault();

        onSubmit(searchFormValue);
    };

    const handleChange = ({ target }) => {
        const { value } = target;

        setSearchFormValue(value);
        if (value === '') {
            onClearByInput();
        }
    };

    return (
        <header className={css.searchbar}>
            <form className={css.form} onSubmit={handleSubmit}>
                <button type="submit" className={css.formButton}>
                    <span className={css.buttonLabel}>
                        <MdOutlineImageSearch />
                    </span>
                </button>

                <input
                    onChange={handleChange}
                    className={css.input}
                    type="text"
                    name="searchFormValue"
                    value={searchFormValue}
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                />
            </form>
        </header>
    );
};

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onClearByInput: PropTypes.func.isRequired,
};

export default Searchbar;
