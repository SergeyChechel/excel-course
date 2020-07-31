const CODES = {
  A: 65,
  Z: 90
}

function createCell(_, colIndex) {
  return `
    <div class="cell" contenteditable="true" data-col="${colIndex}"></div>
  `
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
  const cellsInRow = new Array(colsCount)
      .fill('')
      .map(createCell)
      .join('')
  rows.push(createRow('', colsNames))
  for (let i=0; i < rowsCount; i++) {
    rows.push(createRow(i+1, cellsInRow))
  }
  return rows.join('')
}
