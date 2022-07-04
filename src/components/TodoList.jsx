import React, { useState } from "react";
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import Timezones from "../timezones.json";
import {
  addTodos,
  publishedTodos,
  removeTodos,
  updateTodos,
} from "../redux/reducer";
// import { getTimezones } from "../api";
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
  const [todos, setTodos] = useState([]);
  const [time, setTime] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [datetime, setDatetime] = useState("Central Europen Time");

  const handleChangeTodo = (event) => {
    setTodos(event.target.value);
  };

  const handleChangeTime = (event) => {
    const valueOfTime = new Date(`${event.target.value}`).toLocaleString('en-US', {
      timeZone: datetime,
    })
    setTime(valueOfTime);
  };

  const openAdd = () => {
    setIsOpen(!isOpen);
  };

  const addNewTodo = () => {
    if (todos === "" || !todos.trim()) {
      alert("Input is Empty");
    } else {
      props.addTodo({
        id: uuidv4(),
        item: todos,
        time: time,
        published: false,
      });
      setTodos("");
      console.log(time.toLocaleString('en-US', {
        timeZone: 'America/New_York',
        dateStyle: 'short',
        timeStyle: 'short',
      }),);
      setTime(null);
    }
  };

  return (
    <div className="TodoList">
      <select
        defaultValue={datetime}
        onChange={(event) => setDatetime(event.target.value)}
      >
        {Timezones.timezones.map((option) => (
          <option key={option.id} value={option.name}>
            {option.name}
          </option>
        ))}
      </select>
      {/* <select
        value={datetime}
        onChange={hadleDatetyTimeChange}
        className="TodoList-select"
      >
        <option selected value="1">
          Home
        </option>
        <option value="2">Marketing</option>
        <option value="3">Work</option>
        <option value="3">Head Office</option>
      </select> */}

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
            type="datetime-local"
            min="2020-06-07T00:00"
            value={time}
            onChange={(event) => handleChangeTime(event)}
          />
          <button
            type="button"
            className="addTodos-button"
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
