const canvas = document.getElementById('tetris'); //Gets the canvas from html document.
const context = canvas.getContext('2d'); //Will be rendered in 2d

context.scale(20,20); //increases the size of the pieces by 20 x 20

//const matrix will be the the tetris pieces.
//the way the pieces are being made is through a matrix
// it is 3 by 3 because when we rotate the shapes it will make it easier to display the changes instead of 2 by 2.
const matrix = [
  [0, 0 ,0],
  [1, 1, 1],
  [0, 1, 0],
];

function draw() {
    context.fillStyle = '#000'; //fills canvas with this color
    context.fillRect(0,0, canvas.width, canvas.height); // shape of the canvas. Width and Height.
    drawMatrix(player.matrix, player.pos);
}
//this loop goes through the matrix and checks whether it is a 0 or not.
// if it is not a 0 it will be displayed.
// what the offset does is allow us to move the piece-
function drawMatrix(matrix, offset) {
    matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                context.fillStyle = 'red';
                context.fillRect(x + offset.x,
                                 y + offset.y,
                                 1, 1,);
            }
        });
    });
}

let dropCounter = 0;
let dropInterval = 1000;
let lastTime = 0;
function update(time = 0) {
    const gameTime = time - lastTime;
    lastTime = time;
    
    dropCounter += gameTime;
    if (dropCounter > dropInterval) {
        player.pos.y ++;
        dropCounter = 0;
    }
    draw();
    requestAnimationFrame(update);
}

const player = {
    pos: {x: 5, y: 5},
    matrix: matrix,
}
update();