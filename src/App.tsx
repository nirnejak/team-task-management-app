import React, { useState, useEffect } from "react";
import axios from "axios";

import { BrowserRouter as Router, Route } from "react-router-dom";

import Todos, { Todo } from "./components/Todos";
import Header from "./components/layout/Header";
import About from "./components/pages/About";
import ProgressContainer, { Progress } from "./components/Progress";
import AddTodo from "./components/AddTodo";

import "./App.scss";

export interface AppState {
  todos: Todo[];
  categories: string[];
  progress: Progress[];
}

const initialState: AppState = {
  todos: [],
  categories: [],
  progress: [],
}

const App = () => {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    const requests = [
      axios.get("https://my-json-server.typicode.com/nirnejak/fava-related-task-2/categories"),
      axios.get("https://my-json-server.typicode.com/nirnejak/fava-related-task-2/todos?_limit=10")
    ]
    Promise.all(requests)
      .then(responses => {
        console.log(responses)
        setState({
          ...state,
          categories: responses[0].data,
          todos: responses[1].data
        })
        calculateProgress();
      })
      .catch((err) => console.log(err));
  }, [])

  useEffect(() => {
    calculateProgress();
  }, [state.todos])

  const calculateProgress = () => {
    const progress: Progress[] = state.categories.map((category: string) => {
      const categoryTodos: Todo[] = state.todos.filter((todo: Todo) => todo.category === category);
      const progress: Progress = {
        category: category,
        total: categoryTodos.length,
        completed: categoryTodos.filter((todo) => todo.completed).length
      }
      return progress;
    });
    setState({
      ...state,
      progress: progress,
    });
  };

  // Toggle Complete
  const markComplete = (id: string) => {
    setState({
      ...state,
      todos: state.todos.map((todo: Todo) => {
        if (todo.id === id) todo.completed = !todo.completed;
        return todo;
      }),
    });
  };

  // Delete Todo
  const delTodo = (id: string) => {
    axios
      .delete(
        `https://my-json-server.typicode.com/nirnejak/fava-related-task-2/todos/${id}`
      )
      .then((res) =>
        setState({
          ...state,
          todos: [...state.todos.filter((todo) => todo.id !== id)],
        })
      )
      .catch((err) => console.log(err));
  };

  const addTodo = (title: string, category: string) => {
    axios
      .post(
        "https://my-json-server.typicode.com/nirnejak/fava-related-task-2/todos",
        {
          title: title,
          completed: false,
          category: category,
        }
      )
      .then((res) =>
        setState({
          ...state,
          todos: [res.data, ...state.todos],
        })
      )
      .catch((err) => console.log(err));
  };

  return (
    <Router>
      <div className="App">
        <div className="container">
          <Header />
          <br />
          <Route
            exact
            path="/"
            render={(props) => (
              <>
                <AddTodo
                  addTodo={addTodo}
                  categories={state.categories}
                />
                <ProgressContainer progress={state.progress} />
                <Todos
                  todos={state.todos}
                  markComplete={markComplete}
                  delTodo={delTodo}
                />
              </>
            )}
          />
          <Route path="/about" component={About} />
        </div>
      </div>
    </Router>
  );
}

export default App;
