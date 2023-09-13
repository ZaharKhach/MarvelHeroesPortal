import { useParams, Link } from "react-router-dom";

import "./singleCharPage.scss";

import { CSSTransition, TransitionGroup } from "react-transition-group";

import { useState, useEffect } from "react";

import useMarvelService from "../../../services/MarvelService";
import Spinner from "../../spinner/Spinner";
import ErrorMessage from "../../errorMassage/ErrorMessage";

const SingleCharPage = (props) => {
  const { charId } = useParams();
  const [char, setChar] = useState(null);
  const [isContentVisible, setContentVisible] = useState(false);
  const { loading, error, getOneCharacter } = useMarvelService();

  useEffect(() => {
    updateChar();
  }, [charId]);

  const updateChar = () => {
    getOneCharacter(charId).then(onCharLoaded);
  };

  const onCharLoaded = (char) => {
    setChar(char);
    setContentVisible(true);
    console.log(char);
  };

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error || !char) ? (
    <CSSTransition in={isContentVisible} timeout={550} classNames="item">
      <View char={char} />
    </CSSTransition>
  ) : null;

  return (
    <TransitionGroup>
      <>
        {errorMessage}
        {spinner}
        {content}
      </>
    </TransitionGroup>
  );
};

const View = ({ char }) => {
  const { name, description, thumbnail } = char;

  return (
    <div className="single-char">
      <img src={thumbnail} alt={name} className="single-char__img" />
      <div className="single-char__info">
        <h2 className="single-char__name">{name}</h2>
        <p className="single-char__descr"> {description}</p>
      </div>
      <Link to="/" href="#" className="single-char__back">
        Back to all
      </Link>
    </div>
  );
};

export default SingleCharPage;
