import "./App.css";
import TodoList from "./components/TodoList";
// import 'bootstrap/dist/css/bootstrap.min.css';
import DisplayTodos from "./components/DisplayTodos";

function App() {
  return (
    <div className="App">
      <TodoList />
      <DisplayTodos />
    </div>
  );
}

export default App;
