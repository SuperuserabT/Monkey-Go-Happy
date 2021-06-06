
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var ground
var bananaGroup
var obstacleGroup
var score=0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,250)
  monkey = createSprite(50, 200, 50, 50)
  monkey.addAnimation("running", monkey_running)
  monkey.scale = 0.1

  ground = createSprite(0,245,1200,10);
  ground.x = ground.width /2
  
  FoodGroup = new Group();
  obstacleGroup = new Group();
  
  score = 0;
}


function draw() {
  background("green")
  textSize(20);
  fill(255);
  text("Score: "+ score, 500,40)
  drawSprites();
  
  if (gameState===PLAY){
    if(score >= 0){
      ground.velocityX = -9;
    }else{
      ground.velocityX = -(6 + score);
    }
  
  if(keyDown("space") && monkey.y >= 200) {
      monkey.velocityY = -12;
    }
  
    monkey.velocityY = monkey.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    monkey.collide(ground);
  
  spawnBanana();
  spawnObstacles();
  
  //if(obstaclesGroup.isTouching(trex)){
        //gameState = END;
    //}
  }
  


    for (var e = 0; e < FoodGroup.length; e++){          if(FoodGroup.get(e).isTouching(monkey)){    FoodGroup.get(e).destroy(); score = score + 1 } }
  
}

function spawnBanana() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(80,120));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -6
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each cloud to the group
    FoodGroup.add(banana);
  }
}


function spawnObstacles() {
  if(frameCount % 60 === 0) {
    obstacle = createSprite(600,230,10,40);
    obstacle.addImage(obstacleImage)
    
        
    obstacle.velocityX = ground.velocityX
    ground.depth = obstacle.depth + 1
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstacleGroup.add(obstacle);
  }
}



