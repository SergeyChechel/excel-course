export class TableSelection {
  static className = 'selected'

  constructor($table) {
    this.group = []
    this.table = $table.$root
  }
  // $el instanceof Dom === true
  select($el) {
    this.clear()
    this.group.push($el)
    $el.addClass('selected')
  }

  clear() {
    this.group.forEach($el => $el.removeClass(TableSelection.className))
    this.group = []
  }

  selectGroup($el) {
    const cell1 = this.group[0] !== null ?
        this.group[0].$el : $el.find('selected').$el
    const cell2 = $el.$el
    // console.log(cell1.dataset.id)
    // console.log(cell2.dataset.id)
    console.log(this.table)

    let ist = Number(cell1.dataset.id.charAt(0))
    let jst = Number(cell1.dataset.id.slice(-1))
    const iend = Number(cell2.dataset.id.charAt(0))
    const jend = Number(cell2.dataset.id.slice(-1))
    for (ist; ist <= iend; ist++) {
      for (jst; jst <= jend; jst++) {
        const $nextEl = this.table.find(`[data-id="${ist}:${jst}"]`)
            .addClass('selected')
        this.group.push($nextEl)
      }
    }
  }
}
