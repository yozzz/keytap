import React from 'react'
import ReactDOM from 'react-dom'
import { InputForm } from './input_form'
import { GivenText } from './given_text'

export class TypeTextModule extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeLine: {
        text: props.givenText[0].line,
        lineLength: props.givenText[0].lineLength,
      },
      verifiedSymbols: '',
      errorInText: '',
      skippedText: '',
      textToCompare: props.givenText[0].line,
      otherLines: TypeTextModule.takeOtherLines(props.givenText),
      textIndex: props.textIndex
    };

    this.handleInputTextChange = this.handleInputTextChange.bind(this)
  }

  static takeOtherLines(lines) {
    return (lines.slice(1).map((obj, index) =>
        <div key={index}>{obj.line}</div>)
    )
  }

  handleInputTextChange(result) {
    if (result.givenText) {
      this.setState({
        activeLine: {
          text: result.givenText[0].line,
          lineLength: result.givenText[0].lineLength,
        },
        verifiedSymbols: '',
        errorInText: '',
        skippedText: '',
        textToCompare: result.givenText[0].line,
        otherLines: TypeTextModule.takeOtherLines(result.givenText),
        textIndex: result.textIndex
      });
    } else {
      this.setState({
        verifiedSymbols: result.verifiedSymbols,
        errorInText: result.errorInText,
        skippedText: result.skippedText,
      });
    }

  }

  render() {
    return (
      <div>
        <InputForm
          onInputChange={this.handleInputTextChange}
          textIndex={this.state.textIndex}
          textToCompare={this.state.textToCompare}
          activeLine={this.state.activeLine}
        />
        <GivenText
          activeLine={this.state.activeLine}
          verifiedSymbols={this.state.verifiedSymbols}
          errorInText={this.state.errorInText}
          skippedText={this.state.skippedText}
          textToCompare={this.state.textToCompare}
          otherLines={this.state.otherLines}
        />
      </div>
    )
  }

}

document.addEventListener('DOMContentLoaded', () => {
  const node = document.getElementById('block-data');
  const data = JSON.parse(node.getAttribute('data'));

  ReactDOM.render(
    <TypeTextModule {...data}/>,
    document.getElementById('text-block')
  );
});



