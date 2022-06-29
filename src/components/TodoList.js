import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addTodos } from '../redux/reducer';
import './TodoList.css';

const mapStateToProps = (state) => {
  return {
    todos: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTodo: (obj) => dispatch(addTodos(obj)),
  }
}

const TodoList = (props) => {
  const [todos, setTodos] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isEditVisible, setIsEditVisible] = useState(false);

  const handleChange = (event) => {
    setTodos(event.target.value);
  }

  const editVisibility = () => {
    setIsEditVisible(!isEditVisible);
  };

  const openAdd = () => {
    setIsOpen(!isOpen);
  }

  return (
    <div className="TodoList">
      <button
        type="button"
        className="TodoList-button"
        onClick={openAdd}
      >
        + Add Event
      </button>
      {isOpen &&
          <div className="addTodos">
            <input
              type="text"
              onChange={(event) => handleChange(event)}
              className="addTodos-input"
            />
            <button
              type="button"
              className="addTodos-button"
              onClick={() => props.addTodo({
                id: todos[todos.length - 1].id + 1,
                item: todos,
                published: false,
              })}
            >
              + Add
            </button>
          </div>
      }
      <ul className="TodoList__list">
        {
          props.todos.map(item => {
            return <li
              key={item.id}
              className="TodoList__item"
            >
              {item.item}
              <button
                type="button"
                onClick={editVisibility}
              >
                ...
              </button>
              <div className="Edit__wrapper">
                {isEditVisible && (
                  <p>Change</p>
                )}
              </div>
            </li>
          })
        }
      </ul>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);