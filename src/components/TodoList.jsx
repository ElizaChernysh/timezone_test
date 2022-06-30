import React, { useState } from "react";
import { connect } from "react-redux";
import { addTodos, publishedTodos, removeTodos, updateTodos } from "../redux/reducer";
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

const TodoList = (props) => {
  const [todos, setTodos] = useState("");
  const [time, setTime] = useState(null)
  const [isOpen, setIsOpen] = useState(false);

  const handleChangeTodo = (event) => {
    setTodos(event.target.value);
  };

  const handleChangeTime = (event) => {
    setTime(event.target.value);
  }

  const openAdd = () => {
    setIsOpen(!isOpen);
  };

  const addNewTodo = () => {
    if (todos === "" || ! todos.trim()) {
      alert("Input is Empty")
    } else {
      props.addTodo({
        id: Math.floor(Math.random() * 1000),
        item: todos,
        time: time,
        published: false,
      });
      setTodos("");
      setTime(null)
    }
  };

  return (
    <div className="TodoList">
      <button type="button" className="TodoList-button" onClick={openAdd}>
        + Add Event
      </button>
      {isOpen && (
        <div className="addTodos">
          <input
            type="text"
            onChange={(event) => handleChangeTodo(event)}
            className="addTodos-input"
            value={todos}
            placeholder="Title"
          />
          <input
            type="date"
            min="30.06.2022"
            value={time}
            onChange={(event) => handleChangeTime(event)}
          />
          <button
            type="button"
            className="addTodos-button"
            // onClick={() =>
            //   props.addTodo({
            //     id: Math.floor(Math.random() * 1000),
            //     item: todos,
            //     published: false,
            //   })
            // }
            onClick={() => addNewTodo()}
          >
            + Add
          </button>
        </div>
      )}
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
