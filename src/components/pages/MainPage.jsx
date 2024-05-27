import { useState } from "react";
import { Helmet } from "react-helmet";

import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import SearchForm from "../searchForm/SearchForm";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import decoration from "../../resourses/img/vision.png";

const MainPage = (props) => {
  const [selectedCharId, setCharId] = useState(null);

  const onCharSelected = (id) => {
    setCharId(id);
  };

  return (
    <>
      <Helmet>
        <meta name="descriotion" content="Marvel information portal" />
        <title>Marvel information portal</title>
      </Helmet>

      <ErrorBoundary>
        <RandomChar />
      </ErrorBoundary>

      <div className="char__content">
        <ErrorBoundary>
          <CharList onCharSelected={onCharSelected} />
        </ErrorBoundary>
        <div>
          <ErrorBoundary>
            <CharInfo charId={selectedCharId} />
          </ErrorBoundary>
          <ErrorBoundary>
            <SearchForm />
          </ErrorBoundary>
        </div>
      </div>
      <img className="bg-decoration" src={decoration} alt="vision" />
    </>
  );
};
export default MainPage;
