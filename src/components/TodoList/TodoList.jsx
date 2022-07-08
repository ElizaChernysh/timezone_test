import React, { useCallback, useState } from "react";
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import Timezones from "../../timezones.json";
import DisplayTodos from "../DisplayTodos/DisplayTodos";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Tabs from "react-bootstrap/Tabs";
import { addTodos } from "../../redux/reducer";
import "./TodoList.scss";
import { Tab } from "bootstrap";
import Preview from "../Preview/Preview";

const mapStateToProps = (state) => {
  return {
    todos: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTodo: (obj) => dispatch(addTodos(obj)),
  };
};

const TodoList = (props) => {
  const [selectedOption, setSelectedOption] = useState("published");
  const [todos, setTodos] = useState([]);
  // const [showTodos, setShowTodos] = useState([]);
  const [time, setTime] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  // const [timezone, setTimeZone] = useState("Europe/Berlin");
  const [timezone, setTimeZone] = useState(Timezones.timezones[0].value);

  const handleChangeTodo = useCallback(
    (event) => {
      setTodos(event.target.value);
    },
    [setTodos]
  );

  const handleTimezoneName = useCallback(
    (event) => {
      setTimeZone(event.target.value);
    },
    [setTimeZone]
  );

  const handleChangeTime = useCallback(
    (event) => {
      setTime(event.target.value);
    },
    [setTime]
  );

  const openAdd = useCallback(() => {
    setIsOpen(!isOpen);
  }, [setIsOpen, isOpen]);

  const addNewTodo = () => {
    if (todos === "" || !todos.trim() || todos.time === "") {
      alert("Input is Empty");
    } else {
      props.addTodo({
        id: uuidv4(),
        item: todos,
        time: time,
        published: true,
      });
      setTodos("");
      setTime("");
    }
  };

  return (
    <div className="TodoList">
      <header className="TodoList__header">
        <h1 className="TodoList__title">Event Manager</h1>

        <div className="TodoList__select-wrapper">
          <div className="Preview-block">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M8.01406 5.99671C7.64337 6.29266 7.28769 6.61038 6.94903 6.94903C5.3185 8.57957 4.1733 10.6047 3.60642 12.8H4.8C6.07304 12.8 7.29394 13.3057 8.19411 14.2059C9.09429 15.1061 9.6 16.327 9.6 17.6V19.2C9.6 19.6243 9.76857 20.0313 10.0686 20.3314C10.3687 20.6314 10.7757 20.8 11.2 20.8C12.473 20.8 13.6939 21.3057 14.5941 22.2059C15.4943 23.1061 16 24.327 16 25.6V28.8C17.0819 28.8 18.157 28.6628 19.2 28.3935V25.6C19.2 24.327 19.7057 23.1061 20.6059 22.2059C21.5061 21.3057 22.727 20.8 24 20.8H27.8659C28.4827 19.2752 28.8 17.6455 28.8 16C28.8 14.3387 28.4771 12.7107 27.8659 11.2H27.2C26.7757 11.2 26.3687 11.3686 26.0686 11.6686C25.7686 11.9687 25.6 12.3757 25.6 12.8C25.6 14.073 25.0943 15.2939 24.1941 16.1941C23.2939 17.0943 22.073 17.6 20.8 17.6C19.527 17.6 18.3061 17.0943 17.4059 16.1941C16.5057 15.2939 16 14.073 16 12.8C16 12.3757 15.8314 11.9687 15.5314 11.6686C15.2313 11.3686 14.8243 11.2 14.4 11.2H13.6C12.1148 11.2 10.6904 10.61 9.6402 9.5598C8.6839 8.6035 8.10919 7.33693 8.01406 5.99671ZM8.78212 1.72055C7.28198 2.47878 5.8971 3.47549 4.68629 4.68629C2.12407 7.24851 0.520602 10.5903 0.106778 14.1541C0.100057 14.1977 0.0950942 14.2418 0.0919641 14.2865C0.0309625 14.853 0 15.4249 0 16C0 18.1012 0.413852 20.1817 1.21793 22.1229C2.022 24.0641 3.20055 25.828 4.68629 27.3137C6.17203 28.7994 7.93585 29.978 9.87707 30.7821C11.2468 31.3494 12.6859 31.7225 14.1526 31.893C14.1971 31.8999 14.2422 31.905 14.2879 31.9081C14.8554 31.9692 15.427 32 16 32C17.7761 32 19.5376 31.7043 21.2125 31.1271C21.2947 31.1052 21.3744 31.077 21.4508 31.0429C21.6766 30.9611 21.9007 30.8741 22.1229 30.7821C24.0641 29.978 25.828 28.7994 27.3137 27.3137C28.5201 26.1073 29.5239 24.7176 30.2892 23.1985C30.3226 23.1407 30.3524 23.0807 30.3784 23.0187C30.5219 22.7247 30.6566 22.426 30.7821 22.1229C31.5861 20.1817 32 18.1011 32 16C32 13.5444 31.4355 11.1469 30.3784 8.98122C30.3524 8.9193 30.3226 8.85937 30.2893 8.80171C29.5299 7.29404 28.5298 5.90237 27.3137 4.68629C24.3131 1.68571 20.2435 0 16 0C13.5523 0 11.1625 0.560845 9.00231 1.61137C8.92581 1.6422 8.85223 1.67877 8.78212 1.72055ZM11.2 4.13408V5.6C11.2 6.23652 11.4529 6.84697 11.9029 7.29706C12.353 7.74714 12.9635 8 13.6 8H14.4C15.673 8 16.8939 8.50571 17.7941 9.40589C18.6943 10.3061 19.2 11.527 19.2 12.8C19.2 13.2243 19.3686 13.6313 19.6686 13.9314C19.9687 14.2314 20.3757 14.4 20.8 14.4C21.2243 14.4 21.6313 14.2314 21.9314 13.9314C22.2314 13.6313 22.4 13.2243 22.4 12.8C22.4 11.527 22.9057 10.3061 23.8059 9.40589C24.4406 8.77121 25.2347 8.33263 26.0941 8.12913C25.7726 7.71685 25.4245 7.32259 25.051 6.94903C22.6505 4.54857 19.3948 3.2 16 3.2C14.3387 3.2 12.7107 3.52295 11.2 4.13408ZM25.992 24H24C23.5757 24 23.1687 24.1686 22.8686 24.4686C22.5686 24.7687 22.4 25.1757 22.4 25.6V27.0851C23.3667 26.527 24.2583 25.8436 25.051 25.051C25.3844 24.7176 25.6985 24.3666 25.992 24ZM12.8 28.3935V25.6C12.8 25.1757 12.6314 24.7687 12.3314 24.4686C12.0313 24.1686 11.6243 24 11.2 24C9.92696 24 8.70606 23.4943 7.80589 22.5941C6.90571 21.6939 6.4 20.473 6.4 19.2V17.6C6.4 17.1757 6.23143 16.7687 5.93137 16.4686C5.63131 16.1686 5.22435 16 4.8 16H3.2C3.2 17.6809 3.53108 19.3454 4.17434 20.8983C4.8176 22.4513 5.76044 23.8624 6.94903 25.051C8.13762 26.2396 9.54869 27.1824 11.1017 27.8257C11.655 28.0549 12.2226 28.2445 12.8 28.3935Z"
                fill="black"
              />
            </svg>

            <p className="Preview-block__name">Select Timezone</p>
          </div>

          <Form.Select
            className="TodoList__select"
            value={timezone}
            onChange={(event) => handleTimezoneName(event)}
          >
            {Timezones.timezones.map((option) => (
              <option key={option.id} value={option.value}>
                {option.name}
              </option>
            ))}
          </Form.Select>
        </div>
      </header>

      <div className="TodoList__creator">
        <Tabs
          id="controlled-tab-example"
          activeKey={selectedOption}
          onSelect={(k) => setSelectedOption(k)}
          className="TodoList__tabs"
        >
          <Tab eventKey="published" title="Published"></Tab>
          <Tab eventKey="unpublished" title="Unpublished"></Tab>
        </Tabs>

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
          <div className="addTodos__wrapper">
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

      <DisplayTodos selectedOption={selectedOption} timezone={timezone} />

      {props.todos.length === 0 &&
      <Preview/>}
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
