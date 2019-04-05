// Importing Modules
import React, { Component } from 'react';
import axios from 'axios';

// import uuid from 'uuid';  // Not Used Anymore

// Importing React-Router
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Importing Components
import Todos from './components/Todos';
import Header from './components/layout/Header';
import AddTodo from './components/AddTodo';
import About from './components/pages/About';
import Progress from './components/Progress';

import './App.scss';

class App extends Component {
  state = {
    todos: [],
    categories: [],
    progress: []
  }

  componentDidMount() {
    axios.get('https://my-json-server.typicode.com/nirnejak/demo/categories')
      .then(res => this.setState({ ...this.state, categories: res.data }))
      .catch(err => console.log(err));
    axios.get('https://my-json-server.typicode.com/nirnejak/demo/todos?_limit=10')
      .then(res => {
        this.setState({ ...this.state, todos: res.data })
        this.calculateProgress();
      }
      )
      .catch(err => console.log(err));
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.todos !== this.state.todos) {
      this.calculateProgress();
    }
  }

  calculateProgress = () => {
    let progress = this.state.categories.map((category) => {
      let item = { category: category };

      let categoryList = this.state.todos.filter(todo => todo.category === category ? true : false);
      item["total"] = categoryList.length;
      item["completed"] = categoryList.filter(todo => todo.completed).length;

      return item;
    })
    this.setState({
      ...this.state,
      progress: progress
    })
  }

  // Toggle Complete
  markComplete = (id) => {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id === id)
          todo.completed = !todo.completed;
        return todo;
      })
    });
  }

  // Delete Todo
  delTodo = (id) => {
    axios.delete(`https://my-json-server.typicode.com/nirnejak/demo/todos/${id}`)
      .then(res => this.setState({ todos: [...this.state.todos.filter(todo => todo.id !== id)] }))
      .catch(err => console.log(err));
  }

  addTodo = (title, category) => {
    axios.post('https://my-json-server.typicode.com/nirnejak/demo/todos', {
      title: title,
      completed: false,
      category: category
    })
      .then(res => this.setState({
        todos: [res.data, ...this.state.todos]
      }))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <br />
            <Route exact path="/" render={props => (
              <React.Fragment>
                <AddTodo addTodo={this.addTodo} categories={this.state.categories} />
                <Progress progress={this.state.progress} />
                <Todos todos={this.state.todos} markComplete={this.markComplete} delTodo={this.delTodo} />
              </React.Fragment>
            )} />

            <Route path="/about" component={About} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
