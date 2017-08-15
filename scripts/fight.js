const canvas = document.getElementById('fight');
const sfx = canvas.getContext('2d');

sfx.scale(20,20);

function draw() {
  context.fillStyle = '#000';
  context.fillRect(0,0, canvas.width, canvas.height);
}
