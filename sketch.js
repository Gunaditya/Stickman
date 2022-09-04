var bg, tower;
var skyblockImg, skyblock, skyblocksGroup;
var stickman, stickmanImg,Platform;
var invisibleBlockGroup, invisibleBlock, endBlock, rightBlock,leftBlock,upblock;
var gameState = "play"
var finishLine, finishLineIMG;


function preload(){
  bg = loadImage("https://i.postimg.cc/gjGgBnft/stickman-Background.jpg");
  skyblockImg = loadImage("https://i.postimg.cc/L8GNFyc1/Stone.png");
  stickmanImg = loadImage("https://i.postimg.cc/1z6MmGSY/Stickman.png");
  finishLineIMG = loadImage("https://i.postimg.cc/Vs4gkLy1/Finish-line.png");
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  tower = createSprite(300,300);
  tower.addImage("stickmanBackground",bg);
  tower.scale = 3

  stickman = createSprite(200,200,50,50);
  stickman.scale = 0.3
  stickman.addImage(stickmanImg);

  Platform = createSprite(200,225,100,30)
  Platform.velocityX = 3

  endBlock = createSprite(windowWidth,windowHeight,windowWidth*2);
  endBlock.visible = false

  rightBlock = createSprite(windowWidth - 20,windowHeight/2,50,windowHeight);
  rightBlock.visible = false

  leftBlock = createSprite(0+20,windowHeight/2,50,windowHeight)
  leftBlock.visible = false

  upBlock = createSprite(windowWidth/2,0,windowWidth,50);
  upBlock.visible = false

  finishLine = createSprite(0+20,windowHeight/2,50,windowHeight)
  finishLine.addImage(finishLineIMG)
  finishLine.visible = false
  finishLine.scale = 2
  finishLine.depth = 3


  skyblocksGroup = new Group();
}

function draw() {
  background(200);

  if (gameState == "play"){

    if(stickman.y<60){
      stickman.y=60
    }

    if(keyDown("space")){
      stickman.velocityY = -10;
    }

    if(keyDown("right_arrow")){
      stickman.x +=3
    }

    if(keyDown("left_arrow")){
      stickman.x +=-4
    }

    spawndoors()


    stickman.velocityY += 0.8
    stickman.velocityX = 3

    if(stickman.isTouching(endBlock)){
      stickman.velocityY = 0
      stickman.velocityX = 0
      gameState = "End"
    }

    if(stickman.isTouching(rightBlock)){
      stickman.velocityY = 0
      stickman.velocityX = 0
      gameState = "End"
    }

    if(stickman.isTouching(leftBlock)){
      stickman.velocityY = 0
      stickman.velocityX = 0
      gameState = "End"
    }

    if(stickman.isTouching(upBlock)){
      stickman.velocityY = 0
      stickman.velocityX = 0
      gameState = "End"
    }

    stickman.collide(skyblocksGroup);
    stickman.collide(Platform)

    drawSprites()

    if(gameState == "End"){
      fill("Red")
      textSize(20)
      text("Game over",windowWidth/2,windowHeight/2)
      text.lifetime()
    }

  }

  if(stickman.isTouching(finishLine)){
    fill("Red")
    textSize(20)
    text("You completed my game",windowWidth/2-100,windowHeight/2)
    text.lifetime()
  }

  if(frameCount == 2000){
    finishLine.visible = true
    finishLine.velocityX = 3
  }

 }

  function spawndoors(){
    if(frameCount % 180 === 0 ){
      skyblock = createSprite(0,windowWidth-290);
      skyblock.addImage(skyblockImg);
      skyblocksGroup.add(skyblock);
      skyblock.lifetime = windowWidth+10;
      skyblock.velocityX = 3;
      skyblock.y = Math.round(random(300,windowHeight-150))
      skyblock.scale = 0.3
      skyblock.debug = true
      skyblock.depth = 2
    }
  }

