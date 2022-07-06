import React, { useCallback, useEffect, useState } from "react";
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
  updateTimes,
} from "../redux/reducer";
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
    // updateTime: (obj) => dispatch(updateTimes(obj)), 
  };
};

// function convertTZ(date, tzString) {
//   return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {timeZone: tzString}));   
// }

const TodoList = (props) => {
  const [selectedOption, setSelectedOption] = useState("published");
  const [todos, setTodos] = useState([]);
  // const [showTodos, setShowTodos] = useState([]);
  const [time, setTime] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  // const [timezone, setTimeZone] = useState("Europe/Berlin");
   const [timezone, setTimeZone] = useState(Timezones.timezones[0].value);

  //  useEffect(() => {
  //   const filteredTodos = [] // викливати хелпер getFilteredTodos(boolean), передаємо todos
  //   setShowTodos(filteredTodos);
  //  }, [seletedOption, setShowTodos])

   const handleChangeTodo = useCallback((event) => {
    setTodos(event.target.value)
  }, [setTodos])

  const handleTimezoneName = (event) => {
    setTimeZone(event.target.value);
    // console.log(timezone);
  }

  const handleChangeTime = (event) => {
    setTime(event.target.value);
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
        published: true,
      });
      setTodos("");
    }
  };

  return (
    <div className="TodoList">
      <header className="TodoList__header">
        <h1 className="TodoList__title">Event Manager</h1>
        <Form.Select
          className="TodoList__select"
          value={timezone}
          // defaultValue={Timezones.timezones[0].value}
          onChange={(event) => handleTimezoneName(event)}
        >
          {Timezones.timezones.map((option) => (
            <option key={option.id} value={option.value}>
              {option.name}
            </option>
          ))}
        </Form.Select>
      </header>

      <div className="TodoList__creator">
        <div className="buttonForPublished-wrapper">
          <button
            // className="buttonForPublished buttonForPublished__published"
            onClick={() => setSelectedOption("published")}
          >
            published
          </button>
          <button
            // className="buttonForPublished__unpublished"
            onClick={() => setSelectedOption("unpublished")}
          >
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
      <DisplayTodos 
        selectedOption={selectedOption}
        timezone={timezone}
      />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
