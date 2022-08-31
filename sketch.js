var gameState = 1;
var play = 1;
var end = 0;
var score;
var knife;

var knifeImage;
var orangeImage;
var appleImage;
var pearImage;
var bananaImage;
var gameOverImage;

var knifeSound;
var gameOverSound;

var fruitGroup;
var fruit;
var r;

var monsterGroup;
var monster;
var monsterAnimation;



function preload()
{
  knifeImage = loadImage("knife.png");
  orangeImage = loadImage("fruit1.png");
  appleImage = loadImage("fruit2.png");
  pearImage = loadImage("fruit3.png");
  bananaImage = loadImage("fruit4.png");
  gameOverImage = loadImage("fimdejogo.png");

  monsterAnimation = loadAnimation("alien1.png", "alien2.png");
  
  knifeSound = loadSound("knifeSwoosh.mp3");
  gameOverSound = loadSound("gameover.mp3");
} 




function setup() 
{
  createCanvas(600,600);
 
  knife = createSprite(40,200);
  knife.addImage(knifeImage);
  knife.scale = 0.7;
  knife.setCollider("rectangle", 0, 0, 40, 40);

  score = 0;

  monsterGroup = createGroup();
  fruitGroup = createGroup();
  gameState = play;
}



function draw () 
{
  background("lightblue");

  
  if(gameState === play)
  {
    knife.x = World.mouseX;
    knife.y = World.mouseY;

    monsters();
    fruits();


    if(fruitGroup.isTouching(knife));
    {
      fruitGroup.destroyEach();
      knifeSound.play();
      score = score + 2;
    }
    else
    {
      if(monsterGroup.isTouching(knife))
      {
        gameState = end;
      
        gameOverSound.play();

        knife.addImage(gameOverImage);
        knife.x = 300;
        knife.y = 300;
        knife.scale = 1;

        fruitGroup.destroyEach();
        monsterGroup.destroyEach();
      }
    }
  }
  
  
  drawSprites();
  textSize(25);
  text("score:" + score, 250, 50);
}



function monsters()
{
  if(World.frameCount%200===0)
  {
    monster = createSprite(600, random(15,575));
    monster.addAnimation("moving", monsterAnimation);
    monster.velocityX = -(8+(score/10));
    monster.setLifetime = 50;
    monsterGroup.add(monster);
  }
}



function fruits()
{
  if(frameCount%80===0)
  {
    fruit = createSprite(0, random(15, 575));
    fruit.velocityX = 7+(score/4);
    fruit.scale = 0.2;
    fruit.setLifetime = 100;
    fruit.setCollider("rectangle", 0, 0, 40, 40);
    fruitGroup.add(fruit);
    
    r = Math.round(random(1,4));
    
    if(r===1)
    {
      fruit.addImage(orangeImage);
    }
    else if(r===2)
    {
      fruit.addImage(appleImage);
    }
    else if(r===3)
    {
      fruit.addImage(pearImage);
    }
    else
    {
      fruit.addImage(bananaImage);
    }
  }
}