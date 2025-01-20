const rowHandler = document.getElementById('row-handler')
const userInput = document.getElementById('userInput')
const submitButton = document.querySelector('.user-input-button')

submitButton.addEventListener('click', addNewTask)

let rowCount = 0;

function addNewTask(event) {
    event.preventDefault()
    const text = userInput.value.trim()
    if (text) {
        const newRow = createNewRow(text)
        rowHandler.appendChild(newRow)
        userInput.value = ''
        addDragListeners(newRow.querySelector('.item'));
        addPlaceholdersListeners(newRow.querySelectorAll('.placeholder'))
        updateItemClasses()
    }
}

function createNewRow(text) {
    rowCount++
    const row = document.createElement('div')
    row.id = 'row'
    row.className = 'row';
    row.innerHTML = `
        <div class="placeholder">
            <div class="item" draggable="true" data-row="${rowCount}">${text}</div>
        </div>
        <div class="placeholder"></div>
        <div class="placeholder"></div>
    `;
    return row
}

function updateItemClasses() {
    const rows = document.querySelectorAll('#row-handler .row')
    rows.forEach((row, rowIndex) => {
        const placeholders = row.querySelectorAll('.placeholder')
        placeholders.forEach((placeholder, columnIndex) => {
            const item = placeholder.querySelector('.item')
            if (item) {
                item.className = `item row-${rowIndex + 1} column-${columnIndex + 1}`
                item.dataset.row = rowIndex + 1
                item.dataset.column = columnIndex + 1
            }
        });
    });
}

function addDragListeners(item) {
    item.addEventListener('dragstart', dragstart)
    item.addEventListener('dragend', dragend)
}

function addPlaceholdersListeners(placeholders) {
    placeholders.forEach(placeholder => {
        placeholder.addEventListener('dragover', dragover)
        placeholder.addEventListener('dragenter', dragenter)
        placeholder.addEventListener('dragleave', dragleave)
        placeholder.addEventListener('drop', drop)
    });
}


document.querySelectorAll('.item').forEach(addDragListeners)
addPlaceholdersListeners(document.querySelectorAll('.placeholder'))

function dragstart(event) {
    if (event.target && event.target.classList) {
        event.target.classList.add('hold')
        setTimeout(() => event.target.classList.add('hide'), 0)
    }
}

function dragend(event) {
    if (event.target && event.target.classList) {
        event.target.classList.remove('hold', 'hide')
    }
}

function dragover(event) {
    event.preventDefault()
}

function dragenter(event) {
    event.target.classList.add('hovered')
}

function dragleave(event) {
    event.target.classList.remove('hovered')
}

function drop(event) {
    event.preventDefault();
    event.target.classList.remove('hovered')
    if (event.target.classList.contains('placeholder')) {
        const heldItem = document.querySelector('.hold')
        if (heldItem) {
            event.target.append(heldItem)
            updateItemClasses();
        }
    }
}

const clearButton = document.querySelector('.clear-button')

clearButton.addEventListener('click', clearAllTasks)
function clearAllTasks(event) {
    event.preventDefault()
    const rowHandler = document.getElementById('row-handler')
    

    while (rowHandler.firstChild) {
        rowHandler.removeChild(rowHandler.firstChild)
    }

    rowCount = 0
    document.getElementById('userInput').value = ''
    console.log('Все задачи удалены')
}