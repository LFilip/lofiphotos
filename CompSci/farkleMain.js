var numberOfPlayers;
var players = [];
var submitBtn;
var playerToUpdate;



function addPlayers(){
  for (i = 0; i < numberOfPlayers;i++){
    let newPlayer = {};
    newPlayer.name = prompt("Please enter a name for this player", "Johnson");
    newPlayer.score = 0;
    players.push(newPlayer);
  }
  createPlayerDivs();
}

function createPlayerDivs(){
  let playersDiv = document.querySelector(".players");
  playersDiv.innerHTML = "";
  for (i=0;i<numberOfPlayers;i++){
    let newPlayerDiv = document.createElement('div');
    newPlayerDiv.innerHTML = "<div class='name'> " +
                             players[i].name +
                             "</div>" +
                             "<div class='score score" + i.toString() + "'>" +
                             "0" +
                             "</div>";

    newPlayerDiv.classList.add("player");
    newPlayerDiv.addEventListener("click", addPoints);
    newPlayerDiv.index = i;
    playersDiv.appendChild(newPlayerDiv);
  }
}

function addPoints(evt){
  let string = ".score" + evt.target.index.toString();
  let playerScore = document.querySelector(string);
  let addedNumberTemp = prompt("Enter how many points they got! Must be a multiple of 50", "");
  while (isNaN(parseInt(addedNumberTemp)) || (parseInt(addedNumberTemp) % 50 != 0)){
    if (addedNumberTemp.toUpperCase() == "Q" ){
      return;
    }

    addedNumberTemp = prompt("You must enter a number that is a multiple of 50 or Q to quit")
  }
  if (addedNumberTemp == "Q" || addedNumberTemp == "q") {

  } else {

  let addedNumber = parseInt(addedNumberTemp);
  let oldNumTemp = playerScore.textContent;
  let oldNum = parseInt(oldNumTemp);
  console.log(addedNumber);
  console.log(oldNum);
  if ( oldNum < 500 && addedNumber < 500){
    alert("You must score 500 to start! :)");
    return;
  }
  let newNum = oldNum + addedNumber;
  if (newNum > 10000){
    alert("You went over! That's Farkle");
    return;
  }
  playerScore.textContent = newNum;
  }

}

function selectNumber() {
  players.length = 0;
    let numberField = document.querySelector(".numberOfPlayers");
    numberOfPlayers = parseInt(numberField.value);
    if (numberOfPlayers > 8 || numberOfPlayers < 1){
      alert("There can be between 1 and 8 players");
      return;
    }
    addPlayers();
}


function setListeners() {
    console.log("initiailizing Listeners");
  submitBtn = document.querySelector(".selectBtn");
  submitBtn.addEventListener("click",selectNumber);
}
