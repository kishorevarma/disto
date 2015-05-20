import React from 'react';
import {$} from '../actions';
import TodoTextInput from './TodoTextInput';

export default React.createClass({
    _onsave(text) {
        if (text.trim()){
            $.create(text);
        }
    },
    render() {
        return (
            <header id="header">
                <h1>todos</h1>
                <TodoTextInput id="new-todo" placeholder="What needs to be done?" onSave={this._onsave}/>
            </header>
        );
    }
});
