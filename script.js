const container = document.querySelector('.container');
const colorPicker = document.querySelector('#color-picker');
const clearButton = document.querySelector('#clear-button');
const eraser = document.querySelector('#eraser-button');
const brushSizeInput = document.querySelector('#brush-size');
const saveButton = document.querySelector('#save-button');
const cells = document.querySelectorAll('.cell');


let isMouseDown = false;
let isEraserActive = false;
let brushSize = 1;

container.addEventListener('mousedown', function() {
  isMouseDown = true;
});

container.addEventListener('mouseup', function() {
  isMouseDown = false;
});
brushSizeInput.addEventListener('input', function() {
  brushSize = parseInt(this.value);
  
  const cellSize = Math.floor(500 / brushSize);
  
  for (const cell of cells) {
    cell.style.width = `${cellSize}px`;
    cell.style.height = `${cellSize}px`;
  }
});

const gridSize = 16;

for (let i = 0; i < gridSize * gridSize; i++) {
  const cell = document.createElement('div');
  cell.classList.add('cell');
  
  const row = Math.floor(i / gridSize) + 1;
  const col = (i % gridSize) + 1;
  
  cell.style.gridRow = row;
  cell.style.gridColumn = col;
  
  container.appendChild(cell);

  cell.addEventListener('mouseenter', function() {
    if (isMouseDown) {
      const cellsToColor = getCellsToColor(cell, brushSize);
      cellsToColor.forEach(function(cell) {
        cell.style.backgroundColor = isEraserActive ? 'white' : colorPicker.value;
      });
    }
  });
  
  cell.addEventListener('mousedown', function() {
    const cellsToColor = getCellsToColor(cell, brushSize);
    cellsToColor.forEach(function(cell) {
      cell.style.backgroundColor = isEraserActive ? 'white' : colorPicker.value;
    });
  });
}

colorPicker.addEventListener('input', function() {
  container.style.backgroundColor = colorPicker.value;
});

clearButton.addEventListener('click', function() {
  const cells = document.querySelectorAll('.cell');
  cells.forEach(function(cell) {
    cell.style.backgroundColor = 'white';
  });
});

eraser.addEventListener('mouseenter', function() {
  if (isMouseDown && isEraserActive) {
    cell.style.backgroundColor = 'white';
  }
});

eraser.addEventListener('mousedown', function() {
  isEraserActive = !isEraserActive;
  if (isEraserActive) {
    eraser.classList.add('btn-eraser-active');
  } else {
    eraser.classList.remove('btn-eraser-active');
  }
});


function getCellsToColor(cell) {
  const cells = [cell];
  
  if (brushSize > 1) {
    const row = parseInt(cell.style.gridRow);
    const col = parseInt(cell.style.gridColumn);
    
    for (let i = 1; i < brushSize; i++) {
      for (let j = -i; j <= i; j++) {
        const topCell = getCell(row - i, col + j);
        const rightCell = getCell(row + j, col + i);
        const bottomCell = getCell(row + i, col - j);
        const leftCell = getCell(row - j, col - i);

        if (topCell) cells.push(topCell);
        if (rightCell) cells.push(rightCell);
        if (bottomCell) cells.push(bottomCell);
        if (leftCell) cells.push(leftCell);
      }
    }
  }
  
  return cells;
}

function getCell(row, col) {
  if (row < 1 || row > 16 || col < 1 || col > 16) {
    return null;
  }
    
  const index = (row - 1) * 16 + (col - 1);
  const cell = document.querySelectorAll('.cell')[index];
    
  return cell;
}

// set up initial brush size
brushSizeInput.dispatchEvent(new Event('input'));












