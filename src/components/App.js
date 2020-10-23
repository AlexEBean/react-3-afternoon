import React, { Component } from 'react';
import axios from "axios"


import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';
import Post from "./Post/Post"

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
    this.searchPost = this.searchPost.bind( this );
  }
  
  // R in CRUD (Read)
  componentDidMount() {
    axios.get("https://practiceapi.devmountain.com/api/posts")
    .then(res => 
      this.setState({ 
        posts: res.data 
      })
    ).catch(err => console.log(err))
  }

  // U in CRUD (update)
  updatePost(id, text) {
    axios.put(`https://practiceapi.devmountain.com/api/posts?id=${id}`, {text})
      .then(res => 
        this.setState({
          posts: res.data
        })
      ).catch(err => console.log(err))
  }

  // Obviously D in CRUD, but leaving a note for consistency's sake
  deletePost(id) {
    axios.delete(`https://practiceapi.devmountain.com/api/posts?id=${id}`)
      .then(res => 
        this.setState({
          posts: res.data
        })
      ).catch(err => console.log(err))
  }

  // C in CRUD (Post)
  createPost(text) {
    axios.post("https://practiceapi.devmountain.com/api/posts", {text})
      .then(res =>
        this.setState({
          posts: res.data
        })
      ).catch(err => console.log(err))
  }

  searchPost(text) {
    axios.get(`https://practiceapi.devmountain.com/api/posts/filter?text=${text}`)
      .then(res =>
        this.setState({
          posts: res.data
        })
      ).catch(err => console.log(err))
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header 
        searchPostFn = {this.searchPost}
        />

        <section className="App__content">

          <Compose 
            createPostFn = {this.createPost}
          />
           
          {posts.map(post => (
            <Post 
              key = {post.id}
              text = {post.text} 
              date = {post.date}
              updatePostFn = {this.updatePost} 
              id = {post.id}
              deletePostFn = {this.deletePost}
              />
            ))
          }

        </section>
      </div>
    );
  }
}

export default App;
