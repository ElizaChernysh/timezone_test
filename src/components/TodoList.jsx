import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import Timezones from "../timezones.json";
import DisplayTodos from "./DisplayTodos";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
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
  const [selectedOption, setSelectedOption] = useState("published");
  const [todos, setTodos] = useState([]);
  const [time, setTime] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [datetime, setDatetime] = useState("Central Europen Time");
  const [timezone, setTimeZone] = useState("Europe/Berlin");

  const handleChangeTodo = (event) => {
    setTodos(event.target.value);
  };

  const handleChangeTime = (event) => {
    const format = event.target.value;
    const valueOfTime = new Date(`${format}`).toLocaleString("en-US", {
      timeZone: timezone,
    });
    setTime(valueOfTime);
  };

  const openAdd = () => {
    setIsOpen(!isOpen);
  };
  console.log(datetime);

  // const clickPublishedButton = () => {
  // }

  const addNewTodo = () => {
    if (todos === "" || !todos.trim()) {
      alert("Input is Empty");
    } else {
      props.addTodo({
        id: uuidv4(),
        item: todos,
        time: time,
        published: true,
      });
      setTodos("");
      // console.log(time.toLocaleString('en-US', {
      //   timeZone: 'America/New_York',
      //   dateStyle: 'short',
      //   timeStyle: 'short',
      // }),);
      // setTime(null);
    }
  };

  return (
    <div className="TodoList">
      <header className="TodoList__header">
        <h1 className="TodoList__title">Event Manager</h1>
        <Form.Select
          className="TodoList__select"
          defaultValue={"Central Europen Time"}
          onChange={(event) => setDatetime(event.target.value)}
        >
          {Timezones.timezones.map((option) => (
            <option key={option.id} value={option.value}>
              {option.name}
            </option>
          ))}
        </Form.Select>
      </header>

      <div className="TodoList__creator">
        <div className="DisplayTodos-buttons">
          <button onClick={() => setSelectedOption("published")}>
            published
          </button>
          <button onClick={() => setSelectedOption("unpublished")}>
            unpublished
          </button>
        </div>

        <button type="button" className="TodoList-button" onClick={openAdd}>
          + Add Event
        </button>
      </div>
      {isOpen && (
        <InputGroup className="addTodos">
          <Form.Control
            type="text"
            onChange={(event) => handleChangeTodo(event)}
            className="addTodos-input"
            value={todos}
            placeholder="Title"
          />
          <div className="addTodods__wrapper">
            <Form.Control
              type="datetime-local"
              min="2020-06-07T00:00"
              value={time}
              onChange={(event) => handleChangeTime(event)}
              className="addTodos-input"
            />
            <Button
              variant="outline-primary"
              type="button"
              className="addTodos-button"
              onClick={() => addNewTodo()}
            >
              + Add
            </Button>
          </div>
        </InputGroup>
      )}
      <DisplayTodos selectedOption={selectedOption} />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
