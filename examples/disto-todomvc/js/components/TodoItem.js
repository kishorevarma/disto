import React from 'react';
import {$} from '../actions';
import TodoTextInput from './TodoTextInput';
import cx from 'react/lib/cx';

const ReactPropTypes = React.PropTypes;
export default React.createClass({

    propTypes: {
        todo: ReactPropTypes.object.isRequired
    },

    getInitialState() {
        return {
            isEditing: false
        }
    },

    render() {
        let todo = this.props.todo;
        let input;
        if(this.state.isEditing) {
            input = <TodoTextInput className="edit" onSave={this._onSave} value={todo.text}/>
        }

        return(
            <li className={cx({
                    completed: todo.complete,
                    editing: this.state.isEditing
                })}
                key={todo.id}>

                <div className="view">
                    <input 
                        className="toggle"
                        type="checkbox"
                        checked={todo.complete}
                        onChange={this._onToggleComplete} />
                    <label onDoubleClick={this._onDoubleClick}>
                        {todo.text}
                    </label>
                    <button className="destroy" onClick={this._onDestoryClick} />
                </div>
                {input}
            </li>
        );
    },

    _onToggleComplete() {
        $.toggleComplete(this.props.todo);
    },

    _onDoubleClick() {
        this.setState({isEditing: true});
    },

    _onDestoryClick() {
        $.destroy(this.props.todo.id);
    },

    _onSave(text) {
        $.updateText(this.props.todo.id, text);
        this.setState({isEditing: false});
    }

});
