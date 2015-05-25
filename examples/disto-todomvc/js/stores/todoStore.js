import React from 'react';
import {dis, $} from '../actions';
import 'babelify/polyfill';

const todos = {};

let _update = (todo, updates) => {
    return Object.assign({}, todo, updates);
};

let _updateAll = (todoAll, updates) => {
    for(let id in todoAll) {
        todoAll[id] = _update(todoAll[id], updates);
    }
    return todoAll;
}

export const areAllComplete = (_allTodos) => {
    for(let id in _allTodos) {
        if(!_allTodos[id].complete) {
            return false;
        }
        return true;
    }
}

export const todoStore = dis.register(todos, (o, action, ...args) => {
    switch(action) {
        case $.create:
            let [text] = args;
            if(text.trim() == '') {
                return o;
            }

            let id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
            return { 
                ...o, 
                [id] : {
                    id: id,
                    complete: false,
                    text: text
                }
            }
        break;

        case $.updateText:
            let [id, text] = args;
            if(text.trim() == '') {
                return o;
            }
            return {
                ...o,
                [id] : _update(o[id], {text: text})
            }
        break;

        case $.toggleComplete:
            let [todo] = args;
            let id = todo.id;
            let update;
            if(todo.complete) {
                update = {complete: false};
            } else {
                update = {complete: true};
            }

            return {
                ...o,
                [id] : _update(o[id], update)
            };
        break;

        case $.toggleComplteAll:
            let update;
            if(areAllComplete(o)) {
                update = {complete: false};
            } else {
                update = {complete: true};
            }
            return { ..._updateAll(o, update)};            
        break;

        case $.destroy:
            let [id] = args;
            delete o[id];
            return { ...o};
        break;

        case $.destroyCompleted:
            let todoAll = o;
            for (var id in todoAll) {
                if (todoAll[id].complete) {
                    delete todoAll[id];
                }
            }
            return {...todoAll};
        break;

        default:
            return o;
    }
});

  