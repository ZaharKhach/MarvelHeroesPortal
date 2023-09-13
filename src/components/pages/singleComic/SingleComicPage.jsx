import { useParams, Link } from "react-router-dom";

import "./singleComicPage.scss";

import { useState, useEffect } from "react";

import { CSSTransition, TransitionGroup } from "react-transition-group";


import useMarvelService from "../../../services/MarvelService";
import Spinner from "../../spinner/Spinner";
import ErrorMessage from "../../errorMassage/ErrorMessage";

const SingleComicPage = (props) => {
  const { comicId } = useParams();
  const [comic, setComic] = useState(null);
  const [isContentVisible, setContentVisible] = useState(false);
  const { loading, error, getOneComic } = useMarvelService();

  useEffect(() => {
    updateComic();
  }, [comicId]);

  const updateComic = () => {
    getOneComic(comicId).then(onComicLoaded);
  };

  const onComicLoaded = (char) => {
    setComic(char);
    setContentVisible(true);

    console.log(char);
  };

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error || !comic) ? (
    <CSSTransition in={isContentVisible} timeout={550} classNames="item">
      <View comic={comic} />
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

const View = ({ comic }) => {
  const { title, image, description, pages, price } = comic;

  return (
    <div className="single-comic">
      <img src={image} alt={title} className="single-comic__img" />
      <div className="single-comic__info">
        <h2 className="single-comic__name">{title}</h2>
        <p className="single-comic__descr"> {description}</p>
        <p className="single-comic__descr"> {`${pages} pages`} </p>
        <p className="single-comic__descr">Language: en-us</p>
        <div className="single-comic__price"> {price} </div>
      </div>
      <Link to="/comics" href="#" className="single-comic__back">
        Back to all
      </Link>
    </div>
  );
};

export default SingleComicPage;
