import React, { Component } from 'react';

import './Search.css';

import SearchIcon from 'react-icons/lib/md/search';

//////////////////////////////////////////////////////// THIS COMPONENT IS BEING RENDERED IN THE *HEADER* COMPONENT

export default class Search extends Component {
  constructor(){
    super()
    this.state = {
      text: ""
    }
  }
  
  updateText (text) {
    this.setState({text})
    // console.log(text)
  }

  searchPost() {
    this.props.searchPostFn(this.state.text)
  }

  render() {
    return (
      <section className="Search__parent">

        <div className="Search__content">
          <input 
          placeholder="Search Your Feed" 
          onChange = {e => this.updateText(e.target.value)}
          />

          <SearchIcon id="Search__icon" onClick = { () => this.searchPost(this.state.text)} />
        </div>
        
      </section>
    )
  }
}