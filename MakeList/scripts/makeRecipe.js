// Initialize Firebase
var config = {
  apiKey: "AIzaSyANp80QxpFQx6gu1RZaq56-D78EaltckB4",
  authDomain: "makelistly.firebaseapp.com",
  databaseURL: "https://makelistly.firebaseio.com",
  projectId: "makelistly",
  storageBucket: "",
  messagingSenderId: "1042990227704"
};

if (!firebase.apps.length) {
    firebase.initializeApp(config);
    console.log("opening firebase");
} else{
  console.log("firebase already open");
}

const firestore = firebase.firestore();

var user;
var userDocRef;
var userDocument;
var recipeDocument;

setTimeout(function (){
  user = firebase.auth().currentUser;
  console.log(user);
}, 300);

class Ingredient {
  constructor(name, numberOfItem, unitOfMeasure) {
    this.name = name;
    this.numberOfItem = numberOfItem;
    this.unitOfMeasure = unitOfMeasure;

    this.inventory = function() {
      return (this.name + ": " + this.numberOfItem + " " + this.unitOfMeasure);
    }

    this.addTo = function(numberOfItem){
      this.numberOfItem += numberOfItem;
    }
  }
};

class Step {
  constructor(number, text){
    this.number = number;
    this.text = text;

    this.printStep = function() {
      return (this.number + ".) " + this.text);
    }
  }
}

class Recipe {
  constructor() {
    this.name = "name";
    this.cooktime = 0;
    this.preptime = 0;
    this.totaltime = 0;
    this.steps = [];
    this.ingredients = [];

    this.updateCooktime = function(time){
      if (parseInt(time) > 0){
        this.cooktime = parseInt(time);
      }
    }

    this.updatePreptime = function(time){
      if(parseInt(time) > 0){
        this.preptime = parseInt(time);
      }
    }

    this.totalTime = function(){
      return parseInt(this.cooktime) + parseInt(this.preptime);
    }
  }


}

// creating the button functionality to submit new ingredient
var submitBtn =  document.getElementById("submitBtn");
submitBtn.addEventListener("click", e=>{
  let nameInput = document.getElementById("nameInput");
  let numberInput = document.getElementById("numberInput");
  let unitInput = document.getElementById("unitInput");

  if(nameInput.value != "" && numberInput.value > 0 && unitInput.value != ""){
    let newIngredient = new Ingredient(nameInput.value, parseInt(numberInput.value), unitInput.value);
    let index = 0;
    console.log(typeof newRecipe.ingredients[0] != "undefined")
    if(typeof newRecipe.ingredients[0] != "undefined"){
      for(item in newRecipe.ingredients){
        if((newIngredient.name.toLowerCase() == newRecipe.ingredients[index].name.toLowerCase()) && (newIngredient.unitOfMeasure.toLowerCase() == newRecipe.ingredients[index].unitOfMeasure.toLowerCase())){
          newRecipe.ingredients[index].addTo(newIngredient.numberOfItem);
          updateContent();
          return true;
        }
        index ++;
      }
    }
    newRecipe.ingredients.push(newIngredient);
    nameInput.value = "";
    numberInput.value = "";
    unitInput.value = "";
    updateContent();
  }
});

// creating the button functionality to submit info for recipeInfo
var submitRecipeBtn = document.getElementById("submitRecipeBtn");
submitRecipeBtn.addEventListener("click", e=>{
 let recipeNameInput = document.getElementById("recipeName");
 let recipePrepInput = document.getElementById("recipePrepTime");
 let recipeCookInput = document.getElementById("recipeCookTime");

 if (recipeNameInput.value != ""){
   newRecipe.name = recipeNameInput.value;
 }

 if(recipePrepInput.value > 0){
   newRecipe.updatePreptime(recipePrepInput.value);
 }

 if(recipeCookInput.value > 0){
   newRecipe.updateCooktime(recipeCookInput.value);
 }

 recipeNameInput.value = "";
 recipePrepInput.value = "";
 recipeCookInput.value = "";
 updateContent();
});

// creating the button functionality to submit a new step
let stepCount = 1;
var submitStepBtn = document.getElementById("submitStepBtn");
submitStepBtn.addEventListener("click", e=>{
  let stepInput = document.getElementById("stepInput");
  if (stepInput.value != ""){
    let newStep = new Step(stepCount, stepInput.value)
    stepCount++;
    newRecipe.steps.push(newStep);
    stepInput.value = "";
    updateContent();
  }
});

// creating the button functionality to go back to lists
var listBtn = document.getElementById("listBtn");
listBtn.addEventListener("click", e=>{
    window.location = "./home.html"
});

// craeting the button functionality to submit the recipe to the
var finalBtn = document.getElementById("finalBtn");
finalBtn.addEventListener("click", e=>{
  recipesRef = firestore.collection('recipes');
  let stepsTemp = [];
  let ingredientsTemp = []
  for (i = 0; i < newRecipe.steps.length;i++){
      stepsTemp[i] = newRecipe.steps[i].printStep();
  }
  for (i = 0; i < newRecipe.ingredients.length;i++){
    ingredientsTemp[i] = { name: newRecipe.ingredients[i].name, number: newRecipe.ingredients[i].numberOfItem, unit: newRecipe.ingredients[i].unitOfMeasure };
  }

  recipesRef.doc(newRecipe.name).set({
    name: newRecipe.name,
    cooktime: newRecipe.cooktime,
    preptime: newRecipe.preptime,
    steps: stepsTemp,
    ingredients: ingredientsTemp
  })
});

// creating a list to show on the page in the content div
var contentDiv = document.getElementById('content');
function updateContent(){
  contentDiv.innerHTML = "";
  // creating the title
  let title = document.createElement("DIV");
  let newText = document.createTextNode(newRecipe.name)
  title.appendChild(newText);
  title.classList.add("h3")
  contentDiv.appendChild(title);

  // create the times
  let prepTime = document.createElement("DIV");
  newText = document.createTextNode(newRecipe.preptime + " Minutes: Prep Time");
  prepTime.appendChild(newText);
  prepTime.classList.add("h4");
  contentDiv.appendChild(prepTime);
  let cookTime = document.createElement("DIV");
  newText = document.createTextNode(newRecipe.cooktime + " Minutes: Cook Time");
  cookTime.appendChild(newText);
  cookTime.classList.add("h4");
  contentDiv.appendChild(cookTime);
  let totaltime = document.createElement("DIV");
  newText = document.createTextNode(newRecipe.totalTime() + " Minutes: Total Time");
  totaltime.appendChild(newText);
  contentDiv.appendChild(totaltime);

  // creating the ingredients
   if (typeof newRecipe.ingredients[0] != "undefined"){
     for (i = 0; i < newRecipe.ingredients.length ; i++){
        let newItem = document.createElement("DIV");
        let newText = document.createTextNode(newRecipe.ingredients[i].inventory());
        newItem.appendChild(newText);
        contentDiv.appendChild(newItem);
      }
    } else {
      let newItem = document.createElement("DIV");
      let newText = document.createTextNode("Add Ingredients");
      newItem.appendChild(newText);
      contentDiv.appendChild(newItem);
    }

  // creating the steps
  if (typeof newRecipe.steps[0] != "undefined"){
    for (i = 0; i < newRecipe.steps.length ; i++){
       let newItem = document.createElement("DIV");
       let newText = document.createTextNode(newRecipe.steps[i].printStep());
       newItem.appendChild(newText);
       contentDiv.appendChild(newItem);
     }
   } else {
     let newItem = document.createElement("DIV");
     let newText = document.createTextNode("Add Steps");
     newItem.appendChild(newText);
     contentDiv.appendChild(newItem);
   }

   var myJSON = JSON.stringify(newRecipe);
   console.log(myJSON);


}


/*
var meatloafStep_1 = new Step(1,"Make the meatloaf");
var meatloafStep_2 = new Step(2, "Cook the meatloaf");
var meatloafSteps = [meatloafStep_1, meatloafStep_2];
let ingredient1 = new Ingredient("meat", 20, "ozs");
let ingredient2 = new Ingredient("loaf", 40, "ozs");
let mainList = [ingredient1, ingredient2];


*/
let newRecipe = new Recipe();

firebase.auth().onAuthStateChanged(function(user){
  recipeDocRef = firestore.collection("recipes");
  recipeDocRef.get().then(function(doc) {
    if(doc.exists){
      console.log(doc);
    }
  })
});
console.log(newRecipe);
updateContent();
