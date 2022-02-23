class Target{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.hit = false;
  }
  spawn(){
    stroke(255,0,0);
    fill(255,0,0);
    ellipse(this.x,this.y,30);
  }
}