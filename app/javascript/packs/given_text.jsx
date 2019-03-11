import React from 'react'

export class GivenText extends React.Component {
  constructor(props) {
    super(props);
    // this.props = {
    //   activeLine: props.activeLine,
    //   textToCompare: props.textToCompare,
    //   otherLines: props.otherLines
    // };
  }


  // static validatedLine() {
  //   return (
  //     <span>
  //       <span className="verified">{this.state.verifiedSymbols.join('')}</span>
  //       <span className = "error">{this.state.errorInText}</span>
  //       <span className = "skipped">{this.state.skippedText}</span>)
  //     </span>)
  // }

  

  render() {
    // let errorInText = this.state.errorInText;
    // let textBlock;
    // if (validatedLine) {
    //   document.getElementById('text').firstChild.innerHTML(validatedLine);
    //   textBlock = <div id='text'>{this.state.givenText}</div>;
    // }
    let activeLine;

    if (this.props.verifiedSymbols || this.props.errorInText) {
      activeLine = <div key={0} id='activeLine' >
        <span className="verified">{this.props.verifiedSymbols}</span>
        <span className = "error">{this.props.errorInText}</span>
        <span className = "skipped">{this.props.skippedText}</span>
      </div>;
    } else {
      activeLine = <div key={0} id='activeLine' >{this.props.activeLine.text}</div>;
    }

    return (
      <div id='text'>
        { activeLine }
        { this.props.otherLines }
      </div>
    );
  }

}
