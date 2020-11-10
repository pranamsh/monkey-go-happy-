var monkey, monkeyAnimation, bg, bgImage;
var invisibleGround;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var banana, bananaImage, obstacle, obstacleImage, bananaGroup, obstacleGroup;
var score = 0;
var survivalTime = 0;

function preload() {
  monkeyAnimation = loadAnimation("Monkey_01.png", "Monkey_02.png",   "Monkey_03.png", "Monkey_04.png", "Monkey_05.png",         "Monkey_06.png",   "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png")
  
 bananaImage = loadImage("banana.png");
 obstacleImage = loadImage("stone.png");
 bgImage = loadImage("jungle.jpg")
  
}



function setup() {
  createCanvas(600,600);
  
  
  
  invisibleGround = createSprite(300, 540, 600, 10);
  invisibleGround.visible = false;

  
  bg = createSprite(0, 0, 1, 1);
  bg.addImage(bgImage);
  bg.scale = 2;
  
  
  monkey = createSprite(100, 530, 20, 20);
  monkey.addAnimation("monk", monkeyAnimation);
  monkey.scale = 0.1
  
  bananaGroup = new Group();
  obstacleGroup = new Group();
  
}

function draw() {
  background(220);
  monkey.collide(invisibleGround);
   bg.velocityX = -3 
    
    if (bg.x < 0) {
      bg.x = bg.width/2;
    }
  
    spawnObstacles();
    spawnBananas();   
  
    if (keyDown("space") && monkey.y > 480) {
      monkey.velocityY = -15;
    }
    
    if (monkey.isTouching(bananaGroup)){
      monkey.scale += 0.05;   
      obstacleGroup.scale += 0.005;
      bananaGroup.destroyEach();
      score += 5;
    }
    
   if (monkey.isTouching(obstacleGroup)){
    monkey.scale=0.05
  }
    

  
   monkey.velocityY = monkey.velocityY + 0.5;
  
  
  drawSprites();
  stroke("black")
  fill("black")
  text("SCORE: " + score, 10, 50);

}


function spawnBananas() {
  if (frameCount % 120 == 0) {
    banana = createSprite(610, Math.round(random(320, 400), 20, 20))
    banana.velocityX = -6;
    banana.addImage(bananaImage);
    banana.scale = 0.05
    bananaGroup.add(banana)
  }
}

function spawnObstacles() {
  if (frameCount % 100 == 0) {
    obstacle = createSprite(610, 500, 20, 20)
    obstacle.velocityX = -6;
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2;
    obstacle.setCollider("rectangle", 0, 0, obstacle.height - 30, obstacle.width - 30)
    obstacleGroup.add(obstacle);
  }
}