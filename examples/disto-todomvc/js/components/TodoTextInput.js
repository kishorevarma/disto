/*
 We maintain state internally untill user completes 
 the entering the text
*/

import React from 'react';
const ReactPropTypes = React.PropTypes;
const ENTER_KEY_CODE = 13;


export default React.createClass({
    
    propTypes: {
        className: ReactPropTypes.string,
        id: ReactPropTypes.string,
        placeholder: ReactPropTypes.string,
        onSave: ReactPropTypes.func.isRequired,
        value: ReactPropTypes.string
    },

    getInitialState() {
        return {
            value: this.props.value || ''
        };
    },

    render() {
        return (
            <input 
                className={this.props.className} 
                id={this.props.id}
                placeholder={this.props.placeholder}
                onBlur={this._onSave}
                onKeyDown={this._onKeyDown}
                onChange={this._onChange}
                value={this.state.value}
                autoFocus={true}/>
        );
    },

    _onChange(/* object */event) {
        this.setState({
            value: event.target.value
        })
    },

    _onKeyDown(/*object */ event) {
        if(event.keyCode == ENTER_KEY_CODE) {
            this._onSave();
        }
    },

    _onSave() {
        this.props.onSave(this.state.value);
        this.setState({
            value: ''
        });
    }

});
