import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const addTodoReducer = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodos: (state, action) => {
      state.push(action.payload);
      return state;
    },

    removeTodos: (state, action) => {
      return state.filter(item => item.id !== action.payload);
    },

    updateTodos: (state, action) => {
      return state.map(todo => {
        if (todo.id === action.payload.id) {
          return {
            ...todo,
            item: action.payload.item,
          }
        }
        return todo;
      });
    },

    publishedTodos: (state, action) => {
      return state.map((todo) => {
        if (todo.id === action.payload) {
          return {
            ...todo,
            published: !todo.published,
          };
        }
        return todo;
      });
    },

    // updateTimes: (state, action) => {
    //   return state.map(todo => {
    //     if (todo.id === action.payload) {
    //       return {
    //         ...todo,
    //         time: action.payload.time,
    //       }
    //     }
    //     return todo;
    //   });
    // },

    // updateTimes: (state, action) => {
    //   return state.map((todo) => {
    //     return {
    //       ...todo,
    //       time: action.payload,
    //     };
    //   })
    // }
  },
});


export const { addTodos, removeTodos, updateTodos, publishedTodos, updateTimes } = addTodoReducer.actions;
export const reducer = addTodoReducer.reducer;

