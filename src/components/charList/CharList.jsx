import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

import "./charList.scss";

import useMarvelService from "../../services/MarvelService";
import ErrorMassage from "../errorMassage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const CharList = (props) => {
  const [charList, setCharList] = useState([]);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [offset, setOffset] = useState(540);
  const [charEnded, setCharEnded] = useState(false);

  const { loading, error, getAllCharacters } = useMarvelService();

  useEffect(() => {
    onRequest(offset, true);
  }, []);

  const onRequest = (offset, initial) => {
    initial ? setNewItemLoading(false) : setNewItemLoading(true);
    getAllCharacters(offset).then(onCharListLoaded);
  };

  const onCharListLoaded = async (newCharList) => {
    let ended = false;
    if (newCharList.length < 9) {
      ended = true;
    }
    newCharList.forEach((item, index) => {
      setTimeout(() => {
        setCharList((charList) => [...charList, item]);
        if (index === newCharList.length - 1) {
          setNewItemLoading(false);
        }
      }, index * 100); // Задержка в миллисекундах между появлением элементов
    });

    setNewItemLoading(false);
    setOffset((offset) => offset + 10);
    setCharEnded(ended);
  };

  let myRef = useRef(null);
  const onSetRef = (elem) => {
    myRef = elem;
  };

  const refFocus = (e) => {
    const { children } = myRef;
    const { parentElement } = e.target;

    for (let i = 0; i < children.length; i++) {
      children[i].classList.remove("char__item_selected");

      if (parentElement === children[i]) {
        children[i].classList.add("char__item_selected");
      }
    }
  };

  const renderItems = (arr) => {
    const items = (
      <TransitionGroup component={null}>
        {arr.map((item) => {
          return (
            <CSSTransition
              in={true}
              key={item.id}
              timeout={100}
              classNames="item"
            >
              <li
                className="char__item "
                key={item.id}
                onClick={() => {
                  props.onCharSelected(item.id);
                }}
              >
                {item.thumbnail ===
                "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg" ? (
                  <img
                    src={item.thumbnail}
                    alt={item.name}
                    style={{ objectFit: "unset" }}
                  />
                ) : (
                  <img
                    src={item.thumbnail}
                    alt={item.name}
                    style={{ objectFit: "cover" }}
                  />
                )}

                <div className="char__name">{item.name}</div>
              </li>
            </CSSTransition>
          );
        })}
      </TransitionGroup>
    );
    return (
      <ul className="char__grid" ref={onSetRef} onClick={refFocus}>
        {items}
      </ul>
    );
  };

  const items = renderItems(charList);

  const errorMessage = error ? <ErrorMassage /> : null;
  const spinner = loading && !newItemLoading ? <Spinner /> : null;

  return (
    <div className="char__list">
      {errorMessage}
      {spinner}
      {items}
      <button
        className="button button__main button__long"
        disabled={newItemLoading}
        style={{ display: charEnded ? "none" : "block" }}
        onClick={() => onRequest(offset)}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

CharList.propTypes = {
  onCharSelected: PropTypes.func,
};

export default CharList;
