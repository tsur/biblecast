import React, {Component} from 'react';
// import {AppContext} from '../contexts/app';

import Page from './Page';
import Search from './search';
import Screen from './screen';

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      verses: []
    };

    this.setVerses = this.setVerses.bind(this);
  }

  // addScreen = ({search, translation, quotes}) => {
  //   this.setState(state => ({
  //     screens: [...state.screens, {search, translation, quotes}]
  //   }));
  // }

  setVerses(verses) {
    this.setState({verses});
  }

  render() {
    return (
      <Page>
        <Search setVerses={this.setVerses}/>
        <Screen verses={this.state.verses}/>
      </Page>
    );
  }
}
