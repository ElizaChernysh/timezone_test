import React, { useState } from "react";
import { connect } from "react-redux";
import {
  addTodos,
  publishedTodos,
  removeTodos,
  updateTodos,
} from "../redux/reducer";
import TodoItem from "./TodoItem";
import "./TodoList.css";

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
  const [sort, setSort] = useState("published");

  return (
    <div className="DisplayTodos">
      <div className="DisplayTodos-buttons">
        <button onClick={() => setSort("unpublished")}>unpublished</button>
        <button onClick={() => setSort("published")}>published</button>
      </div>
      <ul>
        {props.todos.length > 0 && sort === "published"
          ? props.todos.map((item) => {
              return (
                <TodoItem
                  key={item.id}
                  item={item}
                  time={item.time}
                  removeTodo={props.removeTodo}
                  updateTodo={props.updateTodo}
                  publishedTodo={props.publishedTodo}
                />
              );
            })
          : null}

        {props.todos.length > 0 && sort === "unpublished"
          ? props.todos.map((item) => {
              return (
                <TodoItem
                  key={item.id}
                  item={item}
                  removeTodo={props.removeTodo}
                  updateTodo={props.updateTodo}
                  publishedTodo={props.publishedTodo}
                />
              );
            })
          : null}
      </ul>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(DisplayTodos);
