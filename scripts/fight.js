const fightCanvas = document.getElementById("fight");
const sfx = fightCanvas.getContext('2d');
const start = 25;
var xAxis = start;
var counter = 0;
sfx.scale(2,2);
let health = document.getElementById("health");
health.value = player.health;
let enemyHealth = document.getElementById('enemy');
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
  document.getElementById('rock'),
  document.getElementById('paper'),
  document.getElementById('scissors'),
]

choice[0].addEventListener('click', event=> {
  enemyHealth.value -=5;
});
choice[1].addEventListener('click', event=> {
  enemyHealth.value -= 5;
});
choice[2].addEventListener('click', event=> {
  enemyHealth.value -= 5;
});
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
};
