var PLAY = 1
var END = 0
var gameState= PLAY
var monkey , monkey_running
var  banana, bananaImage, obstacle, obstacleImage;
var fruitGroup,obstaclesGroup
var line1, ground,gameover,restart ;
var edge,lost,jump;
var survivalTime
var score=0
function preload() {
  
  
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
bananaImage =loadImage("1200px-Banana-Single.jpg");
  obstacleImage = loadImage("obstacle.png");
  gameover= loadImage("Flat_restart_icon.svg.png")
  lost = loadSound("TunePocket-Arcade-Negative-Alerts-Mini-Pack-1-Preview.mp3")
  jump = loadSound("TunePocket-Water-Jump-Splash-24-48-Preview.mp3")

}



function setup() {
   createCanvas(600, 400) 
  monkey = createSprite(100,340,20,50)
  monkey.addAnimation("run",monkey_running)
monkey.scale=0.2
monkey.setCollider("rectangle",0,0,400,monkey.heigth)
      
  //edges = createEdgeSprites()
  ground = createSprite(400,350,600,10)
  ground.velocityX = -4;
  ground.x = ground.width /2;
  
  restart = createSprite(300,250,20,30)
  restart.addImage(gameover)
  restart.scale=0.1
  restart.visible=false
  
  obstaclesGroup = new Group;
  fruitGroup= new Group;

  score = 0
 
}


function draw() { 

  
  background("white")
     monkey.collide(ground)
  if(gameState === PLAY){
     fruit();
     block();
   
    stroke("white")
    textSize(20)
 score = score + Math.round(getFrameRate()/60);
    text("survialTime:"+score,50,30)
    
  if(keyDown("space") && monkey.y >120 ){
    monkey.velocityY = -12 
    jump.play()  
  }
     if(monkey.isTouching(fruitGroup)){
      score=score+3
     
      fruitGroup.destroyEach();
       
  }
    if(monkey.isTouching(obstaclesGroup)){
       gameState=END;
       lost.play()
    }
    
    if(ground.x < 0){
        ground.x = ground.width /2;
      
     
  
    }
    obstaclesGroup.setVelocityXEach(-2 )
    fruitGroup.setVelocityXEach(-2)
   
  }
  else if(gameState === END){
    textSize(25)
    text("gameover",150,150)
     fruitGroup.setLifetimeEach(-1)
     obstaclesGroup.setLifetimeEach(-1)
     obstaclesGroup.setVelocityXEach(0 )
    fruitGroup.setVelocityXEach(0)
   restart.visible = true
    monkey.changeImage("stop",monkey_running)
      
    if(mousePressedOver(restart)){
      reset()
    }
  }
    
 
    
    
  
    ground.x=ground.width/2
  
  monkey.velocityY  = monkey.velocityY + 0.8 
 
  
   drawSprites();
}

function fruit(){
  if(frameCount % 80 === 0){
     banana = createSprite(600,250,40,10); 
    banana.y = Math.round(random(110,140));
   banana.addImage(bananaImage);
    banana.scale = 0.05;
  
    
    banana.depth=monkey.depth
    monkey.depth=monkey.depth+1   
    
    fruitGroup.add(banana)
   
  }
    
  
     
     
}
function block(){
   if (frameCount % 300 === 0) {
    obstacle = createSprite(400,320,600,10);
    obstacle.x= Math.round(random(500,150));
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2;
    
    
    
     
obstaclesGroup.add(obstacle)
   }
   
}
function reset(){
    gameState = PLAY
  score=0 
  restart.visible=false
  obstaclesGroup.destroyEach();
  fruitGroup.destroyEach();
  
 
  
 
}