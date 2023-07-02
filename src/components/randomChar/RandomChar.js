import { useState, useEffect } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMassage from '../errorMassage/ErrorMassage';

import './randomChar.scss';
import mjolnir from '../../resourses/img/mjolnir.png'

const RandomChar = () => {

    const [char, setChar] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const marvelService = new MarvelService();

    useEffect(() => {
        updateChar()
    }, [])

    const onCharLoaded = (char) => {
        setChar(char);
        setError(false);
        setLoading(false);
    }

    const onError = () => {
        setLoading(false);
        setError(true);
    }

    const updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);

        setLoading(true);

        marvelService
            .getOneCharacter(id)
            .then(onCharLoaded)
            .catch(onError);
    }


    const errorMassage = error ? <ErrorMassage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? <View char={char} /> : null

    return (
        <div className="randomchar">
            {errorMassage}
            {spinner}
            {content}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br />
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button className="button button__main">
                    <div className="inner"
                        onClick={updateChar}>try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
            </div>
        </div>
    )
}

const View = ({ char }) => {

    const { name, description, thumbnail, homepage, wiki } = char;


    return (

        <div className="randomchar__block">

            {thumbnail.includes('image_not_available')
                ? <img src={thumbnail} style={{ objectFit: 'contain' }} alt="Random character" className="randomchar__img" />
                : <img src={thumbnail} alt="Random character" className="randomchar__img" />}


            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar