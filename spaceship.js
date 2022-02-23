class SpaceShip{

  show(ang){
    push()
    // translating the axis to axis of ship
    translate(width/2+200*cos(ang), height/2+200*sin(ang));
    rotate(ang+90); // rotate the ship
    imageMode(CENTER);
    // set the axis to default back
    translate(-width/2-200*cos(ang), -height/2-200*sin(ang));
    image(space_ship,width/2+200*cos(ang),height/2+200*sin(ang), space_ship.width*0.15, space_ship.height*0.15);
    pop();
  }
}

class Bullet{
  constructor(theta){
    this.r = 200;
    this.angle = theta;
  }
  update(){
    this.r -= 5;
    imageMode(CENTER);
image(fire_ball, width/2+this.r*cos(this.angle), height/2+this.r*sin(this.angle), fire_ball.width*0.05, fire_ball.height*0.05);
  }
}