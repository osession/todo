import logo from './logo.svg';
import './App.css';
import React from 'react';

class Todo extends React.Component {
  constructor(props) {
    super(props);
     this.state = {
        formtask: '', 
        tasks:[{"task":"Wash Clothes","completed":false},{"task":"Sweep Floor","completed":true}]
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
  }

  handleChange(event) {
    //alert('A character was entered: ' + this.state.formtask);
    this.setState({formtask: event.target.value});
  }

  handleSubmit(event) {
    // alert('A task was submitted: ' + this.state.formtask);
    this.setState({tasks:[...this.state.tasks, 
        {"task":this.state.formtask,"completed":false}]
    });
    this.setState({formtask:""});
    event.preventDefault();
  }
  
  handleToggle(event, index)  {
    const element = event.target;
    var target = this.state.tasks[index];
    if(target.completed) {
        target.completed = false;
    } else {
        target.completed = true;
    }
    console.log(this.state.tasks);
    element.classList.toggle("strike");
  }      
  
  handleFilter() {
    let filtered = this.state.tasks.filter(task => {
      return !task.completed;
    });
    this.setState({tasks:filtered});
    //event.preventDefault();
  }    

  render() {
    const listItems = this.state.tasks.map((thistask, index) => 
      <li className={thistask.completed ? "strike" : "todo"} 
        onClick={event => this.handleToggle(event, index)}
        key={thistask.task}>{thistask.task}</li>
    );
    return (
        <div>
          <h1> Todo List </h1>
          <form onSubmit={this.handleSubmit} onKeyUp={this.handleChange}>
            <label>
              Name:
              <input type="text" value={this.state.formtask} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>
          <ul>{listItems}</ul>
          <button onClick={this.handleFilter}>Clear Completed</button>
        </div>
    );
  }
}

function App() {
  return (
    <div className="App">
      <Todo />
    </div>
  );
}

export default App;
