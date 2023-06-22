import { Component } from 'react';

import './charInfo.scss';

import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMassage from '../errorMassage/ErrorMassage';
import Sceleton from '../skeleton/Sceleton'

class CharInfo extends Component {

    state = {
        char: null,
        loading: false,
        error: false
    }

    marvelService = new MarvelService();

    componentDidUpdate(prevProp) {
        if (prevProp.charId !== this.props.charId) {
            this.updateChar()
        }

    }

    componentDidMount() {
        this.updateChar()
    }

    updateChar = () => {
        const { charId } = this.props;
        if (!charId) return;


        this.marvelService
            .getOneCharacter(charId)
            .then(this.onCharLoaded)
            .catch(this.onError)

        this.setState(({ loading, error }) => ({
            loading: !loading,
            error: error ? !error : error
        }))
    }

    onCharLoaded = (char) => {
        this.setState({ char, loading: false })
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }


    render() {
        const { char, loading, error } = this.state;
        // console.log(char, loading, error)

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

}

const View = ({ char }) => {



    const comics = char.comics.map(item => {
       return  <li className="char__comics-item">
            {item.name}
        </li>
    }).slice(0,10)

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
export default CharInfo