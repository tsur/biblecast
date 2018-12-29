import React, {Component} from 'react';
// import {AppContext} from '../contexts/app';
import Page from './components/Page';
import Search from './components/search';
import Screen from './components/screen';

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      verses: []
    };

    this.setVerses = this.setVerses.bind(this);
  }

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
