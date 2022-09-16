const sketchContainer = document.querySelector('.sketchContainer')



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
for (let i = 0; i<=15; ++i) {
    for (let j = 0; j<=15; ++j) {
        const horizontalSquare = document.createElement('div');
        horizontalSquare.classList.add('horizontalSquare');
        horizontalSquare.setAttribute('data-brightness',100);   //Add brightness attribute 100 for progressive darkness reduction 
        sketchContainer.appendChild(horizontalSquare);
    }
    
}

//Selects all squares, MUST be after squares created
const allSquares = document.querySelectorAll('.horizontalSquare');


//Get mouseover data and set color
allSquares.forEach( (individualSquare) => {
    individualSquare.addEventListener('mouseover', (mouseoverData) => {
        squareColor(mouseoverData);
    } )
} )

//CUSTOMIZE GRID SIZE
const customizeGrid = document.querySelector('.customizeGrid');
let gridSizeFinalValue;

function gridSizePrompt() {
    do {
        gridSize = prompt('Enter desired grid size (limit of 100)');
        if (!gridSize) {
            gridSize = 16
        } else if (gridSize > 100) {
            alert('Number too big, try again')
        } else if (gridSize < 0) {
            alert('Number too small, try again')
        } else if (isNaN(gridSize)) {
            alert('Not a number, try again')
        }
    } while (gridSize > 100 || gridSize < 0 || isNaN(gridSize));
    console.log(gridSize);
}


customizeGrid.addEventListener('click', gridSizePrompt);