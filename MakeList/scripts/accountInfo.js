// Initialize Firebase

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

var user;
var userDocRef;
var userDocument;


const btnLists = document.getElementById("btnLists");
btnLists.addEventListener("click", e => {
  window.location = "./home.html"
});

// This function gets the data and puts it on the screen
function getData(){
  setTimeout(function() {
  userDocRef.get().then(function(doc) {
    if (doc.exists) {
        var div = document.createElement("div");
        var firstNameDiv = document.createElement("div");
        var lastNameDiv = document.createElement("div");
        var birthdayDiv = document.createElement("div");
        var emailDiv = document.createElement("div");


        var text = document.createTextNode(doc.data().first);
        firstNameDiv.appendChild(text);
        div.appendChild(firstNameDiv);
        var btnFirstName = document.createElement("button");

        btnFirstName.classList.add("btn");
        btnFirstName.innerHTML="Change";
        firstNameDiv.appendChild(btnFirstName);

        text = document.createTextNode(doc.data().last);
        lastNameDiv.appendChild(text);
        div.appendChild(lastNameDiv);
        var btnLastName = document.createElement("button");

        btnLastName.classList.add("btn");
        btnLastName.innerHTML="Change";
        lastNameDiv.appendChild(btnLastName);
        text = document.createTextNode(doc.data().birthday);
        birthdayDiv.appendChild(text);
        div.appendChild(birthdayDiv);
        var btnBirthday = document.createElement("button");

        btnBirthday.classList.add("btn");
        btnBirthday.innerHTML="Change";
        birthdayDiv.appendChild(btnBirthday);
        text = document.createTextNode(doc.data().email);
        emailDiv.appendChild(text);
        div.appendChild(emailDiv);
        var btnEmail = document.createElement("button");

        btnEmail.classList.add("btn");
        btnEmail.innerHTML="Change";
        emailDiv.appendChild(btnEmail);



        btnFirstName.addEventListener("click", function() {
          changeData(1);
        });
        btnLastName.addEventListener("click",  function() {
          changeData(2);
        });
        btnBirthday.addEventListener("click",  function() {
          changeData(3);
        });
        btnEmail.addEventListener("click",  function() {
          changeData(4);
        });

        div.classList.add("container");
        firstNameDiv.classList.add("row");
        lastNameDiv.classList.add("row");
        birthdayDiv.classList.add("row");
        emailDiv.classList.add("row");

        document.body.appendChild(div);
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
  }).catch(function(error) {
    console.log("Error getting document:", error);
  });
}, 300);
}

function changeData(btnPressed){
  console.log(btnPressed);
  switch(btnPressed) {
    case 1:
    case 2:
    case 3:
    case 4:
    default:
  }
}

firebase.auth().onAuthStateChanged(function(user){
    user = firebase.auth().currentUser;
    userDocRef = db.collection("users").doc(user.email);
    getData();
        console.log(user);
});
