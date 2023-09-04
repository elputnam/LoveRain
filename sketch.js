//Failure to Load: Singing in the Rain

//photos
let base;
let umbrella1;
let umbrella2;
let grid = [];
let sil = [];
let shadows = [];
let inc = 1

let alp1 = 0;
let colour = 180;

// grid configuration
let cols = 3;
let rows = 3;
let w, h;


function preload(){
  base = loadImage("assets/LoveRain_base.png");
  umbrella1 = loadImage("assets/LoveRain_umbrella1.png");
  umbrella2 = loadImage("assets/LoveRain_umbrella2.png");
  for (let i = 0; i < 9; i++){
    sil[i] = loadImage("assets/LoveRain_sil" + i + ".png");
  }
  for (let j = 0; j < 9; j++){
    grid[j] = loadImage("assets/LoveRain_grid" + j + ".png");
  }
}


function setup() {
  createCanvas(base.width, base.height);
  colorMode(HSB, 360, 100, 100, 100);
  background(0);
  frameRate(6);

  //Array of Shadows
  for (let k = 0; k < sil.length; k++){
    let images = new Shadow(random(width*.6), -50, random(80, 100), random(10,20), random(255), 10, sil[k]);
    shadows.push(images);
  }

  //prep for grid
  w = width / cols;
  h = height / rows;

}

function draw() {
  background(colour, 100, 100);

  //base
  push();
  tint(255, random(50,100));
  image(base, 0, 0);
  pop();

  //grid 1
  for (let i = 0; i < cols; i++){
    for (let j = 0; j < rows; j++) {
      let x = i * w;
      let y = j * h;
      let num = int(random(9))
      push();
      //tint(255, random(50));
      image(grid[num], x + random(50), y + random(50));
      pop();
    }
    

  }
  //blends
  blend(umbrella1, 0, 0, umbrella1.width, umbrella1.height, 0, 0, width, height, EXCLUSION);
  blend(umbrella2, 0, 0, umbrella2.width, umbrella2.height, 0, 0, width, height, EXCLUSION);

  //shadows
  for (let j = 0; j < shadows.length; j++){
    shadows[j].edges();
    shadows[j].move();
    shadows[j].show();
  }

  //box
  fill(colour, random(100), random(100), alp1);
  noStroke();
  rect(0, 0, width, height);

   //grid 2
   for (let i = 0; i < cols; i++){
    for (let j = 0; j < rows; j++) {
      let x = i * w;
      let y = j * h;
      let num = int(random(9))
      push();
      //scale(random(0.5,1));
      tint(colour+180, random(100), random(100), alp1);
      image(grid[num], random(width-grid[num].width), random(height-grid[num].height));
      pop();
    }
  }

  if (frameCount%int(random(5,20))==0){
    if (alp1 == 0){
      alp1 = 100;
    } else {
      alp1 = 0;
    }
  }

  if (frameCount%3==0){
    colour = random(180);
  }
}
class Shadow{
  constructor(x, y, xInc, yInc, tint1, inc, silImg){
    this.x = x;
    this.y = y;
    this.xInc = xInc;
    this.yInc = yInc;
    this.inc = inc;
    this.tint = tint1;
    this.sil = silImg;
  }
  edges(){
    if (this.x <= 0 || this.x >= width - this.sil.width){
      this.xInc *= -1;
      // if (this.tint == 255){
      //   this.tint = 0;
      // } else {
      //   this.tint = 255;
      // }
    }
    if (this.y <= 0 || this.y >= height - this.sil.height){
      this.yInc *= -1;
      // if (this.tint == 255){
      //   this.tint = 0;
      // } else {
      //   this.tint = 255;
      // }
    }

    if (this.tint <= 0 || this.tint >= 100){
      this.inc *= -1;
    }
  }
  move(){
    // this.x += this.xInc;
    this.y += this.yInc;
    this.tint -= this.inc;
    if (frameCount%int(random(10))==0){
      this.x = random(-200, width*.9);
    }
  }
  show(){
    push();
    tint(255, random(50,100));
    image(this.sil, this.x + random(-20,20), this.y + random(-20,20));
    blend(this.sil, 0, 0, this.sil.width, this.sil.height, this.x, this.y, this.sil.width, this.sil.height, EXCLUSION);
    pop();
    
  }
}