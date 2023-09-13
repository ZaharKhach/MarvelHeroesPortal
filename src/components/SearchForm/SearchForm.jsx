import "./searchForm.scss";

import { Formik, Form, Field, ErrorMessage } from "formik";

import { useState, useEffect } from "react";
import useMarvelService from "../../services/MarvelService";
import * as Yup from "yup";

const SearchForm = () => {
  const [char, setChar] = useState(null);
  const { loading, error, getOneCharByName } = useMarvelService();

  const updateChar = (name) => {
    getOneCharByName(name).then(onCharLoaded);
  };

  const onCharLoaded = (name) => {
    setChar(name);
  };

  console.log(char);

  const result =
    char === null ? null : typeof char !== "undefined" ? (
      <div className="char__search-wrapper">
        <div className="char__search-success">
          There is! Visit {char.name} page?
        </div>
        <button className="button button__secondary">
          <div className="inner">Visit page</div>
        </button>
      </div>
    ) : (
      <div className="char__search-wrapper">
        <div className="char__search-error">
          The character was not found. Check the name and try again
        </div>
      </div>
    );

  return (
    <div className="char__search-form">
      <Formik
        initialValues={{
          name: "",
        }}
        validationSchema={Yup.object({
          name: Yup.string().required("This field is required"),
        })}
        onSubmit={(values) => {
          updateChar(values.name);
        }}
      >
        <Form>
          <label className="char__search-label" htmlFor="name">
            Or find a character by name:
          </label>
          <div className="char__search-wrapper">
            <Field id="name" name="name" type="text" placeholder="Enter name" />
            <button type="submit" className="button button__main">
              <div className="inner">find</div>
            </button>
          </div>
          <ErrorMessage
            name="name"
            className="char__search-error"
            component="div"
          />
        </Form>
      </Formik>
      {result}
    </div>
  );
};
export default SearchForm;
