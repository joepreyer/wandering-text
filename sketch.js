let x, y, oldPosition;
let newX, newY, newPosition;
var xoff1 = 0;
var xoff2 = 10000;
var stepSize = 5.0;
let font;
const red = [251, 38, 59];
const gold = [250, 220, 0];
const blue = [7, 77, 255];
const colors = [red, gold, blue];
var counter = 0;

function preload() {
  // Ensure the .ttf or .otf font stored in the assets directory
  // is loaded before setup() and draw() are called
  font2 = loadFont("assets/RealTextPro.otf");
  font1 = loadFont("assets/EspiSlabPro-Medium.otf");
}

var letters = "Hi, my name is Joe Preyer. I create music and software. <3 ----------------------   ";
var fontSizeMin = 10;
var angleDistortion = 0.0;

function setup() {
  frameRate(120);
  // use full screen size
  createCanvas(displayWidth, displayHeight);
  background(19, 19, 19);
  cursor(CROSS);

  x = 50000;
  y = 200000;
  oldPosition = createVector(x, y);

  textFont(font1);
  textAlign(LEFT);
  fill(red);
}

function draw() {
  newX = map(noise(xoff1), 0, 1, 0, width);
  newY = map(noise(xoff2), 0, 1, 0, height);
  newPosition = createVector(newX, newY);
  var d = dist(oldPosition.x, oldPosition.y, newPosition.x, newPosition.y);
  textSize(fontSizeMin + d / 2);
  var newLetter = letters.charAt(counter);
  stepSize = textWidth(newLetter);

  if (d > stepSize) {
    var angle = atan2(newPosition.y - y, newPosition.x - x);

    push();
    translate(x, y);
    rotate(angle + random(angleDistortion));
    text(newLetter, 0, 0);
    pop();

    if (newLetter === "_") {
      textFont(font2);
    }
    if (newLetter === ".") {
      textFont(font1);
    }

    counter++;
    if (counter >= letters.length) counter = 0;

    x = oldPosition.x + cos(angle) * stepSize;
    y = oldPosition.y + sin(angle) * stepSize;
    oldPosition.set(x, y);
  }
  xoff1 += 0.01;
  xoff2 += 0.01;
}

function keyReleased() {
  console.log(key);
  if (key == "s" || key == "S") saveCanvas("screenshot_" + Date.now(), "png");
  if (keyCode == DELETE || keyCode == BACKSPACE) background(255);
}

function keyPressed() {
  // angleDistortion ctrls arrowkeys up/down
  if (keyCode == UP_ARROW) angleDistortion += 0.1;
  if (keyCode == DOWN_ARROW) angleDistortion -= 0.1;
}
