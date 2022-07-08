import React from "react";
import { connect } from "react-redux";
import {
  addTodos,
  publishedTodos,
  removeTodos,
  updateTodos,
} from "../../redux/reducer";
import TodoItem from "../TodoItem/TodoItem";
import './DisplayTodos.scss';

const mapStateToProps = (state) => {
  return {
    todos: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTodo: (obj) => dispatch(addTodos(obj)),
    removeTodo: (id) => dispatch(removeTodos(id)),
    updateTodo: (obj) => dispatch(updateTodos(obj)),
    publishedTodo: (id) => dispatch(publishedTodos(id)),
  };
};

const DisplayTodos = (props) => {
  const { selectedOption, timezone } = props;

  console.log(selectedOption);

  return (
    <div className="DisplayTodos">
      <ul className="DisplayTodos__wrapper">
        {props.todos.length > 0 && selectedOption === "published"
          ? props.todos.map((item) => {
              return (
                item.published === true && (
                  <TodoItem
                    key={item.id}
                    item={item}
                    time={item.time}
                    timezone={timezone}
                    removeTodo={props.removeTodo}
                    updateTodo={props.updateTodo}
                    publishedTodo={props.publishedTodo}
                  />
                )
              );
            })
          : null}
        {props.todos.length > 0 && selectedOption === "unpublished"
          ? props.todos.map((item) => {
              return (
                item.published === false && (
                  <TodoItem
                    key={item.id}
                    item={item}
                    time={item.time}
                    timezone={timezone}
                    removeTodo={props.removeTodo}
                    updateTodo={props.updateTodo}
                    publishedTodo={props.publishedTodo}
                  />
                )
              );
            })
          : null}
      </ul>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(DisplayTodos);
