var numberOfPlayers;
var players = [];
var submitBtn;
var playerToUpdate;



  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBpIkC-cIQPw665B32jb9xSicUdN4Lw0uY",
    authDomain: "farkle-scoreboard.firebaseapp.com",
    databaseURL: "https://farkle-scoreboard.firebaseio.com",
    projectId: "farkle-scoreboard",
    storageBucket: "farkle-scoreboard.appspot.com",
    messagingSenderId: "648854563496"
  };
  firebase.initializeApp(config);

  var firestore = firebase.firestore();
  console.log(firestore.collection("scores").doc("player0").get());

function addPlayers(){
  deletePlayers();

  numberOfPlayers = prompt("Please enter the number of players (1 - 8).  Q to quit");
  console.log(numberOfPlayers.toUpperCase() != "Q" )
  while(parseInt(numberOfPlayers) > 8 || parseInt(numberOfPlayers)  < 1) {
    numberOfPlayers = prompt("Needs to be between 1 and 8.  Q to quit");
  }

  if (parseInt(numberOfPlayers) <= 8 && parseInt(numberOfPlayers)  >= 1){

  for (i = 0; i < numberOfPlayers;i++){
    let newPlayer = {};
    newPlayer.name = prompt("Please enter a name for this player", "");
    newPlayer.score = 0;
    firestore.collection("scores").doc("player" + i).set({
      name: newPlayer.name,
      score: newPlayer.score
    }).then(function(){
      console.log("Status saved");
    });
    players.push(newPlayer);
    console.log(players);
  }
  createPlayerDivs();
  }
}


function createPlayerDivs(){
  console.log("creating player divs")
  let playersDiv = document.querySelector(".players");
  playersDiv.innerHTML = "";
  for (i=0;i<numberOfPlayers;i++){
    console.log(i);
    let newPlayerDiv = document.createElement('div');
    newPlayerDiv.innerHTML = "<div class='name'> " +
                             players[i].name +
                             "</div>" +
                             "<div class='score score" + i.toString() + "'>" +
                             players[i].score +
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
  firestore.collection("scores").doc("player" + evt.target.index.toString()).set({
    name: players[evt.target.index.toString()].name,
    score: newNum
  }).then(function(){
    console.log("Status saved");
  });
  playerScore.textContent = newNum;
  }
}

function deletePlayers() {
  for (i = 0; i < 8; i++){
    firestore.collection("scores").doc("player" + i).delete().then(function() {
      console.log("Document successfully deleted!");
    }).catch(function(error) {
      console.error("Error removing document: ", error);
    });
  }
}

function loadGame() {
  console.log("loading Game")
  if (confirm("Doing this will erase this game. Do you wish to continue?")){
  let i = 0;

  if (players.length <= 0){
    firestore.collection("scores").where("score", ">=", 0)
      .get()
      .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
              let newPlayer = {};
              console.log(doc.id, " => ", doc.data().name);
              newPlayer.name = doc.data().name;
              newPlayer.score = doc.data().score;
              players.push(newPlayer);
               i++;
               numberOfPlayers = i;
               console.log(numberOfPlayers);
               createPlayerDivs();
          });
      })
      .catch(function(error) {
          console.log("Error getting documents: ", error);
      });

  }

      }
}

function selectNumber() {
  players.length = 0;
    addPlayers();
}


function setListeners() {
    console.log("initiailizing Listeners");
  submitBtn = document.querySelector(".selectBtn");
  loadBtn = document.querySelector(".loadBtn");
  submitBtn.addEventListener("click",selectNumber);
  loadBtn.addEventListener("click",loadGame);
}
