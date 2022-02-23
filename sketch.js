let t;
let ship;
let bullet = [];
let hit = true;
let theta;
let s_theta = -90;
let bullet_fired = false;
let score = 0;
let img;
let space_ship;
let fire_sound; 
let fire_ball;
let planet;
let target;

function preload() {
  img = loadImage('assests/background1.jpg');
  space_ship = loadImage('assests/space ship.png');
  fire_sound = loadSound('assests/fire_sound.wav');
  fire_ball = loadImage('assests/fire_ball.jpg');
  planet = loadImage('assests/planet.png');
  target = loadImage('assests/target.png')
}
function setup() {
  angleMode(DEGREES);
  createCanvas(550, 550);
  t = new Target();
  ship = new SpaceShip();
}

function draw() {
  background(255);
  
  // rendering planet
  imageMode(CENTER);
  image(img, width/2,height/2);
  
  // spawning the target
  if (hit){
    theta = random(0,360);
    t.x = width/2+100*cos(theta);
    t.y = height/2+100*sin(theta);
    t.spawn()
    hit = false;
  }
  else{
    t.spawn();
  }
  
  image(planet,width/2,height/2,planet.width*0.6, planet.height*0.6);
  // rendering text (Score)
  strokeWeight(0);
  fill(0);
  textSize(20);
  text("Score : "+str(score), 30,30);
  
  // getting mouse Interaction
  s_theta = atan2(mouseY - height / 2, mouseX - width / 2);
  
  //spaceship ring
  noFill();
  stroke(150,150,150,50);
  strokeWeight(5);
  ellipse(height/2,width/2,400);
  // rending the spaceship
  ship.show(s_theta);
  
  for(let i = 0; i<bullet.length; i++){
    bullet[i].update();
    // code to detect hit
    let bx = width/2+bullet[i].r*cos(bullet[i].angle);
    let by = height/2+bullet[i].r*sin(bullet[i].angle);
    
    if (sqrt(sq(t.x-bx)+sq(t.y-by)) <= 20) {
      hit = true;
      score += 1;
    }
    
    if (bullet[i].r <= 0) bullet.splice(0,1);
  }
}

function mousePressed() {
    bullet.push(new Bullet(s_theta));
    fire_sound.play();
}

