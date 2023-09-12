import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import "./Comics.scss";

import useMarvelService from "../../services/MarvelService";
import ErrorMassage from "../errorMassage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const Comics = (props) => {
  const [comicsList, setComicsList] = useState([]);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [charEnded, setComicEnded] = useState(false);

  const { loading, error, getAllCharacters, getComics } = useMarvelService();

  useEffect(() => {
    onRequest(offset, true);
  }, []);

  const onRequest = (offset, initial) => {
    initial ? setNewItemLoading(false) : setNewItemLoading(true);
    getComics(offset).then(onComicsLoaded);
  };

  const onComicsLoaded = (newComicList) => {
    let ended = false;
    if (newComicList.length < 8) {
      ended = true;
    }

    newComicList.forEach((item, index) => {
      setTimeout(() => {
        setComicsList((charList) => [...charList, item]);
        if (index === newComicList.length - 1) {
          setNewItemLoading(false);
        }
      }, index * 100);
    });
    setOffset((offset) => offset + 10);
    setComicEnded(ended);
  };

  const renderComics = (arr) => {
    const items = 
    <TransitionGroup component={null}>
    {arr.map((item, i) => {
      return (
        <CSSTransition
        in={true}
        timeout={550}
        key={i}
        classNames='item'>
        <li className="comic__item " key={i}>
          <Link to={`/comics/${item.id}`}>
            <img src={item.image} alt={item.name} />
            <div className="comic__name">{item.title}</div>
            <div className="comic__price">{item.price}</div>
          </Link>
        </li>
        </CSSTransition>
      );
    })}</TransitionGroup>;
    return  <ul className="comic__grid">{items}</ul>;
  };

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
        style={{ display: charEnded ? "none" : "block" }}
        onClick={() => onRequest(offset)}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};
export default Comics;
