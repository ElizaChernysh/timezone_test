import './App.css';
import TodoList from './components/TodoList';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <header>
        <h1>Event Manager</h1>
        <TodoList/>
      </header>
    </div>
  );
}

export default App;
