import { Component } from 'react';

import './charList.scss';

import MarvelService from '../../services/MarvelService';
import ErrorMassage from '../errorMassage/ErrorMassage';
import Spinner from '../spinner/Spinner';

class CharList extends Component {
    state = {
        charList: [],
        loading: true,
        error: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateCharList();
    }

    updateCharList = () => {
        this.marvelService
            .getAllCharacters()
            .then(this.modifedCharList)
            .then(this.onCharLoaded)
            .catch(this.onError)

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

    modifedCharList = (res) => {
        const result = res.map(obj => {
            return {
                src: obj.thumbnail,
                name: obj.name
            };
        });

        this.setState({
            charList: [...result]
        })
    }

    render() {
        const { charList, loading, error } = this.state;

        const spinner = loading ? <Spinner /> : null;
        const errorMassage = error ? <ErrorMassage /> : null;
        const content = !(loading || error) ? <View char = { charList } /> : null;


        return (
            <div className="char__list">
                <ul className="char__grid">
                    {spinner}
                    {errorMassage}
                    {content}
                </ul>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

const View = ({ char }) => {
    return char.map((item, index) => {
        const { src, name } = item;

        console.dir(src)

        return (
            <li className="char__item"
            key={index}>
                {src.includes("image_not_available")
                    ? <img src={src} alt="abyss" style={{ objectFit: 'contain' }} />
                    :<img src={src} alt="abyss" /> }
                <div className="char__name">{name}</div>
            </li>
        )
    })
}

export default CharList