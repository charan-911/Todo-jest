import React, { Component } from 'react';
import './App.css';
import { TodoForm, TodoList } from './components/todo';
import { addTodo, generateId, findById, toggleTodo, updateTodo, removeTodo,editTodo} from './lib/todoHelpers';
import { pipe, partial } from './lib/utils';

class App extends Component {

  state = {
    currentTodo: "",
    errorMessage: "",
    todos: [
      { id: 1, name: 'Learn JSX', isComplete: false },
      { id: 2, name: 'Build an Awesome App', isComplete: false },
      { id: 3, name: 'Ship it!', isComplete: true }
    ]
  }

  handleToggle = (todoId) => { 

    //Get updatedTodos
    const pipeline = pipe(findById, toggleTodo, partial(updateTodo, this.state.todos))
    const updatedTodos = pipeline(todoId, this.state.todos)

    this.setState({todos: updatedTodos})
  }

  handleOnchangeInput= (event)=> {
    this.setState({currentTodo: event.target.value, errorMessage: ""})
  }

  handleSubmit = (event) => { 
    event.preventDefault()

    const newTodo = { id: generateId(), name: this.state.currentTodo, isComplete: false }

    const updatedTodos = addTodo(this.state.todos, newTodo)
    
    this.setState({ todos: updatedTodos, currentTodo: '' })
  }

  handleEmptySubmit = (event) => {
    event.preventDefault()

    this.setState({ errorMessage: "Please supply a todo name" })
  }
  
  handleRemove = (id, event) => {
    event.preventDefault()

    const updatedTodos = removeTodo(this.state.todos, id)

    this.setState({todos: updatedTodos})
  }

  handleEdit = (id, value) => {
    
    const updatedTodos=editTodo(this.state.todos,id,value)
    console.log(updatedTodos)
    this.setState({todos: updatedTodos})
  }

  render() {

    const submitHandler = this.state.currentTodo ? this.handleSubmit : this.handleEmptySubmit

    return (
        <div className="todoWrapper">
          {this.state.errorMessage && <div className="errorMessage">{this.state.errorMessage}</div>}  
          
          <TodoForm
            handleSubmit={ submitHandler }  
            currentTodo={this.state.currentTodo}
            handleOnchangeInput={this.handleOnchangeInput} />
          
          <TodoList
            todos={this.state.todos}
            handleToggle={ this.handleToggle }
            handleOnchangeCheckbox={this.handleOnchangeCheckbox}
            handleRemove = {this.handleRemove}
            handleEdit={this.handleEdit}
          />
        </div>
    );
  }
}

export default App;
