import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './charInfo.scss';

import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMassage from '../errorMassage/ErrorMassage';
import Sceleton from '../skeleton/Sceleton'

const CharInfo = (props) => {

    const [char, setChar] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const marvelService = new MarvelService();

    useEffect(() => {
        updateChar()
    }, [])

    useEffect(() => {
        updateChar()
    }, [props.charId])

    const updateChar = () => {
        const { charId } = props;
        if (!charId) return;

        onCharLoading();

        marvelService
            .getOneCharacter(charId)
            .then(onCharLoaded)
            .catch(onError)
    }

    const onCharLoading = () => {
        setLoading(true)
    }

    const onCharLoaded = (char) => {
        setChar(char);
        setLoading(false);
    }

    const onError = () => {
        setLoading(false);
        setError(true);
    }

    const sceleton = !(char || loading || error) ? <Sceleton /> : null;
    const errorMassage = error ? <ErrorMassage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !char) ? <View char={char} /> : null

    return (
        <div className="char__info">
            {sceleton}
            {errorMassage}
            {spinner}
            {content}
        </div>
    )
}

const View = ({ char }) => {

    const comics = char.comics.map((item, index) => {
        return <li className="char__comics-item"
            key={index}>
            {item.name}
        </li>
    }).slice(0, 10)

    return (
        <>
            <div className="char__basics">
                {char.thumbnail.includes('image_not_available')
                    ? <img src={char.thumbnail} style={{ objectFit: 'contain' }} alt="Random character" className="randomchar__img" />
                    : <img src={char.thumbnail} alt="Random character" className="randomchar__img" />}
                <div>
                    <div className="char__info-name">{char.name}</div>
                    <div className="char__btns">
                        <a href={char.homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={char.wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>

            <div className="char__descr">
                {char.description}
            </div>
            <div className="char__comics">Comics</div>
            <ul className="char__comics-list">
                {comics.length === 0 ? 'There are no comics' : comics}
            </ul>
        </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo