
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyANp80QxpFQx6gu1RZaq56-D78EaltckB4",
    authDomain: "makelistly.firebaseapp.com",
    databaseURL: "https://makelistly.firebaseio.com",
    projectId: "makelistly",
    storageBucket: "",
    messagingSenderId: "1042990227704"
  };
  firebase.initializeApp(config);


// get the elements from the thing

  const txtEmail = document.getElementById("txtEmail");
  const txtPassword = document.getElementById("txtPassword");
  const btnLogin = document.getElementById("btnLogin");
  const btnSignUp = document.getElementById("btnSignUp");
  const btnLogout = document.getElementById("btnLogout");

  // add login event

  btnLogin.addEventListener('click', e=>{
    //Get email and password
    const email = txtEmail.value;
    const password = txtPassword.value;
    const auth = firebase.auth();
    // sign in
    const promise = auth.signInWithEmailAndPassword(email, password);
    promise.catch( e => console.log(e.message));
  })

  // add sign up addEventListener
  btnSignUp.addEventListener('click', e=>{
    //Get email and txtPassword
    //TODO: check correct things
    const email = txtEmail.value;
    const password = txtPassword.value;
    const auth = firebase.auth();

    // create
    const promise = auth.createUserWithEmailAndPassword(email, password);
    promise.catch( e => console.log(e.message));
  })

  // add logout functionality
  btnLogout.addEventListener('click', e=>{
    firebase.auth().signOut();
  })


  // add a realtime authentication user

    firebase.auth().onAuthStateChanged(firebaseUser => {
      if(firebaseUser) {
        console.log(firebaseUser);
        btnLogin.classList.add('invisible');
        btnLogout.classList.remove('invisible');
        window.location="./home.html";
        if(firebaseUser.emailVerified == false){
          firebaseUser.sendEmailVerification().then(function() {
            // Email sent.
          }).catch(function(error) {
            // An error happened.
          });
        }
      } else {
        console.log("not logged in");
        btnLogout.classList.add('invisible');
        btnLogin.classList.remove('invisible');
      }


    });
