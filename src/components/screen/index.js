
import React, { Component } from 'react';
import * as Keyboard from '../../utils/keyboard';
import circularListIndexIterator from '../../utils/circularListIndexIterator';
import Container from './Container';
import TextContainer from './TextContainer';
import * as pubSub from '../../utils/pubSub';

const electron = window.require('electron');

const versesEquals = (versesListA, versesListB) => {
  if(versesListA.length !== versesListB.length){
    return false;
  }
  return versesListA[0] === versesListB[0];
}

export default class Screen extends Component {

  constructor(props) {
    super(props);
    this.state = {verse: props.verses[0] || ''};
    this.containerRef = React.createRef();
    this.onKeyDown = this.onKeyDown.bind(this);
    this.remoteWindow = electron.remote.getCurrentWindow();
  }

  componentDidUpdate(props){
    if(!versesEquals(props.verses, this.props.verses)){
      this.versesIterator = circularListIndexIterator(this.props.verses.length);
      this.displayVerse();
      this.containerRef.current.focus();
    }
  }

  onKeyDown(event){
    const {key} = event;

    if(Keyboard.isTab(key)){
      return;
    }

    if(Keyboard.isEscape(key)){
      return pubSub.emit(pubSub.SEARCH_FOCUS);
    }

    if(Keyboard.isF5(key)){
      return this.remoteWindow.setFullScreen(!this.remoteWindow.isFullScreen());
    }

    if(Keyboard.isBackspace(key)){
      this.versesIterator.reset();
    }

    if(Keyboard.isArrowLeft(key) || Keyboard.isArrowDown(key)){
      this.versesIterator.prev();
    }

    if(Keyboard.isArrowRight(key) || Keyboard.isArrowUp(key) || Keyboard.isSpace(key) || Keyboard.isEnter(key)){
      this.versesIterator.next();
    }

    this.displayVerse();

    event.preventDefault();
  }

  displayVerse(){
    this.setState({verse: this.props.verses[this.versesIterator.get()]});
  }

  render() {
    return (<Container tabIndex="0" onKeyDown={this.onKeyDown} ref={this.containerRef} size={this.state.verse.length}><TextContainer>{this.state.verse}</TextContainer></Container>);
  }

}
