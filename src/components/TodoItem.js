import React, { Component } from 'react';
import PropTypes from 'prop-types';


import './TodoItem.scss';
export class TodoItem extends Component {
    render() {
        const { id, title, completed, category } = this.props.todo;
        return (
            <div className="todo-item">
                <input type="checkbox" id={id} onChange={(e) => this.props.markComplete(id)} checked={completed ? 'checked' : ''} />
                <label className="label-inline" htmlFor={id} style={{ textDecoration: this.props.todo.completed ? 'line-through' : 'none' }}>{title}</label>

                <button onClick={(e) => this.props.delTodo(id)} style={{ float: 'right' }}>
                    <i className="fa fa-trash" aria-hidden="true"></i>
                </button>

                <div className="todo-badge">
                    <small>{category}</small>
                </div>
            </div >
        )
    }
}

// PropTypes
TodoItem.propTypes = {
    todo: PropTypes.object.isRequired,
    markComplete: PropTypes.func.isRequired,
    delTodo: PropTypes.func.isRequired
}


export default TodoItem;
