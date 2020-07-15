import React from "react";
import PropTypes from "prop-types";

import "./TodoItem.scss";

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  category: string;
}

export interface Props {
  todo: Todo;
  markComplete: (id: string) => void;
  delTodo: (id: string) => void;
}

const TodoItem = (props: Props) => {
  return (
    <div className="todo-item">
      <input
        type="checkbox"
        id={props.todo.id}
        onChange={(e) => props.markComplete(props.todo.id)}
        checked={props.todo.completed}
      />
      <label
        className="label-inline"
        htmlFor={props.todo.id}
        style={{
          textDecoration: props.todo.completed ? "line-through" : "none",
        }}
      >
        {props.todo.title}
      </label>

      <button
        onClick={(e) => props.delTodo(props.todo.id)}
        style={{ float: "right" }}
      >
        <i className="fa fa-trash" aria-hidden="true"></i>
      </button>

      <div className="todo-badge">
        <small>{props.todo.category}</small>
      </div>
    </div>
  );
};

// PropTypes
TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  markComplete: PropTypes.func.isRequired,
  delTodo: PropTypes.func.isRequired,
};

export default TodoItem;
