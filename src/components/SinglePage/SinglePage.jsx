import { useParams } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import "./singlePageAnimation.scss";

import { useState, useEffect, Component as ReactComponent } from "react";
import useMarvelService from "../../services/MarvelService";

import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMassage/ErrorMessage";
import AppBanner from "../appBanner/AppBanner";

const SinglePage = ({ Component, dataType }) => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [isContentVisible, setContentVisible] = useState(false);
  const { loading, error, getOneComic, getOneCharacter } = useMarvelService();

  useEffect(() => {
    updateData();
    setContentVisible(true);
  }, [id]);

  const updateData = () => {
    switch (dataType) {
      case "comic":
        getOneComic(id).then(onDataLoaded);
        break;
      case "character":
        getOneCharacter(id).then(onDataLoaded);
    }
  };

  const onDataLoaded = (data) => {
    setData(data);
  };

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error || !data) ? (
    <Component data={data} />
  ) : null;

  return (
    <CSSTransition>
      <CSSTransition in={isContentVisible} timeout={550} classNames="item">
        <>
          <AppBanner />
          {errorMessage}
          {spinner}
          {content}
        </>
      </CSSTransition>
    </CSSTransition>
  );
};
export default SinglePage;
