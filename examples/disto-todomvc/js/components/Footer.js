import React from 'react';
import {$} from '../actions';


export default React.createClass({
    propsTypes: {
        allTodos: React.PropTypes.object.isRequired
    },

    render() {
        let todos = this.props.allTodos;
        let total = Object.keys(todos).length;
        let completed = 0;
        let itemsLeft = 0;
        let itemsLeftPhrase;
        let clearCompletedButton;
        if(total < 1) {
            return null;
        }

        for(let key in todos) {
            if(todos[key].complete) {
                ++completed;
            }
        }

        itemsLeft = total - completed;
        itemsLeftPhrase = itemsLeft == 1 ? ' item ' : ' items ';
        itemsLeftPhrase += 'left';

        if(completed) {
            clearCompletedButton = 
                <button 
                    id="clear-completed"
                    onClick={this._clearCompleted}>
                    Clear complted ({completed})
                </button>;
        }

        return (
            <footer id="footer">
                <span id="todo-count">
                    <strong>
                        {itemsLeft}
                    </strong>
                    {itemsLeftPhrase}
                </span>
                {clearCompletedButton}
            </footer>
        );
    },

    _clearCompleted() {
        $.destroyCompleted();
    }

});