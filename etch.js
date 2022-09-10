const sketchContainer = document.querySelector('.sketchContainer')

for (let i = 0; i<=15; ++i) {
    for (let j = 0; j<=15; ++j) {
        const horizontalSquare = document.createElement('div');
        horizontalSquare.classList.add('horizontalSquare');
        sketchContainer.appendChild(horizontalSquare);
        if (j === 15) {
            lineBreak = document.createElement('hr');
            sketchContainer.appendChild(lineBreak);
        }
    }
    
}