import React, { Component } from 'react';

import Todo from '../../components/Todo/Todo';
import * as actionTypes from "../../store/actions/actionTypes";

import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import './TodoList.css';

class TodoList extends Component {
  state = {
    todos: [
      { id: 1, title: 'SWPP', content: 'take swpp class', done: true },
      { id: 2, title: 'Movie', content: 'watch movie', done: false },
      { id: 3, title: 'Dinner', content: 'eat dinner', done: false }
    ],
    selectedTodo: null,
  }

  clickTodoHandler = (td) => {
    this.props.history.push("/todos/" + td.id); }

  render() {
    console.log(this.props);
    const todos = this.props.storedTodos.map(td => {
      return (
        <Todo
          key={td.id}
          title={td.title}
          done={td.done}
          clickDetail={() => this.clickTodoHandler(td)}
          clickDone={() => this.props.onToggleTodo(td.id)}
          clickDelete={() => this.props.onDeleteTodo(td.id)}
        />
      );
    });


    return (
      <div className="TodoList">
        <div className='title'>
          {this.props.title}
        </div>
        <div className='todos'>
          {todos}
        </div>
        <NavLink to='/new-todo' exact>New Todo</NavLink>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    storedTodos: state.td.todos,
  };
}
const mapDispatchToProps = dispatch => {
  return {
    onToggleTodo: (id) =>
      dispatch({ type: actionTypes.TOGGLE_DONE, targetID: id }),
    onDeleteTodo: (id) =>
      dispatch({ type: actionTypes.DELETE_TODO, targetID: id }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TodoList));