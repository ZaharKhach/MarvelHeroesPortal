import {  Link } from "react-router-dom";

import "./singleComicPage.scss";

const SingleComicPage = ({data}) => {
  const { title, image, description, pages, price } = data;

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
