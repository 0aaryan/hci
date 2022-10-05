
//declaring music variables
var song,fft,mic;

//Menu
var varMenu;

//utility variables
var ref,rotAngle=20,dir=-1;


//importing song
function preload(){
  song=loadSound('3.mp3');
}


//p5 setup function

function setup() {

  //setting up default modes
  createCanvas(windowWidth,windowHeight);
  angleMode(DEGREES);

  //mic = new p5.AudioIn();
  //mic.start();
  fft=new p5.FFT(); 
  fft.setInput(song);

  //initializing utility variables

  ref=min(height,width);
  varMenu=new Menu(width-0.1*ref,0.1*ref,0.05*ref);


  
}

function draw() {


  //
  background(0,50);
  noFill();




  fft.analyze();
  var bass=fft.getEnergy("bass");
  var treble = fft.getEnergy(100, 150);
  var mid = fft.getEnergy("mid");

  var rmax=map(varMenu.rSlider.value(),0,100,0,ref);
  var tanmax=2*ref;
  var speedMax=map(varMenu.speedSlider.value(),0,100,0,20);
  var offsetMax=varMenu.offsetSlider.value();
  var n=varMenu.nSlider.value();

  var r=map(bass,50,255,0,rmax);
  var rotSpeed=map(mid,100,200,0,speedMax);
  var offset=map(treble,150,255,-offsetMax,offsetMax);
  
  push();
  translate(width/2+offset,height/2+offset);

  if(rotSpeed>=0.5*speedMax){
      rotAngle+=dir*rotSpeed;
  }
  else{
    rotAngle=0;
    if(dir==1)
      dir=-1;
    else
      dir=1;
  }
  rotate(rotAngle);
  stroke(
    varMenu.redSlider.value(),
    varMenu.greenSlider.value(),
    varMenu.blueSlider.value(),

  )
  //Drawing lines
  for (let theta = 0; theta < 360; theta += 360/n) {
    let x = r * cos(theta);
    let y = r * sin(theta);
    push();
    translate(random(-5,5),random(-5,5));
    rotate(theta);
    line(r, -tanmax, r, tanmax);
    pop();
  }


  pop();
  varMenu.show();

}


//
function mouseClicked(){

}


//keybindings
function keyTyped() {
  if (key === 'm') {
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