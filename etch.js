const sketchContainer = document.querySelector('.sketchContainer')

const customizeGrid = document.querySelector('.customizeGrid'); //BUTTON; Select customize grid for event listener
const resetGrid = document.querySelector('.resetGrid'); //BUTTON; reset board
let gridSizeFinalValue = 15; //Must be created before for loop creating divs to provide default grid of 16x16
let allSquares; //Allows squares to be reselected whenever new grid is made
let gridTemplateColumns = 16; //Has to be premade here to only add when button clicked, default to 16x16 grid

createSketchSquares();
colorsOnMouseover();

customizeGrid.addEventListener('click', gridSizePrompt);
resetGrid.addEventListener('click', resetAllSquares);


function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; ++i) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
  

function squareColor(mouseoverData){
    let hoverStyle = mouseoverData.target.style;
    let hoverTarget = mouseoverData.target;
    let currentBrightness = hoverTarget.getAttribute('data-brightness');
    let progressiveDarkness = currentBrightness - 10 //Take each square brightness of 100 and subtract 10 on hover

    if (progressiveDarkness === -10) {
        progressiveDarkness = 0; //THIS ensures when square is black it doesnt go past 0% brightness
    }

    hoverTarget.setAttribute('data-brightness',progressiveDarkness); //Set subtracted brightness to attribute for next hover
    

    hoverStyle.cssText = "filter: brightness(" + progressiveDarkness + "%);";
    let hoveredSquareColor = getRandomColor();
    hoverStyle.backgroundColor = hoveredSquareColor;

}


//Create the sketch squares
function createSketchSquares() {
    for (let i = 0; i<=gridSizeFinalValue; ++i) {
        for (let j = 0; j<=gridSizeFinalValue; ++j) {
            const horizontalSquare = document.createElement('div');
            horizontalSquare.classList.add('horizontalSquare');
            horizontalSquare.setAttribute('data-brightness',100);   //Add brightness attribute 100 for progressive darkness reduction 
            sketchContainer.appendChild(horizontalSquare);
            
        }
        
    }
    allSquares = document.querySelectorAll('.horizontalSquare'); //Refresh the allSquares value whenever changed
    
    
    sketchContainer.style.setProperty('grid-template-columns', "repeat(" + gridTemplateColumns + ",auto)");  
}



function resetAllSquares() {

    allSquares.forEach( (sketchBox) => {
        sketchBox.remove();
    })
    createSketchSquares();
    colorsOnMouseover();
}

//Get mouseover data and set color
function colorsOnMouseover() {
    allSquares.forEach( (individualSquare) => {
        individualSquare.addEventListener('mouseover', (mouseoverData) => {
            squareColor(mouseoverData);
            
        } )
    } )
}


//CUSTOMIZE GRID SIZE



function gridSizePrompt() {
    do {
        gridSize = prompt('Enter desired grid size (limit of 100)');
        if (!gridSize) { //If null value (user enter or esc) default to 16x16 grid
            gridSize = 16
        } else if (gridSize > 100) {
            alert('Number too big, try again');
        } else if (gridSize < 0) {
            alert('Number too small, try again');
        } else if (isNaN(gridSize)) {
            alert('Not a number, try again');
        }
    } while (gridSize > 100 || gridSize < 0 || isNaN(gridSize));

    gridSizeFinalValue = gridSize
    gridSizeFinalValue -= 1
    gridTemplateColumns = gridSize //Since subtract 1 for grid creation loop, use original gridsize value for grid columns
    resetAllSquares();
}


