// Initialize Firebase
var config = {

    apiKey: "AIzaSyANp80QxpFQx6gu1RZaq56-D78EaltckB4",
    authDomain: "makelistly.firebaseapp.com",
    databaseURL: "https://makelistly.firebaseio.com",
    projectId: "makelistly",
    storageBucket: "makelistly.appspot.com",
    messagingSenderId: "1042990227704"
};
firebase.initializeApp(config);
var db = firebase.firestore();



const btnLogout = document.getElementById("btnLogout");
btnLogout.addEventListener("click", e=>{
  console.log(firebase.auth().currentUser)
  if(firebase.auth().currentUser != null){
      firebase.auth().signOut();
      window.location = "./login.html";
  } else {
      window.location = "./login.html";
  }
})

const btnAccount = document.getElementById("btnAccount");
btnAccount.addEventListener("click", e=> {
  window.location = "./accountInfo.html";
})

const main = document.getElementById("main");


const btn = document.createElement("BUTTON");        // Create a <button> element
const t = document.createTextNode("MakeList");       // Create a text node
btn.classList.add("btn")
btn.appendChild(t);                                // Append the text to <button>
main.appendChild(btn);

// adding the event listener for second button





setTimeout(function (){

  user = firebase.auth().currentUser;
  console.log(user);
  var div= document.createElement("div")
  div.classList.add("row");
  div.innerHTML = user.email;
  div.id = "emailDiv";

  document.body.appendChild(div);

}, 1000);
