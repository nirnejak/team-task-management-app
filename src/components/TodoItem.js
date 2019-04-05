import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class TodoItem extends Component {
    render() {
        const { id, title, completed } = this.props.todo;
        return (
            <div style={{ background: '#F4F4F4', padding: '10px', paddingBottom: '0px', borderBottom: '1px #ccc dotted', }}>
                <p>
                    <input type="checkbox" id={id} onChange={(e) => this.props.markComplete(id)} checked={completed ? 'checked' : ''} />
                    <label className="label-inline" htmlFor={id} style={{ textDecoration: this.props.todo.completed ? 'line-through' : 'none' }}>{title}</label>

                    <button onClick={(e) => this.props.delTodo(id)} style={{ float: 'right' }}>
                        <i className="fa fa-trash" aria-hidden="true"></i>
                    </button>
                </p>
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
