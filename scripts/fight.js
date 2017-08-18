const fightCanvas = document.getElementById("fight");
const sfx = fightCanvas.getContext('2d');
const start = 25;
var xAxis = start;
var counter = 0;
sfx.scale(2,2);
var heroArray = [
  document.getElementById('hero1'),
  document.getElementById('hero2'),
  document.getElementById('hero3'),
  document.getElementById('hero4'),
  document.getElementById('hero5'),
  document.getElementById('hero6'),
  document.getElementById('hero7'),
];
var choice = [
  'rock',
  'paper',
  'scissors',
]
/*function roshambo(click) {
  click = document.getElementById('rock').addEventListener("click")
   let health = document.getElementById('health');
   health.value = player.health;
}*/


function sprite (input, x) {
  return sfx.drawImage(input, x, 28);
}

//function animation (x, y) {
//  for ( var i =)
//}
function drawFight() {
  sfx.fillStyle = "#000";
  sfx.fillRect(0, 0, fightCanvas.width, fightCanvas.height);
  sprite(heroArray[counter], xAxis);
  if (counter <= 6) {
    counter ++;
    xAxis +=18;
  } else {
    counter = 0;
    xAxis = start;
  }
};
