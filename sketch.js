let t = [];
let targets = 2;
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
let dir = 1;
let ship_velocity = 1; 

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
  for (let i = 0; i<targets; i++){
  	t[i] = new Target();
	theta = random(0,360);
	t[i].x = width/2+100*cos(theta);
	t[i].y = height/2+100*sin(theta);
	t[i].spawn()
	t[i].hit = false;
}
  ship = new SpaceShip();
}

function draw() {
//   background(255);
  
  // rendering planet
  imageMode(CENTER);
  image(img, width/2,height/2);
  
  // spawning the target
  for(let i = 0; i<targets; i++){
  	if (t[i].hit){
		theta = random(0,360);
		t[i].x = width/2+100*cos(theta);
		t[i].y = height/2+100*sin(theta);
		t[i].spawn()
		t[i].hit = false;
	}
	else{
		t[i].spawn();
	}
}
  
  image(planet,width/2,height/2,planet.width*0.6, planet.height*0.6);
  // rendering text (Score)
  strokeWeight(0);
  fill(0);
  textSize(20);
  text("Score : "+str(score), 30,30);
  
  // getting mouse Interaction
//   s_theta = atan2(mouseY - height / 2, mouseX - width / 2);
	s_theta += dir*ship_velocity;
	s_theta = s_theta%360;
  
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

	for (let j = 0; j<targets; j++){
		if (sqrt(sq(t[j].x-bx)+sq(t[j].y-by)) <= 20) {
		t[j].hit = true;
		score += 1;
		}
	}
    
    if (bullet[i].r <= 100) bullet.splice(0,1);
  }

}

function mousePressed() {
    bullet.push(new Bullet(s_theta));
    fire_sound.play();
}

function keyPressed(){
	if (keyCode === LEFT_ARROW) dir = -1;
	else if (keyCode === RIGHT_ARROW) dir = 1;
	else if (keyCode === 32){
		bullet.push(new Bullet(s_theta));
    	fire_sound.play();
	}
}

