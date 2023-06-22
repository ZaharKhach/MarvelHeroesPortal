import { Component } from "react";

import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

import decoration from '../../resourses/img/vision.png'

class App extends Component {

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
          <RandomChar />

          <div className="char__content">
            <CharList onCharSelected={this.onCharSelected} />
            <CharInfo charId={this.state.selectedCharId} />
          </div>
          <img className="bg-decoration" src={decoration} alt="vision" />
        </main>

      </div>
    );
  }
}

export default App;
