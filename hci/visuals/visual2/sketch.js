
//declaring music variables
var song,fft,mic;

//Menu
var varMenu;

var rombus=[],particles=[];

//utility variables
var ref,rotAngle=20,dir=-1,nr=6,np=1000,l;


//importing song
function preload(){
  song=loadSound('3.mp3');
}


//p5 setup function

function setup() {

  //setting up default modes
  createCanvas(windowWidth,windowHeight);
  angleMode(DEGREES);

  mic = new p5.AudioIn();
  mic.start();
  fft=new p5.FFT(); 
  fft.setInput(song);

  //initializing utility variables

  ref=min(height,width);
  varMenu=new Menu(width-0.1*ref,0.1*ref,0.05*ref);
  c=color(
  varMenu.redSlider.value(),
  varMenu.greenSlider.value(),
  varMenu.blueSlider.value(),
  )
  for(var i=0;i<nr;i++){
  if(i<3)
  rombus.push(new Rombus(width/2,height-0.3*ref,0.5*ref+10*i,45,c,true,5));
  else if(i<6)
  rombus.push(new Rombus(width/2,height-0.1*ref,0.5*ref+10*i,45,c,true,5));
  }

  for(var i=0;i<np;i++){
    particles.push(new Particle(random(width),random(height),random(2,5),45,c));  
  }

  



}

function draw() {


  //
  background(0,20);
  noFill();

  ref=min(height,width);

  fft.analyze();
  var bass=fft.getEnergy("bass");
  var treble = fft.getEnergy(100, 150);
  var mid = fft.getEnergy("mid");
  
  l=map(bass,155,255,0.1*ref,0.3*ref);
  poffset=map(l,0.1*ref,0.3*ref,-0.3*ref,0.3*ref);
  console.log(bass+' '+l);

  push(); 
  c=color(
    varMenu.redSlider.value(),
    varMenu.greenSlider.value(),
    varMenu.blueSlider.value(),
  )
  poffset=0.2;
  for(var i=0;i<np;i++){

    x=particles[i].x;
    y=particles[i].y;
    particles[i].colour=c;

    xvect=particles[i].x-rombus[0].x;
    yvect=particles[i].y-rombus[0].y;
    v=createVector(particles[i].x-rombus[0].x,particles[i].y-rombus[0].y);
    v.setMag(1);
    particles[i].x+=0.7*v.x*l;
    particles[i].y+=0.7*v.y*l;
    particles[i].show();

    particles[i].x=x;
    particles[i].y=y;

  }


  for(var i=nr-1;i>0;i--){
    if(i>3)
    rombus[i].l=1.65*l+(i%3)*20;

    else if(i>0)
    rombus[i].l=l+i*20;

    rombus[i].colour=c;
    rombus[i].show();
  }

  pop();
  varMenu.show();

}


//
function mouseClicked(){

}


//keybindings
function keyTyped() {
  if (key == 'm') {
    if(varMenu.isVisible){
      varMenu.isVisible=false;
    }
    else{
      varMenu.isVisible=true;
    }
  }
  if(key=='p'){
    if(song.isPlaying()){
        song.pause();
        noLoop();
    }
    else{
      song.play();
      loop();
    }
  }

}


function Rombus(x,y,l,angle,colour,f,s){
  this.x=x;
  this.y=y;
  this.l=l;
  this.angle=angle;
  this.colour=colour;
  this.f=f;
  this.s=s;

  this.show=function(){


    push();
    translate(this.x,this.y);
    fill(0);
    stroke(this.colour);
    strokeWeight(this.s);
    rectMode(CENTER);
    rotate(this.angle);
    rect(0,0,this.l,this.l);
    pop();
  }
  
}


function Particle(x,y,l,angle,colour){
  this.x=x;
  this.y=y;
  this.l=l;
  this.angle=angle;
  this.colour=colour;

  this.show=function(){
    push();
    noStroke();
    translate(this.x,this.y);
    fill(this.colour);
    rectMode(CENTER);
    rotate(this.angle);
    rect(0,0,this.l,this.l);
    pop();
  }
  
}

