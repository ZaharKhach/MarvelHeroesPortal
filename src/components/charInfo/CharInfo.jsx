import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './charInfo.scss';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMassage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton'

const CharInfo = (props) => {
    const [char, setChar] = useState(null);
    const { loading, error, getOneCharacter } = useMarvelService();


    useEffect(() => {
        updateChar();
    }, [])

    useEffect(() => {
        updateChar();
    }, [props.charId])

    const updateChar = () => {
        const { charId } = props;
        if (!charId) return;

        getOneCharacter(charId)
            .then(onCharLoaded)
    }

    const onCharLoaded = (char) => {
        setChar(char);
    }

    // console.log(char, loading, error);
    const skeleton = char || loading || error ? null : <Skeleton />;
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !char) ? <View char={char} /> : null;

    return (
        <div className="char__info">
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
        </div>
    )
}

const View = ({ char }) => {
    const {thumbnail} = char;

    const comics = char.comics.map((item, index) => {
        return <li className="char__comics-item"
            key={index}>
            {item.name}
        </li>
    }).slice(0, 10)

    return (
        <>
            <div className="char__basics">
            {thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
                ? <img src={thumbnail} style={{ objectFit: 'contain' }} alt="Random character" className="randomchar__img" />
                : <img src={thumbnail} alt="Random character" className="randomchar__img" />}
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