const canvas = document.getElementById('tetris'); //Gets the canvas from html document.
const context = canvas.getContext('2d'); // Selects which context api to use

context.scale(20,20); //increases the size of the pieces by 20 x 20

//colors of pieces
const colors = [
    null,
    '#9C03FF',
    '#ECFF03',
    '#FF9003',
    '#010DFE',
    '#03FFF4',
    '#FFE138',
    '#FF0303',
];

function draw() {
    context.fillStyle = '#000'; //fills canvas with this color
    context.fillRect(0,0, canvas.width, canvas.height); // shape of the canvas. Width and Height.
    drawMatrix(tetrisBoard, {x: 0, y:0});
    drawMatrix(player.matrix, player.pos);
}
//this loop goes through the matrix and checks whether it is a 0 or not.
// if it is not a 0 it will be displayed.
// what the offset does is allow us to move the piece
function drawMatrix(matrix, offset) {
    matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                context.fillStyle = colors[value];
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

//Keeps track of your score and row count
// Clears or sweeps the board when a line is made.
function tetrisSweep() {
  let rowCount = 1;
  outer: for (let y = tetrisBoard.length - 1; y > 0; --y) {
    for (let x = 0; x < tetrisBoard[y].length; ++x) {
      if (tetrisBoard[y][x] === 0) {
        continue outer;
      }
    }
    const row = tetrisBoard.splice(y, 1)[0].fill(0);
    tetrisBoard.unshift(row);
    ++y;

    player.score += rowCount * 10;
    damage += 2;
    health.value += 10;
    rowCount *= 2;
  }
}
//Creates the shape based on the structure of the Matrix
function createPiece(type) {
  if (type === 'T') {
    return [
      [0, 0, 0],
      [1, 1, 1],
      [0, 1, 0],
    ];
  } else if (type === 'O') {
    return [
      [2, 2],
      [2, 2],
    ];
  } else if (type === "L") {
    return [
      [0, 3, 0],
      [0, 3, 0],
      [0, 3, 3],
    ];
  } else if (type === "J") {
    return [
      [0, 4, 0],
      [0, 4, 0],
      [4, 4, 0],
    ];
  } else if (type === "I") {
    return [
      [0, 5, 0, 0],
      [0, 5, 0, 0],
      [0, 5, 0, 0],
      [0, 5, 0, 0],
    ];
  } else if (type === "S") {
    return [
      [0, 6, 6],
      [6, 6, 0],
      [0, 0, 0],
    ];
  } else if (type === "Z") {
    return [
      [7, 7, 0],
      [0, 7, 7],
      [0, 0, 0],
    ];
  }
}
//drop Counter is keeping track of how much time has gone bye
// once a threshold has been reached aka dropInterval. then call the playerDrop function which moves the piece down
// lastTime is keeping track of the difference in time from when the application first started and where it is now.
let dropCounter = 0;
const dropInterval = 1000;
let lastTime = 0;

//this updates the time of the game and changes the dropCounter depending if the player moved or not.
//dropCounter keeps track of the time alapsed once it is greather than dropInterval dropCounter
function update(time = 0) {
    const gameTime = time - lastTime;
    lastTime = time;

    dropCounter += gameTime;

    if (dropCounter > dropInterval) {
      playerDrop();
    }
    lastTime = time;
    draw();
    requestAnimationFrame(update);
}
//this create the playing board or border.
const tetrisBoard = holdMatrix(10, 20);

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
    const m = player.matrix;
    const o = player.pos;
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
    pos: {x: 0, y: 0},
    matrix: null,
    score: 0,
    health: 100,
    choice: null,
};
//Allows the player to move along the board in the direction chosen.
function playerMove(dir) {
    player.pos.x += dir;
    if (collision(tetrisBoard, player)) {
        player.pos.x -= dir;
    }
}
// Function takes a string of all possible pieces
// creates the matrix by checking the pieces of the function and multiplies the length by a random amount so there is a chance of it occuring.
// it then resets the position of the player for the next piece.
function playerReset() {
  const pieces = 'ILJOTSZ';
  player.matrix = createPiece(pieces[pieces.length * Math.random() | 0]);
  player.pos.y = 0;
  player.pos.x = (tetrisBoard[0].length / 2 | 0) -
                  (player.matrix[0].length / 2 | 0);
  if (collision(tetrisBoard, player)) {
    tetrisBoard.forEach(row => row.fill(0));
    player.score = 0;
    health.value = 100;
    enemyHealth.value = 500;
    damage = 0;
    updateScore();
    alert('You lose! Remember the board!');
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
// It is checking if collision happens before it rotates it.
function playerRotate(dir) {
  const pos = player.pos.x;
  let offset = 1;
  rotate(player.matrix, dir);
  while (collision(tetrisBoard, player)) {
    player.pos.x += offset;
    offset = -(offset + (offset > 0 ? 1 : -1));// more than 0 otherwise 1 or -1
    if (offset > player.matrix[0].length) {
      rotate(player.matrix, -dir);
      player.pos.x = pos;
      return;
    }
  }
}
// Allows the player to move the pieces down. and saves the position.
// Calls the player reset function to setup for the next piece.
function playerDrop() {
    player.pos.y ++;
    if (collision(tetrisBoard, player)) {
        player.pos.y--;
        merge(tetrisBoard, player);
        playerReset();
        tetrisSweep();
        updateScore();

    }
    dropCounter = 0;
}
// Gets the id in the html and gets the text which is displayed as player.score
// Score is something we set when we created the player object.
function updateScore() {
document.getElementById('score').innerText = player.score;
}
//an event listener watching for key codes
// Keycodes represent what key on the keyboard is pressed.
// Moves the pieces or rotates depending on the key pressed.
document.addEventListener('keydown', event => {
    if (event.keyCode === 37) {
        playerMove(-1);
    } else if (event.keyCode === 39) {
        playerMove(1);
    } else if (event.keyCode === 40) {
        playerDrop();
    } else if (event.keyCode === 81) {
      playerRotate(-1);
    } else if (event.keyCode === 69) {
      playerRotate(1);
    }
});
//updates the state of the board.
playerReset();
updateScore();
update();
