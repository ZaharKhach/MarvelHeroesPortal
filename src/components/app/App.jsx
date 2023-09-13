import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
import Spinner from "../spinner/Spinner";

const Page404 = lazy(() => import("../pages/Page404"));
const MainPage = lazy(() => import("../pages/MainPage"));
const ComicsPage = lazy(() => import("../pages/ComicsPage"));
const SinglePage = lazy(() => import("../SinglePage/SinglePage"));
const SingleComicPage = lazy(() =>
  import("../pages/singleComic/SingleComicPage")
);
const SingleCharPage = lazy(() => import("../pages/singleChar/SingleCharPage"));

const App = () => {
  return (
    // <SingleComic/>
    <Router>
      <div className="app">
        <AppHeader />
        <main>
          <Suspense fallback={<Spinner />}>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/comics" element={<ComicsPage />} />
              <Route
                path="/character/:id"
                element={
                  <SinglePage
                    Component={SingleCharPage}
                    dataType={"character"}
                  />
                }
              />
              <Route
                path="/comics/:id"
                element={
                  <SinglePage
                    Component={SingleComicPage}
                    dataType={"comic"}
                  />
                }
              />
              <Route path="*" element={<Page404 />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
};

export default App;
