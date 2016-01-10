import React, { Component, PropTypes } from 'react';
import {connect} from "react-redux"
import {addTodo, completeTodo, setVisibilityFilter, VisibilityFilters} from "../actions/actions"
import AddTodo from "../components/AddTodo";
import Footer from "../components/Footer";
import Todo from "../components/Todo";
import TodoList from "../components/TodoList"
// import 'scss/main';

/*
 * React-router's <Router> component renders <Route>'s
 * and replaces `this.props.children` with the proper React Component.
 *
 * Please refer to `routes.jsx` for the route config.
 *
 * A better explanation of react-router is available here:
 * https://github.com/rackt/react-router/blob/latest/docs/Introduction.md
 */
export default class App extends Component {
  render() {
    const{dispatch, visibleTodos, visibilityFilters} = this.props
    return (
      <div>
        <AddTodo
          onAddClick={text =>
            dispatch(addTodo(text))
          } />
        <TodoList
          todos={visibleTodos}
          onTodoClick={ index  =>
            dispatch(completeTodo(index))
          } />
        <Footer
          filter = {visibilityFilter}
          onFilterChange={nextFilter =>
            dispatch(setVisibilityFilter(nextFilter))
          } />
      </div>
    );
  }
};

App.propTypes = {
  visibleTodos: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired
  }).isRequired).isRequired,
  visibilityFilter: PropTypes.oneOf([
    'SHOW_ALL',
    'SHOW_COMPLETED',
    'SHOW_ACTIVE'
  ]).isRequired
};

function selectTodos(todos, filter){
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return todos;
    case VisibilityFilters.SHOW_COMPLETED:
      return todos.filter(todo => todo.complete)
    case VisibilityFilters.SHOW_ACTIVE:
      return todos.filtere(todo => !todo.completed)
  }
}

function select(state){
  return{
    visibleTodos: selectTodos(state.todos, state.visibilityFilter),
    visibilityFilter: state.visibilityFilter
  }
}

connect(select)(App)
