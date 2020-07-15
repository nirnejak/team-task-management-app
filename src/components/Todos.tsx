import React from "react";
import PropTypes from "prop-types";

import TodoItem from "./TodoItem";

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  category: string;
}

export interface Props {
  todos: Todo[];
  markComplete: (id: string) => void;
  delTodo: (id: string) => void;
}

const Todos = (props: Props) => {
  return (
    <>
      {
        props.todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            markComplete={props.markComplete}
            delTodo={props.delTodo}
          />
        ))
      }
    </>
  );
};

// PropTypes
Todos.propTypes = {
  todos: PropTypes.array.isRequired,
  markComplete: PropTypes.func.isRequired,
  delTodo: PropTypes.func.isRequired,
};

export default Todos;
