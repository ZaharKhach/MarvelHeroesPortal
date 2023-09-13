import { useParams, Link } from "react-router-dom";

import "./singleCharPage.scss";

import { useState, useEffect } from "react";

import useMarvelService from "../../../services/MarvelService";
import Spinner from "../../spinner/Spinner";
import ErrorMessage from "../../errorMassage/ErrorMessage";

const SingleCharPage = (props) => {
  const { charId } = useParams();
  const [char, setChar] = useState(null);
  const { loading, error, getOneCharacter } = useMarvelService();

  useEffect(() => {
    updateChar();
  }, [charId]);

  const updateChar = () => {
    getOneCharacter(charId).then(onCharLoaded);
  };

  const onCharLoaded = (char) => {
    setChar(char);
    console.log(char);
  };

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error || !char) ? <View char={char} /> : null;

  return (
    <>
      {errorMessage}
      {spinner}
      {content}
    </>
  );
};

const View = ({ char }) => {
  const { name, description, thumbnail} = char;

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
