import React, { useState, useRef } from "react";
import "./TodoItem.css";

const TodoItem = (props) => {
  const { item, updateTodo, removeTodo, publishedTodo, timezone} = props;
  const [isEditVisible, setIsEditVisible] = useState(false);

  const editVisibility = () => {
    setIsEditVisible(!isEditVisible);
  };

  const inputRef = useRef(true);

  const changeFocus = () => {
    inputRef.current.disabled = false;
    inputRef.current.focus();
  };


  const update = (id, value, e) => {
    if (e.which === 13) {
      updateTodo({ id, item: value });
      inputRef.current.disabled = true;
    }
  };

  return (
    <li key={item.id} className="TodoList__card">
      <textarea
        className="TodoList__textarea"
        ref={inputRef}
        disabled={inputRef}
        defaultValue={item.item}
        onKeyPress={(e) => update(item.id, inputRef.current.value, e)}
      />
      <div className="container">
        <button type="button" onClick={editVisibility}>
          ...
        </button>
        {/* <p className="TodoItem__time">{item.time}</p> */}
        <p className="TodoItem__time">
        {new Date(item.time).toLocaleString('en-US', {
                    timeZone: `${timezone}`,
                    year: 'numeric',
                    day: '2-digit',
                    month: 'short',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
        </p>
      </div>

      {isEditVisible && (
        <>
          <div className="btns">
            <button type="button" onClick={() => changeFocus()}>
              ✍🏻
            </button>
            <button type="button" onClick={() => publishedTodo(item.id)}>
              📥
            </button>
            <button type="button" onClick={() => removeTodo(item.id)}>
              ❌
            </button>
          </div>
        </>
      )}
      {/* {item.published && <span className="TodoList-published">done</span>} */}
    </li>
  );
};

export default TodoItem;
