import React from 'react'

export function TextValidator(inputText, activeLineText, textToCompare) {
  // let givenText = document.getElementById('hidden-text').innerHTML;
  let inputTextSymbols = inputText.split('');
  let verifiedSymbols = [];
  let errorSymbol = '';
  let errorInText = '';
  if (!inputText) {
    return {
      verifiedSymbols: '',
      activeLineText: activeLineText
    }
  }

  for(const [i, value] of inputTextSymbols.entries()) {
    if (textToCompare[i] === value ) {
      verifiedSymbols.push(value)
    } else {
      if (i === 0) {
        errorSymbol = textToCompare[0]
      } else {
        errorSymbol = value;
      }
      errorInText = textToCompare[i];
      break;
    }
  }

  return {
    verifiedSymbols: verifiedSymbols.join(''),
    errorInText: errorInText,
    skippedText: textToCompare.substring((verifiedSymbols.join('') + errorSymbol).length, textToCompare.length)
  };

  // if (errorSymbol){
    // let validatedLine = `
    //   <span class="verified">{verifiedSymbols.join('')}</span>
    //   <span class="error">{errorInText}</span>
    //   <span class="skipped">{givenText.substring((verifiedSymbols.join('') + errorSymbol).length, givenText.length)}</span>
    // `;
    //   validatedLine: validatedLine;
  // } else {
  //   return {
  //     givenText: document.getElementById('hidden-text').innerHTML
  //   }
  // }

}
