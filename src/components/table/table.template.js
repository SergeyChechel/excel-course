const CODES = {
  A: 65,
  Z: 90
}

const DEFAULT_WIDTH = 120
const DEFAULT_HEIGTH = 24

function getWidth(state, index) {
  return (state[index] || DEFAULT_WIDTH) + 'px'
}

function getHeight(state, index) {
  return (state[index] || DEFAULT_HEIGTH) + 'px'
}

function toCell(state, rowIndex) {
  return function(_, colIndex) {
    const width = getWidth(state, colIndex)
    return `
    <div class="cell" 
         contenteditable="true"
         data-col="${colIndex}"
         data-type="cell" 
         data-id="${rowIndex}:${colIndex}"
         style="width: ${width}"
         ></div>
  `
  }
}

function toColumn({col, index, width}) {
  return `
    <div class="column" 
        data-type="resizable" 
        data-col="${index}" 
        style="width:${width}">
        ${col}
        <div class="col-resize" data-resize="col"></div>
    </div>
    `
}

function createRow(number, content = '', state) {
  const resize = number === '' ?
      '' :
      '<div class="row-resize" data-resize="row"></div>'
  const height = getHeight(state, number)
  return `
    <div class="row" 
          data-type="resizable" 
          data-row="${number}"
          style="height: ${height}">
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

function withWidthFrom(state) {
  return function(col, index) {
    return {
      col, index, width: getWidth(state.colState, index)
    }
  }
}

export function createTable(rowsCount = 15, state = {}) {
  console.log(state)
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []
  const colsNames = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(withWidthFrom(state))
      .map(toColumn)
      .join('')

  rows.push(createRow('', colsNames, {}))

  for (let row=0; row < rowsCount; row++) {
    const cellsInRow = new Array(colsCount)
        .fill('')
        .map(toCell(state.colState, row))
        .join('')
    rows.push(createRow(row+1, cellsInRow, state.rowState))
  }
  return rows.join('')
}
