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

    const ist0 = Number(cell1.dataset.id.charAt(0))
    const jst0 = Number(cell1.dataset.id.slice(-1))
    const iend = Number(cell2.dataset.id.charAt(0))
    const jend = Number(cell2.dataset.id.slice(-1))
    for (let ist = ist0; ist <= iend; ist++) {
      for (let jst = jst0; jst <= jend; jst++) {
        const $nextEl = this.table.find(`[data-id="${ist}:${jst}"]`)
        this.group.push($nextEl)
        $nextEl.addClass('selected')
      }
    }
  }
}
