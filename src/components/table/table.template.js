const CODES = {
  A: 65,
  Z: 90
}

function createCell() {
  return `
    <div class="cell" contenteditable="true"></div>
    `
}

function toColumnName(col) {
  return `
    <div class="column">${col}</div>
    `
}

function createRow(namber, content = '') {
  return `
    <div class="row">
        <div class="row-info">${namber}</div>
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
      .map(toColumnName)
      .join('')
  const cellsInRow = new Array(colsCount)
      .fill(createCell())
      .join('')
  rows.push(createRow('', colsNames))
  for (let i=0; i < rowsCount; i++) {
    rows.push(createRow(i+1, cellsInRow))
  }
  return rows.join('')
}
