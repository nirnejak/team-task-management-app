import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

export interface NewTodo {
  title: string;
  category: string;
}

const initialState: NewTodo = {
  title: '',
  category: ''
}

export interface Props {
  categories: string[];
  addTodo: (title: string, state: string) => void;
}

const AddTodo = (props: Props) => {
  const [state, setState] = useState(initialState)
  const selectField = useRef<HTMLSelectElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setState({
      ...state,
      category: event.target.value
    });
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    props.addTodo(state.title, state.category);
    if (null !== selectField.current) {
      selectField.current.value = '';
    }
    setState(initialState);
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex' }}>
      <input
        type="text"
        name="title"
        style={{ flex: '5' }}
        placeholder="Add Todo..."
        value={state.title}
        onChange={handleInputChange}
        required
      />
      <select style={{ flex: '5' }} onChange={handleSelectChange} ref={selectField} required>
        <option value="">Select Task Category...</option>
        {
          props.categories.map((category: string, index: number) => (
            <option key={index} value={category}>{category}</option>
          ))
        }
      </select>
      <input
        type="submit"
        value="Submit"
        className="btn"
        style={{ flex: '1' }}
      />
    </form>
  )
}

// PropTypes
AddTodo.propTypes = {
  addTodo: PropTypes.func.isRequired
}

export default AddTodo;