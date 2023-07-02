import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import './charList.scss';

import MarvelService from '../../services/MarvelService';
import ErrorMassage from '../errorMassage/ErrorMassage';
import Spinner from '../spinner/Spinner';

const CharList = (props) => {

    const [charList, setCharList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(320);
    const [charEnded, setCharEnded] = useState(false);

    const marvelService = new MarvelService();

    useEffect(() => {
        onRequest()
    }, [])

    const onRequest = (offset) => {
        onCharListLoading();
        marvelService.getAllCharacters(offset)
            .then(onCharListLoaded)
            .catch(onError)
    }

    const onCharListLoading = () => {
        setNewItemLoading(true);
    }

    const onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }

        setCharList(charList => [...charList, ...newCharList]);
        setLoading(loading => false);
        setNewItemLoading(newItemLoading => false);
        setOffset(offset => offset + 10);
        setCharEnded(charEnded => ended);

        
    }

    const onError = () => {
        setError(error => true)
        setLoading(loading => false);
    }


    let myRef = useRef(null);
    const onSetRef = elem => {
        myRef = elem;
    }

    const refFocus = (e) => {

        const { children } = myRef;
        const { parentElement } = e.target;

        for (let i = 0; i < children.length; i++) {
            children[i].classList.remove('char__item_selected');

            if (parentElement === children[i]) {
                children[i].classList.add('char__item_selected');
            }
        }
    }

    const renderItems = (arr) => {
        const items = arr.map((item) => {
            return (
                <li
                    className="char__item "
                    key={item.id}
                    onClick={() => { props.onCharSelected(item.id) }}
                >
                    {item.thumbnail.includes("image_not_available")
                        ? <img src={item.thumbnail} alt={item.name} style={{ objectFit: 'unset' }} />
                        : <img src={item.thumbnail} alt={item.name} style={{ objectFit: 'cover' }} />}

                    <div className="char__name">{item.name}</div>
                </li>
            )
        });
        return (
            <ul className="char__grid"
                ref={onSetRef}
                onClick={refFocus}>
                {items}
            </ul>
        )
    }


    const items = renderItems(charList);

    const errorMessage = error ? <ErrorMassage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? items : null;

    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            {content}
            <button
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{ 'display': charEnded ? 'none' : 'block' }}
                onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

CharList.propTypes = {
    onCharSelected: PropTypes.func
}

export default CharList