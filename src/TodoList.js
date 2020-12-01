import React, { Component } from "react";
import NewTodoForm from "./NewTodoForm";
import Todo from "./Todo";
import "./TodoList.css";
import axios from "axios";
import { CSSTransition, TransitionGroup } from "react-transition-group";

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: JSON.parse(window.localStorage.getItem("todos") || "[]"),
      
    };
    this.create = this.create.bind(this);
    this.remove = this.remove.bind(this);
    this.update = this.update.bind(this);
    this.toggleCompletion = this.toggleCompletion.bind(this);
  }
  create(newTodo) {
    this.setState({
      todos: [...this.state.todos, newTodo]
    },
    () =>
          window.localStorage.setItem("todos", JSON.stringify(this.state.todos))
          );
  }



  remove(id) {
    this.setState({
      todos: this.state.todos.filter(t => t.id !== id)
    }
    ,
    () =>
          window.localStorage.setItem("todos", JSON.stringify(this.state.todos)));
  }
  update(id, updatedTask) {
    const updatedTodos = this.state.todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, task: updatedTask };
      }
      return todo;
    });
    this.setState({ todos: updatedTodos },
      () =>
            window.localStorage.setItem("todos", JSON.stringify(this.state.todos)));
  }
  toggleCompletion(id) {
    const updatedTodos = this.state.todos.map(todo => {
      if (todo.id === id) {
        
        // let data = localStorage.getItem('mydata');

        // return {data};

        return { ...todo, completed: !todo.completed };

      }
      return todo;
    });
    this.setState({ todos: updatedTodos },
      () =>
            window.localStorage.setItem("todos", JSON.stringify(this.state.todos)));
  }
  render() {
    const todos = this.state.todos.map(todo => {
      return (
        <CSSTransition key={todo.id} timeout={500} classNames='todo'>
          <Todo
            key={todo.id}
            id={todo.id}
            task={todo.task}
            completed={todo.completed}
            removeTodo={this.remove}
            updateTodo={this.update}
            toggleTodo={this.toggleCompletion}
          />
        </CSSTransition>
      );
    });
    return (
      <div className='TodoList'>
        <h1>
          Add your Work! <span></span>
        </h1>
        

        <ul>
          <TransitionGroup className='todo-list'>{todos}</TransitionGroup>
        </ul>
        <NewTodoForm createTodo={this.create} />
        <br></br>

        <h1>
           <span>By Shanmukh</span>
        </h1>
      </div>
    );
  }
}
export default TodoList;
