import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import Select from 'react-select';

export class AddTodo extends Component {
    state = {
        title: '',
        category: ''
    }
    selectField = React.createRef();

    onSubmit = (e) => {
        e.preventDefault();
        this.props.addTodo(this.state.title, this.state.category);
        // Resetting the Select Field
        this.selectField.current.value = '';
        // Resetting the State
        this.setState({ title: '', category: '' });
    }

    onChange = (e) => this.setState({ ...this.state, title: e.target.value });
    onSelectChange = (e) => this.setState({ ...this.state, category: e.target.value });

    render() {
        return (
            <form onSubmit={this.onSubmit} style={{ display: 'flex' }}>
                <input
                    type="text"
                    name="title"
                    style={{ flex: '5' }}
                    placeholder="Add Todo..."
                    value={this.state.title}
                    onChange={this.onChange}
                    required
                />
                <select style={{ flex: '5' }} onChange={this.onSelectChange} ref={this.selectField} required>
                    <option value="">Select Task Category...</option>
                    <option value="Fava">Fava</option>
                    <option value="Destination">Destination</option>
                    <option value="Brunch">Brunch</option>
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
}

// PropTypes
AddTodo.propTypes = {
    addTodo: PropTypes.func.isRequired
}

export default AddTodo;