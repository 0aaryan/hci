
function Menu(){

    this.x=0.65*width-10;
    this.y=0;
    this.b=width-this.x;
    this.l=height-10-this.y;
    this.isVisible=true;
    this.rSlider=createSlider(0, 100, 20,2);
    this.speedSlider=createSlider(0,100,20,2);
    this.offsetSlider=createSlider(0,100,20,2);
    this.nSlider=createSlider(0,100,25,1);
    this.redSlider=createSlider(0,255,0,1);
    this.greenSlider=createSlider(0,255,0,1);
    this.blueSlider=createSlider(0,255,0,1);



    this.show=function(){
        if(!this.isVisible){
            this.rSlider.hide();
            this.speedSlider.hide();
            this.offsetSlider.hide();
            this.redSlider.hide();
            this.greenSlider.hide();
            this.blueSlider.hide();
            this.nSlider.hide();
        }
        else{

            this.rSlider.show();
            this.speedSlider.show();
            this.offsetSlider.show();
            this.nSlider.show();
            this.redSlider.show();
            this.greenSlider.show();
            this.blueSlider.show();


            push();
            fill(0,150);
            translate(this.x,this.y);
            rect(0,0,0.5*width,height,25);
            fill(255);
            textAlign(CENTER);
            noStroke();

            //menu text
            textSize(0.065*this.x)
            text('SETTINGS',0.5*this.b,0.1*this.l);


            //slider1
            textSize(0.04*this.l)
            text('MAX RADIUS',0.5*this.b,0.2*this.l)
            this.rSlider.style('width',0.5*this.b+'px');
            this.rSlider.position(this.x+0.25*this.b,0.21*this.l);


            //slider2
            textSize(0.04*this.l)
            text('MAX SPEED',0.5*this.b,0.33*this.l);
            this.speedSlider.style('width',0.5*this.b+'px');
            this.speedSlider.position(this.x+0.25*this.b,0.35*this.l);

            //slider3
            textSize(0.04*this.l)
            text('MAX OFFSET',0.5*this.b,0.47*this.l);
            this.offsetSlider.style('width',0.5*this.b+'px');
            this.offsetSlider.position(this.x+0.25*this.b,0.49*this.l);
            

            //slider4
            textSize(0.04*this.l)
            text('LINES',0.5*this.b,0.59*this.l);
            this.nSlider.style('width',0.5*this.b+'px');
            this.nSlider.position(this.x+0.25*this.b,0.61*this.l);
            




            //colourSliders
            textSize(0.04*this.l)
            text('COLOUR',0.5*this.b,0.71*this.l);

            //red slider
            textSize(0.025*this.x)
            fill(255,0,0);
            text('RED',0.5*this.b,0.76*this.l);
            this.redSlider.style('width',0.25*this.b+'px');
            this.redSlider.position(this.x+0.37*this.b,0.77*this.l);

            fill(0,255,0);
            text('GREEN',0.5*this.b,0.84*this.l);
            this.greenSlider.style('width',0.25*this.b+'px');
            this.greenSlider.position(this.x+0.37*this.b,0.85*this.l);
            
            fill(0,0,255);
            text('BLUE',0.5*this.b,0.92*this.l);
            this.blueSlider.style('width',0.25*this.b+'px');
            this.blueSlider.position(this.x+0.37*this.b,0.93*this.l);
            
            pop();
        }
    }
}