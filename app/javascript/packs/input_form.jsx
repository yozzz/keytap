import React from 'react'
import axios from 'axios'
import { TextValidator } from './text_validator';

export class InputForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: ''
    };
    this.handleInputTextChange = this.handleInputTextChange.bind(this)
  }

  handleInputTextChange(e) {
    let validatedActiveLine = TextValidator(e.target.value, this.props.activeLine.text, this.props.textToCompare,);
    this.state.inputValue = e.target.value;
    if (this.state.inputValue.length === this.props.activeLine.lineLength) {

      axios.get('/text.json', {params: {index: this.props.textIndex}, responseType: 'json'})
        .then(function (response) {
          this.props.onInputChange(response.data);
          this.setState({inputValue: ''});
        }.bind(this));
    } else {
      this.props.onInputChange(
        Object.assign(validatedActiveLine)
      )
    }
  }

  render() {
    return(
      <div id='input-text'>
        <form className='input-form'>
          <input className='input-text' value={this.state.inputValue} onChange={this.handleInputTextChange}/>
        </form>
      </div>
    )
  }
}
