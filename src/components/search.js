
import React, { Component } from 'react';
import BibleClient from 'bibling';


function chunk(list, chunkSize) {
  let i;
  let j;
  const chunkedList = [];

  for (i = 0, j = list.length; i < j; i += chunkSize) {
    chunkedList.push(list.slice(i, i + chunkSize));
  }

  return chunkedList;
}

export default class Search extends Component {

  constructor(props) {
    super(props);
    this.state = { search: '', translation: 'NVI', quotes: [] };
    this.bibleClient = BibleClient.create();
  }

  onSubmit(event) {
    event.preventDefault();
    this.broadcastBibleQuote();
  }

  updateSearch(search) {
    this.setState({ search });
  }

  async broadcastBibleQuote() {
    try {
      const { verses } = await this.bibleClient.search(this.state.search, this.state.translation);
      const bibleQuote = (isNaN(parseInt(verses[0][0], 10)) ?
        chunk(verses.slice(1), 2) : chunk(verses, 2)).map(([verse1, verse2]) => `${verse1} ${verse2}`);
      console.log(bibleQuote);
      this.setState({ quotes: bibleQuote });
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    return (<div><form onSubmit={event => this.onSubmit(event)}>
      <input
        placeholder="Type Bible Quote"
        type="text"
        value={this.state.search}
        onChange={({ target }) => this.updateSearch(target.value)}
      />
    </form><div>{this.state.quotes[0]}</div></div>);
  }

}
