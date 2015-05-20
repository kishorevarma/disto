import React from 'react';
import {$} from '../actions';
import TodoItem from './TodoItem';

const PropTypes = React.PropTypes;

export default React.createClass({
    propsTypes: {
        allTodos: PropTypes.object.isRequired,
        areAllCompleted: PropTypes.bool.isRequired
    },

    render() {
        let allTodos = this.props.allTodos;
        let todos = [];

        if(Object.keys(allTodos).length < 1) {
            return null;
        }

        for(let key in allTodos) {
            todos.push(<TodoItem todo={allTodos[key]} key={key} />);
        }

        return(
            <section id="main">
                <input 
                    id="toggle-all"
                    type="checkbox"
                    onChange={this._onToggleCompleteAll}
                    checked={this.props.areAllCompleted ? 'checked' : ''} />
                <label htmlFor="toggle-all"> Mark all as completed </label>
                <ul id="todo-list">{todos}</ul>
            </section>
        );
    },

    _onToggleCompleteAll() {
        $.toggleComplteAll();
    }
});
