import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    bodyweight: '',
    experience: '',
    responseToPost: '',
  };

  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch('/api/world', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        bodyweight: this.state.bodyweight,
        experience: this.state.experience
      }),
    });
    const body = await response.text();

    this.setState({ responseToPost: body });
  };

  render() {
    return (
      <div className="App">
        <h1>kNN-powered <br/>Bowling Ball<br/>Weight Calculator</h1>
        <div className="mainApp">
        <form onSubmit={this.handleSubmit}>
          <p>
            Enter your weight (in pounds):
          </p>
          <input
            className="mainInput"
            type="text"
            value={this.state.post}
            onChange={e => this.setState({ bodyweight: e.target.value })}
          />
          <p>
            <label>Bowling Experience:</label><br /><br />
            <input type="radio"
              name="Beginner"
              id="Beginner"
              value="1"
              onChange={e => this.setState({ experience: e.target.value })}
            />
            <label for="Beginner">Beginner</label><br />
            <input type="radio"
              name="Intermediate"
              id="Intermediate"
              value="2"
              onChange={e => this.setState({ experience: e.target.value })}
            />
            <label for="Intermediate">Intermediate</label><br />
            <input type="radio"
              name="Advanced"
              id="Advanced"
              value="3"
              onChange={e => this.setState({ experience: e.target.value })}
            />
            <label for="Advanced">Advanced</label><br />
          </p>
          <button className="theButton" type="submit">Calculate</button>
          <div className="githubLink">
            <a href="https://github.com/aaronstearns">Github</a>
          </div>
        </form>
        </div>
        <div className="responseWeight">
          <p>{this.state.responseToPost}</p>
        </div>
      </div>
              
    );
  }
}

export default App;