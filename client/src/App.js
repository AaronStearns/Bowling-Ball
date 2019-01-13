import React, { Component } from 'react';

import './App.css';

class App extends Component {
  state = {
    response: '',
    bodyweight: '',
    experience: '',
    responseToPost: '',
  };

  // componentDidMount() {
  //   this.callApi()
  //     .then(res => this.setState({ response: res.express }))
  //     .catch(err => console.log(err));
  // }

  // callApi = async () => {
  //   const response = await fetch('/api/hello');
  //   const body = await response.json();

  //   if (response.status !== 200) throw Error(body.message);

  //   return body;
  // };

  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch('/api/world', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ bodyweight: this.state.bodyweight, 
                             experience: this.state.experience }),
    });
    const body = await response.text();

    this.setState({ responseToPost: body });
  };

  render() {
    return (
      <div className="App">
        <p>Bowling Ball Weight Calculator</p>
        <form onSubmit={this.handleSubmit}>
          <p>
            <strong>Enter your weight:</strong>
          </p>
          <input
            type="text"
            value={this.state.post}
            onChange={e => this.setState({ bodyweight: e.target.value })}
          />
          <p>
              <label>Bowling Experience Level:</label><br/>            
              <input type = "radio"
                    name = "Beginner"
                    id = "Beginner"
                    value = "1" 
                    onChange={e => this.setState({ experience: e.target.value })}
                    />
              <label for = "Beginner">Beginner</label>
              <input type = "radio"
                    name = "Intermediate"
                    id = "Intermediate"
                    value = "2"
                    onChange={e => this.setState({ experience: e.target.value })}
                    />
              <label for = "Intermediate">Intermediate</label>
              <input type = "radio"
                    name = "Advanced"
                    id = "Advanced"
                    value = "3"
                    onChange={e => this.setState({ experience: e.target.value })}
                    />
              <label for = "Advanced">Advanced</label>
            </p>       
          <button type="submit">Calculate</button>
        </form>
        <p>{this.state.responseToPost}</p>
      </div>
    );
  }
}

export default App;