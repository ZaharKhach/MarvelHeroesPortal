import { Component } from "react";

import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary"

import decoration from '../../resourses/img/vision.png'

class App extends Component {
  


  componentDidMount() {
    console.log('update')
  }

  state = {
    selectedCharId: null
  }

  onCharSelected = (id) => {
    this.setState({
      selectedCharId: id
    })
  }


  render() {

    return (
      
      <div className="app">
        <AppHeader />

        <main>
          <ErrorBoundary >
            <RandomChar />
          </ErrorBoundary>

          <div className="char__content">
            <ErrorBoundary >
              <CharList onCharSelected={this.onCharSelected} />
            </ErrorBoundary>
            <ErrorBoundary>
              <CharInfo charId={this.state.selectedCharId} />
            </ErrorBoundary>
          </div>
          <img className="bg-decoration" src={decoration} alt="vision" />
        </main>

      </div>
    );
  }
}

export default App;
