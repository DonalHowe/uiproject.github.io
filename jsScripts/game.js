
//canvas variables setup
var canvas= document.getElementById("theCanvas");
var context= canvas.getContext("2d");
///////////////////////////////////////////////////////////////
//loadfing font
context.font = "30px Arial";
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
var backgroundImageOutside=new Image();
backgroundImageOutside.src="images/backgroundOutsideCastle.jfif"

var dragonLeft=new Image();
dragonLeft.src="images/toothlessLeft.png"
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//player setup sprite variables
var playerSprite=new Image();
var playername="knight";
playerSprite.src="images/knight2.png"
var Weapon=new Image();
Weapon.src="images/weaponEmpty.png"
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//enemy sprite variables
var enemySprite=new Image();
enemySprite.src="images/toothless.png"
var maceSelected=false;
var swordSelected=false;
 var enemyRight=true;
 var enemyLeft=false;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//animation variables
var current=0;
var currentFrame=0;
var initial=new Date().getTime();;
var frames=6;
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//player array setup
var player = new PlayerObject("player",playerSprite,100);
var characterArray=[player, new PlayerObject("enemy",enemySprite,100,500,500)];
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//shield variables
var shieldImage=new Image();
shieldImage.src="images/force_field.png"
var shieldSelected=false;
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//player original posiiton
var knightPositionX=50;
var knightPositionY=290;
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//player strecth values
var player_startPos=250;
var player_startPosY=550;
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
var playerAttack=false;
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var EnemyDead=false;
var GameWonSprite=new Image();
GameWonSprite.src="images/gameWin.jfif"
var  playerHit=false;
////////////////////////////////////////////////////////////////////////////////////////////////////////////
// game lost variables
var playerDead=false;
var gameLostSprite= new Image();
gameLostSprite.src="images/gameLostSprite.png"
var playerPickShield=false;
//////////////////////////////////////////////////////////////////////////////////////////////////////////
//enemy weapons variables toothless and wizard
var fireballSprite=new Image();
fireballSprite.src="images/toothless_fire.png"
var enemyfireBallSpawnX=characterArray[1].x;
var enemyfireBallSpawnY=characterArray[1].y;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
var enemYAttack=false;
var playerHealth =10;
var finalHealth= String("player health :"+playerHealth);
var afterDamage =8;
var nextPlayerHp= String("player health :"+afterDamage);
var playerDamagedFully=3;
var noShield= String("player health :"+playerDamagedFully);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//turn rotation variables
//if it equals true it is the players turn if it equals false it is not the players turn
var playersTurn=true;
var fireBallShot=false;
var swordPicked=false;
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
var WeaponPositionX=0;
var WeaponPositionY=0;
var maceMove=true;
var enemyDamage=5;
var selctPoint=false;

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//weapon object class
function weaponObject(name, health){
    this.name=name;
     this.x=10;
     this.y=10;
     this.health=health;
     this.scale=1;
 
 
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////
//player object class
function PlayerObject(name, health){
   this.name=name;
    this.x=10;
    this.y=10;
    this.health=health;
    this.scale=1;

}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

//player animation function
function animate() {
    context.clearRect(0, 0, canvas.width, canvas.height); 
    current = new Date().getTime(); // update current
    if (current - initial >= 300) { // check is greater that 500 ms
        currentFrame = (currentFrame + 1) % frames; // update frame
        initial = current; // reset initial
    }
    // drawing the background image
    if(EnemyDead==false&& playerDead==false)
    {
      context.drawImage(backgroundImageOutside,0,0,310,400);
     
    }
   //drawing the enemy sprite
   if(enemyRight==true)
   {
    context.drawImage(enemySprite,characterArray[1].x,characterArray[1].y,100,100);
   }
   else if(enemyLeft==true )
   {
    context.drawImage(dragonLeft,characterArray[1].x,characterArray[1].y,100,100);
   }
    
    // player sprite drawing
    context.drawImage(playerSprite,playerSprite.width/6*currentFrame,0,player_startPos,player_startPosY,knightPositionX,knightPositionY,100,100);

    // drawing the fireBall
    if(enemYAttack==true&&fireBallShot==false){

        context.drawImage(fireballSprite,enemyfireBallSpawnX,enemyfireBallSpawnY,20,20);
      
    }
    if(playerPickShield==true&&fireBallShot==false)
    {
      context.drawImage(fireballSprite,enemyfireBallSpawnX,enemyfireBallSpawnY,20,20);
    }
    if(playerAttack==false&&maceMove==true)
    {
      WeaponPositionX=knightPositionX+20;
      WeaponPositionY=knightPositionY-20;
    }
   
    context.drawImage(Weapon,WeaponPositionX,WeaponPositionY);
    if(shieldSelected==true)
    {
        context.drawImage(shieldImage,knightPositionX,knightPositionY,100,100);
    }
    if(playerHit==false&&playerPickShield==false)
    {
      context.fillText(finalHealth,20,30);
    }
    else if(playerHit==true&&playerPickShield==false){
         
         context.fillText(nextPlayerHp,20,30);
    }
    if(playerPickShield==true&&playerHit==true)
    {
      context.fillText(noShield,20,30);
    }
   
    if(playerDead==true)
    {
      context.drawImage(gameLostSprite,0,0,400,400)
    }
    if(EnemyDead==true){
      context.drawImage(GameWonSprite,0,0,300,360)
    }
   
  
}

///////////////////////////////////////////////////////////////////////////////
 function attack()
 {
    shieldSelected=false;
    console.log("entering attack function")
    playersTurn=false;
    playerAttack=true;
    enemYAttack=true;
    if(playerAttack==true )
    {
            console.log("start the yolo  attack")
            if(knightPositionX<characterArray[1].x)
            {
              knightPositionX++;
              WeaponPositionX++;
            }
            if(knightPositionX>characterArray[1].x)
            {
              knightPositionX--;
              WeaponPositionX--;
            
            }
           
            if(knightPositionY>characterArray[1].y)
            {
              knightPositionY--;
              WeaponPositionY--;
            }
                       
            
    } 
    if(knightPositionY==characterArray[1].y&&knightPositionX==characterArray[1].x)
    {
      knightPositionX=50;
      knightPositionY=290;
      playersTurn=true;
      playerAttack=false;
      shieldSelected=false;
      EnemyDead=true;

    }
   
    
  }
////////////////////////////////////////////////////////////////////////////////
    var gameObjects = {
        'positionX': 1,
        'positionY': 2,
        'score': 3
      };
//////////////////////////////////////////////////////////////////////////////////
        // Game objects as JSON
  localStorage.setItem('gameObjects', JSON.stringify(gameObjects));

  // Retrieve Games object as from storage
  var npcObjects = localStorage.getItem('gameObjects');

  console.log('PLAYER_OBJECTS: ', JSON.parse(npcObjects));

  // Reading Level Information from a file
  var readJSONFromURL = function (url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';

    xhr.onload = function () {
      var status = xhr.status;
      if (status == 200) {
        callback(null, xhr.response);
      } else {
        callback(status);
      }
    };

    xhr.send();
  };

  readJSONFromURL('./data/level.json', function (err, data) {
    if (err != null) {
      console.error(err);
    } else {
      var text = data["positionX"];
      console.log(text);
      var text = data["positionY"];
      console.log(text);
      var text = data["score"];
      console.log(text);
    }
  });
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // local storage function
  function updateScore(){
    var score=localStorage.getItem('score');
    if (isNaN(score)) {
      localStorage.setItem('score', 0);
        document.getElementById("SCORE").innerHTML = " [ " + score + " ] ";
    } else {
        localStorage.setItem('score', parseInt(score)+1);
       document.getElementById("SCORE").innerHTML = " [ " + score + " ] ";
    }
   
  }
 //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//weapon selection function 
function weaponSelection(){
    var selection = document.getElementById("equipment").value;
    var active = document.getElementById("active")

    if (active.checked == true) {
      document.getElementById("HUD").innerHTML = selection + " active ";
      console.log("Weapon Active");
    } else {
      document.getElementById("HUD").innerHTML = selection + " selected ";
      console.log("Weapon Selected");
    }

    if(selection=="mace")
    {
        Weapon.src="./images/maceFinished.png";
        console.log("yolo");
        maceMove=false;
    }
    else if(selection=="sword")
    {
        Weapon.src="./images/swordFinished.png";
        swordPicked=true;
        console.log("yoloWWWWW");

    }
      
    
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//weapon selection variables
var options = [{
    "text": "Select a Weapon",
    "value": "No Weapon",
    "selected": true
  },
  {
    "text": "Mace",
    "value": "mace"
  },
  {
    "text": "Sword",
    "value": "sword"
  },
 
];
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var selectBox = document.getElementById('equipment');
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
for (var i = 0; i < options.length; i++) {
  var option = options[i];
  selectBox.options.add(new Option(option.text, option.value, option.selected));
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//enemy basic movement
function enemyMovement(){

   
    if(enemyLeft==true)
    {
        characterArray[1].x-=1;
        if(characterArray[1].x==0)
        {
         enemyRight=true;
         enemyLeft=false;
         console.log("turn Right");
        }
       
    }
    if(enemyRight==true)
    {
     
      characterArray[1].x+=1;
      if(characterArray[1].x==210)
      {
        enemyLeft=true;
        enemyRight=false;
        console.log("turn left");
      }
     
    }
  
    
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//player shield function that applies the players shield
function shield(){
    shieldSelected=true;
    console.log("entering function")
    enemYAttack=true;
    playerPickShield=true;
}
///////////////////////////////////////////////////////////////////////////////
// put to load the players name here if it gets done 
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//player function to move the player right upon button click
function dodgeRight(){
    knightPositionX=knightPositionX+30;
    WeaponPositionX=WeaponPositionY+30;
    console.log("entering dodge function")
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//player function to move the player left upon button click
function dodgeLeft(){
    knightPositionX=knightPositionX-30;
    WeaponPositionX=WeaponPositionY-30;
    console.log("entering dodge function")
    
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//function that swicthes the turns of the player vs the ai
function turnRotation(){
    // the player has the first go
    console.log("fireball throw");
    if(enemYAttack==true||playerPickShield==true){
        if(enemyfireBallSpawnX<knightPositionX)
        {
            enemyfireBallSpawnX++;
        }
        if(enemyfireBallSpawnY<knightPositionY)
        {
            enemyfireBallSpawnY++;
        }
        if(enemyfireBallSpawnX.x>knightPositionX)
        {
            enemyfireBallSpawnX--;
        }
        if(enemyfireBallSpawnY>knightPositionY)
        {
            enemyfireBallSpawnY--;
        }
    }
   
 
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function checkCollsions(){
    //for collisions between the player and the dragons fireball only
    if(enemyfireBallSpawnY==knightPositionY&&enemyfireBallSpawnX==knightPositionX){
        console.log("fireBallCollided");
        fireBallShot=true;
        playersTurn=true;
        playerHit=true;
        selctPoint=true;
       
    }
  
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
updateScore();
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//the base game loop 
function GameLoop()
{
   if(maceMove==false||swordPicked==true)
   { 
     if(playerHit==true)
     {
      attack();
     }
     
   }
   if(playerHit==true)
     {
      finalHealth.replace(nextPlayerHp);
     }
     
   
    turnRotation();
    checkCollsions();
    enemyMovement();
    animate();// not only animate but draws to the canvas as well
 
 
   window.requestAnimationFrame(GameLoop);
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
window.requestAnimationFrame(GameLoop);
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
