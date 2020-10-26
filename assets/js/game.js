var playerName = window.prompt("What is your robot's name?");
var playerHealth = 1;
var playerAttack = 10;
var playerMoney = 10;

var enemyHealth = 50;
var enemyAttack = 12;
var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];

// for(var i = 0; i < enemyNames.length; i++) {
//   console.log(enemyNames[i]);
//   console.log(i);
//   console.log(enemyNames[i] + " is at " + i + " index");
// }

var fight = function(enemy) {
  // keep track of who goes first
  var isPlayerTurn = true;
​
  // randomly change turn order
  if (Math.random() > 0.5) {
    isPlayerTurn = false;
  }
​
  while (playerInfo.health > 0 && enemy.health > 0) {
    if (isPlayerTurn) {
      // ask player if they'd like to fight or skip using fightOrSkip function
      if (fightOrSkip()) {
        // if true, leave fight by breaking loop
        break;
      }
​
      var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
​
      // remove enemy's health by subtracting the amount we set in the damage variable
      enemy.health = Math.max(0, enemy.health - damage);
      console.log(
        playerInfo.name +
          " attacked " +
          enemy.name +
          ". " +
          enemy.name +
          " now has " +
          enemy.health +
          " health remaining."
      );
​
      // check enemy's health
      if (enemy.health <= 0) {
        window.alert(enemy.name + " has died!");
​
        // award player money for winning
        playerInfo.money = playerInfo.money + 20;
​
        // leave while() loop since enemy is dead
        break;
      } else {
        window.alert(enemy.name + " still has " + enemy.health + " health left.");
      }
      // player gets attacked first
    } else {
      var damage = randomNumber(enemy.attack - 3, enemy.attack);
​
      // remove player's health by subtracting the amount we set in the damage variable
      playerInfo.health = Math.max(0, playerInfo.health - damage);
      console.log(
        enemy.name +
          " attacked " +
          playerInfo.name +
          ". " +
          playerInfo.name +
          " now has " +
          playerInfo.health +
          " health remaining."
      );
​
      // check player's health
      if (playerInfo.health <= 0) {
        window.alert(playerInfo.name + " has died!");
        // leave while() loop if player is dead
        break;
      } else {
        window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
      }
    }
    // switch turn order for next round
    isPlayerTurn = !isPlayerTurn;
  }
};

// Game States
// "WIN" - Player robot has defeated all enemy-robots
//    * Fight all enemy-robots
//    * Defeat each enemy-robot
// "LOSE" - Player robot's health is zero or less

//Random function
var randomNumber = function(min, max){
  var value = Math.floor(Math.random() * (max - min + 1)) + min;
  return value;
}

//function to Start Game
var startGame = function(){
//reset player stats;
playerHealth = 100;
playerAttack = 10;
playerMoney = 10;
for(var i = 0; i < enemyNames.length; i++){
  if(playerHealth > 0){
    window.alert("Welcome to Robot Gladiators! " + (i + 1));
    var pickedEnemyName = enemyNames[i];
    enemyHealth = randomNumber(40, 60);
    fight(pickedEnemyName);
    //if we're not at the last enemy in the array
    if (playerHealth > 0 && i < enemyNames.length - 1){
      //ask player if they want to go to store
      var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");

      //if yes, go to shop
      if(storeConfirm){
        shop();
      }
    }
  } else {
    window.alert("You've lost your robot in battle. GAME OVER");
    break;
  }
}
endGame();
};
var endGame = function(){
  //if player is alive, player wins!
  if (playerHealth > 0){
    window.alert("Great job, you've survived the game!  You now have a score of " + playerMoney + ".");
  }
  else{
    window.alert("You've lost your robot in battle.");
  }
  // ask player if they'd like to play again
  var playAgainConfirm = window.confirm("Would you like to play again?");

  if (playAgainConfirm){
    //restart the game
    startGame();
  }
  else{
    window.alert("Thank you for playing Robot Gladiators! Come back soon!");
  }
}
var shop = function(){
  console.log("entered the shop");
  var shopOptionPrompt = window.prompt("Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice. ");
  switch(shopOptionPrompt){
    case "refill":
    case "REFILL":
  if (playerMoney >= 7) {
    window.alert("Refilling player's health by 20 for 7 dollars.");

    // increase health and decrease money
    playerHealth = playerHealth + 20;
    playerMoney = playerMoney - 7;
  }
  else {
    window.alert("You don't have enough money!");
  }

  break;
case "upgrade":
case "UPGRADE":
  if (playerMoney >= 7) {
    window.alert("Upgrading player's attack by 6 for 7 dollars.");

   // increase attack and decrease money
    playerAttack = playerAttack + 6;
    playerMoney = playerMoney - 7;
  }
  else {
    window.alert("You don't have enough money!");
  }

  break; 

      case "leave":
      case "LEAVE":
      window.alert("Leaving the store.");

      //do nothing, so function will end
      break;
      default:
        window.alert("You did not pick a valid option. Try again.");

        //call shop() again to force player to pick valid option
        shop();
        break;
  }
};
//start the game when the page loads
startGame();