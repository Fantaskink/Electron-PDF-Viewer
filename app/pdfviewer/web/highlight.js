let iteration = -1;

document.addEventListener('DOMContentLoaded', function() {
    let highlightButton = document.getElementById('highlightText');

    highlightButton.addEventListener('click', highlight);
});  

async function highlight() {

    iteration++;

    let stringList = await getText();

    let splitStringList = splitStrings(stringList);

    let concatenatedString = concatenateStrings(splitStringList);

    console.log(concatenatedString[iteration])

    let searchString = concatenatedString[iteration];

    var event = document.createEvent('CustomEvent');
    event.initCustomEvent('find', true, true, {
        query: searchString,
        caseSensitive: true,
        highlightAll: false,
    });
     
  window.dispatchEvent(event);

  playAudio(iteration);

}

async function getText() {

    let textContentList = [];

    // Get the PDF document object
    var pdfDocument = PDFViewerApplication.pdfDocument;
    
    // Get the number of pages in the PDF file
    var numPages = pdfDocument.numPages;
    
    // Use Promise.all() to wait for all Promises to resolve
    const results = await Promise.all(
        Array.from({ length: numPages }, (_, i) => pdfDocument.getPage(i + 1).then((page) => page.getTextContent()))
    );
    // results is an array of text content for each page
    results.forEach((textContent) => {
        textContentList.push(textContent);
    });
    let allStrings = [];
    for (let i_1 = 0; i_1 < textContentList.length; i_1++) {
        let items_2 = textContentList[i_1].items;

        for (let j = 0; j < items_2.length; j++) {
            allStrings.push(items_2[j].str);
        }
    }
    return allStrings;
}

function splitStrings(list) {
    const results = [];
  
    for (let i = 0; i < list.length; i++) {
      const splitString = list[i].split(/([.!?])/);
      for (let j = 0; j < splitString.length; j += 2) {
        if (j + 1 < splitString.length) {
          const substring = splitString[j] + splitString[j + 1];
          if (substring !== '') {
            results.push(substring);
          }
        } else if (splitString[j] !== '') {
          results.push(splitString[j]);
        }
      }
    }
  
    return results;
  }

function concatenateStrings(list) {
  let result = [];

  for (let i = 0; i < list.length - 1; i++) {
    let current = list[i];
    let next = list[i + 1];

    if (current.match(/[a-z]\s*$/) && next.match(/^[a-z]/)) {
      result.push(current + next);
    } else {
      result.push(current);
    }
  }

  result.push(list[list.length - 1]);

  return result;
}

function concatenateStrings(strings) {
    const result = [];
    let currentString = "";
  
    for (let i = 0; i < strings.length; i++) {
      const string = strings[i];
  
      if (i < strings.length - 1 && ![". ", "? ", "! "].includes(string.slice(-2)) && string.slice(-1) === " ") {
        currentString += string;
      } else {
        if (currentString) {
          currentString += string;
          result.push(currentString);
          currentString = "";
        } else {
          result.push(string);
        }
      }
    }
  
    if (currentString) {
      result.push(currentString);
    }
  
    return result;
  }
  
  async function playAudio(i) {
    let audio = new Audio('../../../app/output/audio/line' + i  + '.mp3');

    return audio.play();
}
  