import React from 'react';
import mix from 'disto/mix';
import {todoStore, areAllComplete} from '../stores/todoStore';
import Header from './Header';
import MainSection from './MainSection';
import Footer from './Footer';


export default React.createClass({
    mixins: [mix],

    observe() {
        return {todoStore}  //obervable stores 
    },
    
    render() {
        return (
            <div>
                <Header/>
                <MainSection allTodos={this.state.data.todoStore} areAllComplete={areAllComplete(this.state.data.todoStore)} />
                <Footer allTodos={this.state.data.todoStore} />
            </div>
        );
    }
});
