import './App.css';
import TodoList from './components/TodoList';
// import 'bootstrap/dist/css/bootstrap.min.css';
import DisplayTodos from './components/DisplayTodos';

function App() {
  return (
    <div className="App">
        <h1>Event Manager</h1>
        <TodoList/>
        <DisplayTodos/>
    </div>
  );
}

export default App;
