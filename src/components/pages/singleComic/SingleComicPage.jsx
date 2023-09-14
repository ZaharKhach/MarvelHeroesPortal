import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import "./singleComicPage.scss";

const SingleComicPage = ({ data }) => {
  const { title, image, description, pages, price } = data;

  return (
    <div className="single-comic">
      <Helmet>
        <meta name={`${title} comic book`} content="Page with list of our comics" />
        <title>{title}</title>
      </Helmet>
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
