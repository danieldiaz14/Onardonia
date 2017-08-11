# Onardonia

## User Stories
  * Introduction
    * Hello thank you for checking out this game of mine.
    * The goal is to create decision based puzzle fighting game.
      This will be written with html, css, and javascript.
      Libraries included are electron.
  * Creating the Canvas
    * To have a place to put the pieces down a canvas was necessary.
  * Creating the Pieces
    * Pieces were created by making a multi-dimensional array or matrix.
    * This is so that when the pieces are rotated they rotate in a fixed area.
    * If the value is a 0 it means there isn't a piece there in the matrix.
    * If the value is anything other than that a block is there.
    * To differentiate between the pieces the values are made in descending order
    * A different color is matched to each value so the pieces are different colors.
  * Creating the Board
    * The board was creating by making a set matrix that doesn't change.
  * Creating the Hit Collision
    * The hit collision works by checking if the value isn't a 0.
    * Then it compares if it needs to be moved by an offset to avoid hitting the walls.
  * Adding Controls to the Game.
    * I created an event listener that watched for certain keyCodes.
    * These keycodes relate to certain key presses on the keyboard
    * Depending on which key is pressed it will move in that direction by adding or subtracting from the position it is currently in.
  * Creating the Health Bar
  * Creating the Fighters
