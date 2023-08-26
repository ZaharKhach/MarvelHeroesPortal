import { useEffect, useRef, useState } from "react";
import PropTypes from 'prop-types';

import './Comics.scss'

import useMarvelService from '../../services/MarvelService';
import ErrorMassage from '../errorMassage/ErrorMessage';
import Spinner from '../spinner/Spinner';

const Comics = (props) => {

    const [comicsList, setComicsList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(320);
    const [charEnded, setComicEnded] = useState(false);

    const { loading, error, getAllCharacters, getComics } = useMarvelService();

    useEffect(() => {
        onRequest(offset, true)
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getComics(offset)
            .then(onComicsLoaded)
    }

    const onComicsLoaded = (newComicList) => {
        let ended = false;
        if (newComicList.length < 8) {
            ended = true;
        }

        setComicsList(charList => [...charList, ...newComicList]);
        setOffset(offset=> offset + 10);
        setNewItemLoading(false);
        setComicEnded(ended)
    }

    const renderComics = (arr) => {
        console.log(arr)

        const items = arr.map((item) => {

            return (
                <li
                    className="comic__item "
                    key={item.id}
                >
                    {item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
                        ? <img src={item.image} alt={item.name} style={{ objectFit: 'unset' }} />
                        : <img src={item.image} alt={item.name} style={{ objectFit: 'cover' }} />}

                    <div className="comic__name">{item.title}</div>
                    <div className="comic__price">{item.price}$</div>
                </li>
            )
        });
        return (
            <ul className="comic__grid">
                {items}
            </ul>
        )
    }

    const comics = renderComics(comicsList);
    const errorMessage = error ? <ErrorMassage /> : null;
    const spinner = loading && !newItemLoading ? <Spinner /> : null;

    return (
        <div className="comic__list">
            {errorMessage}
            {spinner}
            {comics}
            <button
                disabled={newItemLoading} 
                className="button button__main button__long"
                style={{ 'display': charEnded ? 'none' : 'block' }}
                onClick={() => onRequest(offset)}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    )
}
export default Comics