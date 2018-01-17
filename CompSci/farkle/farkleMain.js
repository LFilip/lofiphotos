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
  console.log(firestore);


function addPlayers(){
  for (i = 0; i < numberOfPlayers;i++){
    let newPlayer = {};
    newPlayer.name = prompt("Please enter a name for this player", "Johnson");
    newPlayer.score = 0;
    firestore.collection("scores").doc("player" + i).set({
      name: newPlayer.name,
      score: newPlayer.score
    }).then(function(){
      console.log("Status saved");
    });
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
                             players[i].score +
                             "</div>";

    newPlayerDiv.classList.add("player");
    newPlayerDiv.addEventListener("click", addPoints);
    newPlayerDiv.index = i;
    console.log(playersDiv);
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


function loadGame() {
  console.log("loading Game")
  let i = 0;

  if (players.length <= 0){
    numberOfPlayers = 0;
    firestore.collection("scores").where("score", ">=", 0)
      .get()
      .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
              let newPlayer = {};
              console.log(doc.id, " => ", doc.data().name);
              newPlayer.name = doc.data().name;
              newPlayer.score = doc.data().score;
              players.push(newPlayer);
              numberOfPlayers++;
          });
      })
      .catch(function(error) {
          console.log("Error getting documents: ", error);
      });
      console.log(players);

  }
        createPlayerDivs();
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
  loadBtn = document.querySelector(".loadBtn");
  submitBtn.addEventListener("click",selectNumber);
  loadBtn.addEventListener("click",loadGame);
}
