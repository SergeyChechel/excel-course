import {storage} from '@core/utils';

// excel:123165413216
// excel:624316411132
function getAllKeys() {
  const keys = []
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (!key.includes('excel')) {
      continue
    }
    keys.push(key)
  }
  return keys
}

export function createRecordsTable() {
  const keys = getAllKeys()
  if (!keys.length) {
    return `<p>Вы пока не создали ни одной таблицы</p>`
  }
  return `
      <div class="db__list-header">
        <span>Название</span>
        <span>Дата открытия</span>
      </div>
      <ul class="db__list">
        ${keys.map(toHTML).join('')}
      </ul>
    `
}

function toHTML(key) {
  const model = storage(key)
  const id = key.split(':')[1]
  return `
        <a href="#excel/${id}">
          <li class="db__record">
            ${model.title}
            <strong>
                ${new Date(model.openedDate).toLocaleDateString()}
                ${new Date(model.openedDate).toLocaleTimeString()}
            </strong>
            <!--<strong>${timestampToDate(id)}</strong>-->
          </li>
        </a>
    `
}

function timestampToDate(id) {
  const d = new Date();
  d.setTime(id);
  return ('0' + d.getDate()).slice(-2) +
      '.' + ('0' + (d.getMonth() + 1)).slice(-2) +
      '.' + d.getFullYear()
}
