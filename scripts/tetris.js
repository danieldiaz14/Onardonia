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
    drawMatrix(tetrisBoard, {x: 0, y:0});
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
//Creates the matrix when a piece is dropped.
function holdMatrix(w, h) {
    const matrix = [];
    while (h--) {
        matrix.push(new Array(w).fill(0));
    }
    return matrix;
}
//keeps track of time and makes sure the pieces are going if the player isn't manually moving them down
let dropCounter = 0;
let dropInterval = 1000;
let lastTime = 0;
//this updates the time of the game and changes the dropCounter depending if the player moved or not.
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
//this create the playing board or border.
const tetrisBoard = holdMatrix(12, 20);

//Keeps track of where the pieces are at.
function merge( tetrisBoard, player) {
    player.matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                tetrisBoard[y + player.pos.y][x + player.pos.x] = value;
            }
        });
    });
}
//collision for the player's pieces and the board
// For loop checks if it does not equal 0 that means a piece is there and it can't replace it
// else means it is a 0 and can be replaced.
function collision(tetrisBoard, player) {
    const [m, o] = [player.matrix, player.pos];
    for (let y = 0; y < m.length; ++y) {
        for (let x = 0; x < m[y].length; ++x) {
            if (m[y][x] !== 0 &&
               (tetrisBoard[y + o.y] &&
               tetrisBoard[y + o.y][x + o.x]) !== 0) {
                return true;
            }
        }
    }
    return false;
}
//Keeps Track of the players pieces
const player = {
    pos: {x: 5, y: 5},
    matrix: matrix,
}
//Allows the player to move along the board in the direction chosen.
function playerMove(dir) {
    player.pos.x += dir;
    if (collision(tetrisBoard, player)) {
        player.pos.x -= dir;
    }
}
// Flips where in the matrix is currently not equal to 0.
// This allows us to move the pieces clockwise and counter clockwise.
function rotate(matrix, dir) {
  for (let y = 0; y < matrix.length; ++y) {
    for (let x = 0; x < y; ++x) {
      [
        matrix[x][y],
        matrix[y][x],
      ] = [
        matrix[y][x],
        matrix[x][y],
      ];
    }
  }
  if (dir > 0) {
    matrix.forEach(row => row.reverse());
  } else {
    matrix.reverse();
  }
}
//This allows the player to move their pieces.
function playerRotate(dir) {
  rotate(player.matrix, dir);
}
// Allows the player to move the pieces down. and saves the position.
function playerDrop() {
    player.pos.y ++;
    if (collision(tetrisBoard, player)) {
        player.pos.y--;
        merge(tetrisBoard, player);
        player.pos.y = 0;
    }
    dropCounter = 0;
}
//an event listener watching for key codes
// Keycodes represent what key on the keyboard is pressed.
// Moves the pieces or rotates depending on the key pressed.
document.addEventListener('keydown', event => {
    if (event.keyCode === 37) {
        playerMove(-1);
    } else if (event.keyCode === 39) {
        playerMove(1);
    } else if (event.keyCode === 40 ) {
        playerDrop();
    } else if (event.keyCode === 81) {
      playerRotate(-1);
    } else if (event.keyCode === 69) {
      playerRotate(1);
    }
});
//updates the state of the board.
update();
