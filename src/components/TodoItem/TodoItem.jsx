import React, { useState, useRef, useCallback } from "react";
import "./TodoItem.scss";
import more from "../../image/more.png";

const TodoItem = (props) => {
  const { item, updateTodo, removeTodo, publishedTodo, timezone } = props;
  const [isEditVisible, setIsEditVisible] = useState(false);

  const editVisibility = useCallback(() => {
    setIsEditVisible(!isEditVisible);
  }, [isEditVisible, setIsEditVisible]);

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
    <li key={item.id}>
      <div className="TodoList__card">
        <textarea
          className="TodoItem__textarea"
          ref={inputRef}
          disabled={inputRef}
          defaultValue={item.item}
          onKeyPress={(e) => update(item.id, inputRef.current.value, e)}
        />
        <div className="container">
          <button type="button" onClick={editVisibility}>
            <img src={more} alt="more about work with todo" />
          </button>
          <p className="TodoItem__time">
            {new Date(item.time).toLocaleString("en-US", {
              timeZone: `${timezone}`,
              year: "numeric",
              day: "2-digit",
              month: "short",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
          {/* format('h:mm a - DD MMM YYYY') */}
        </div>
      </div>

      {isEditVisible && (
        <>
          <div className="Edit-window">
            <button
              className="Edit-window__button"
              type="button"
              onClick={() => changeFocus()}
            >
              ✍🏻 Edit
            </button>
            <button
              className="Edit-window__button"
              type="button"
              onClick={() => publishedTodo(item.id)}
            >
              📥 Unpublish
            </button>
            <button
              className="Edit-window__button"
              type="button"
              onClick={() => removeTodo(item.id)}
            >
              ❌ Delete
            </button>
          </div>
        </>
      )}
    </li>
  );
};

export default TodoItem;
