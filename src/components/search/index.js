
import React, { Component } from 'react';
import BibleClient from 'bibling';
import Input from './Input';
import Container from './Container';
import localStorage from '../../utils/localStorage';
import * as pubSub from '../../utils/pubSub';

const VERSES_MAX_LENGTH = 111;
const VERSES_MAX_WORDS = 12;

function chunk(list, chunkSize) {
  let i;
  let j;
  const chunkedList = [];

  for (i = 0, j = list.length; i < j; i += chunkSize) {
    chunkedList.push(list.slice(i, i + chunkSize));
  }

  return chunkedList;
}

function splitSubstrWords(str, len=VERSES_MAX_WORDS) {
  return chunk(str.split(' '), len);
}

function parseVerses(verses){

  let parsedVerses = []

  for(let verse of verses){
    if(verse.length <= VERSES_MAX_LENGTH){
      parsedVerses.push(verse);
    }
    else{
      let splitByWords = splitSubstrWords(verse).map(splitVerse => splitVerse.join(' '));
      if(splitByWords.length >= 2 && 
        splitByWords[splitByWords.length-1].length + splitByWords[splitByWords.length-2].length <= VERSES_MAX_LENGTH){
          splitByWords[splitByWords.length-2] = `${splitByWords[splitByWords.length-2]} ${splitByWords[splitByWords.length-1]}`;
          splitByWords = splitByWords.slice(0, -1);
      }
      parsedVerses = parsedVerses.concat(splitByWords);
    }
  }

  return parsedVerses;
}

export default class Search extends Component {

  constructor(props) {
    super(props);
    this.state = { search: localStorage.get('search', ''), translation: localStorage.get('translation', 'NVI')};
    this.searchRef = React.createRef();
    this.bibleClient = BibleClient.create();
    this.onSubmit = this.onSubmit.bind(this);
  }
  
  componentDidMount(){
    const searchInputElement = this.searchRef.current;
    searchInputElement.focus();
    pubSub.subscribe(pubSub.SEARCH_FOCUS, () => searchInputElement.focus());
  }

  onSubmit(event) {
    this.broadcastBibleQuote();
    event.preventDefault();
  }

  updateSearch(search) {
    this.setState({ search }, () => localStorage.save('search', search));
  }

  updateTranslation(translation) {
    this.setState({ translation },  () => localStorage.save('translation', translation));
  }

  async broadcastBibleQuote() {
    try {
      const { verses } = await this.bibleClient.search(this.state.search, this.state.translation);
      this.props.setVerses(parseVerses(verses));
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    return (
      <Container>
        <form onSubmit={this.onSubmit}>
          <Input
            placeholder="Type Bible Quote"
            type="text"
            value={this.state.search}
            ref={this.searchRef}
            onChange={({ target }) => this.updateSearch(target.value)}
          />
          <Input
            placeholder="Type Bible Translation"
            type="text"
            value={this.state.translation}
            onChange={({ target }) => this.updateTranslation(target.value)}
          />
          <button type='submit' style={{display:'none'}}/>
        </form>
      </Container>
      );
  }

}
