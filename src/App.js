import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react'
import axios from 'axios'

class App extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      value: '',
      response: false,
      data: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit() {
    axios.get('https://api.languagetoolplus.com/v2/check?text='+this.state.value+'&language=es')
    .then((response)=>{
      this.setState({
        response: true,
        data: response.data,
      })
    })
  }

  renderResponse(){
    if(this.state.response === true ){
      console.log(this.state.data.matches.length)
      if(this.state.data.matches.length !== 0){
        return(
          <div className="response">
          {this.state.data.matches.map((match, index, key) => {
            return(
              <div className="error">
                <p><span>Error #{index+1}:</span> {match.message}</p>
                <p className="des"><span>Descripcion del error:</span> {match.rule.description}</p>
              </div>
            )
          })}
          </div>
        )
      }else{
        return(
          <div className="success">
            <p><span>Excelente!</span> Tu frase está correctamente escrita</p>
          </div>
        )
      }
    }
    else{
      return null
    }
  }
  render(){
    return (
      <div className="App">
        <h1>Título:</h1>
        <input type="textarea" value={this.state.value} onChange={this.handleChange} />
        <div className="btn" onClick={this.handleSubmit}>Revisar texto</div>
        {this.renderResponse()}
      </div>
    );
  }
}

export default App;
