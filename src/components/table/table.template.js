const CODES = {
  A: 65,
  Z: 90
}

// function toCell(rowIndex, colIndex) {
//   return `
//     <div class="cell" contenteditable="true"
//     data-col="${colIndex}" data-row="${rowIndex + 1}"></div>
//   `
// }

function toCell(rowIndex) {
  return function(_, colIndex) {
    return `
    <div class="cell" 
         contenteditable="true"
         data-col="${colIndex}"
         data-type="cell" 
         data-id="${rowIndex}:${colIndex}"></div>
  `
  }
}

function toColumn(col, index) {
  return `
    <div class="column" data-type="resizable" data-col="${index}">
        ${col}
        <div class="col-resize" data-resize="col"></div>
    </div>
    `
}

function createRow(number, content = '') {
  const resize = number === '' ?
      '' :
      '<div class="row-resize" data-resize="row"></div>'
  return `
    <div class="row" data-type="resizable">
        <div class="row-info">
          ${number}
          ${resize}
        </div>
        <div class="row-data">${content}</div>
    </div>
    `
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}

export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []
  const colsNames = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(toColumn)
      .join('')

  rows.push(createRow('', colsNames))
  for (let row=0; row < rowsCount; row++) {
    const cellsInRow = new Array(colsCount)
        .fill('')
        // .map((_, col) => toCell(row, col))
        .map(toCell(row))
        .join('')
    rows.push(createRow(row+1, cellsInRow))
  }
  return rows.join('')
}
