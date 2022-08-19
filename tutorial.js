window.addEventListener("load", () => {
  console.log("tutorialEnabled");
  document
    .querySelector("#tutorial_button")
    .addEventListener("click", startTutorial);
});

let theme;

function startTutorial() {
  console.log("startTutorial");
  document.querySelector("#button").play();

  //Skjul skærme
  document.querySelector("#game_menu").classList.add("hidden");
  document.querySelector("#game_over").classList.add("hidden");
  document.querySelector("#level_complete").classList.add("hidden");
  document.querySelector("#game_background").classList.remove("hidden");

  //Skjul knapper
  document.querySelector("#restart_button").classList.add("hidden");
  document.querySelector("#home_button").classList.add("hidden");
  document.querySelector("#previous_button1").classList.add("hidden");
  document.querySelector("#next_button1").classList.add("hidden");

  //Skjul elementer
  containers.forEach((container) => {
    document.querySelector(container).classList = "hidden";
  });

  //Nulstil point, tid og liv
  points = 0;
  life = 3;
  document.querySelector("#score").textContent = points;

  document.querySelector("#life1").classList.remove("life_lost");
  document.querySelector("#life2").classList.remove("life_lost");
  document.querySelector("#life3").classList.remove("life_lost");

  //Fremhæv element
  document
    .querySelector("#pineapple_container_tutorial")
    .classList.remove("hidden");
  document.querySelector("#shadow").classList.remove("hidden");
  document.querySelector("#board").classList.remove("hidden");
  document.querySelector("#score_board").classList.remove("highlight");
  document.querySelector("#pineapple_sprite_tutorial").classList = " ";
  document.querySelector("#pineapple_container_tutorial").classList = " ";
  document.querySelector("#pineapple_container_tutorial").offsetHeight;
  document.querySelector("#pineapple_container_tutorial").classList =
    "container fallspeed_tutorial pos14 delaytutorial highlight";
  document
    .querySelector("#pineapple_container_tutorial")
    .addEventListener("animationend", pineappleTutorial);

  //Tutorial text
  document.querySelector("#tutorial_text").textContent =
    "Welcome to Pablo's Pizza. Papa Pablo is a world-renowned Italian chef.  However, his pizzeria has been attacked by pineapples seeking to contaminate his pizza.";
}

function pineappleTutorial() {
  console.log("pineappleTutorial");

  //Add clickability
  this.addEventListener("click", pineappleTutorialClicked);

  this.firstElementChild.addEventListener("animationend", scoreTutorial);

  //Tutorial text
  document.querySelector("#tutorial_text").textContent =
    "Welcome to Pablo's Pizza. Papa Pablo is a world-renowned Italian chef.  However, his pizzeria has been attacked by pineapples seeking to contaminate his pizza. He needs your help, and so you must click on the pineapples to yeet them out the pizzeria.";
}

function pineappleTutorialClicked() {
  console.log("pineappleTutorialClicked");

  this.firstElementChild.classList.add("hit_right");

  //Fjern clickability
  this.removeEventListener("click", pineappleTutorialClicked);
  this.removeEventListener("animationend", pineappleTutorial);

  //Afspil lyd
  document.querySelector("#splat").currentTime = 0;
  document.querySelector("#splat").play();

  //Få 1 point
  points++;
  console.log("points = " + points);

  //Vis point
  document.querySelector("#score").textContent = points;

  //Highlight scoreboard
  document.querySelector("#score_board").classList.add("highlight");
}

function scoreTutorial() {
  console.log("scoreTutorial");
  document.querySelector("#button").play();

  //Tilføj og fjern animationer
  document.querySelector("#time_sprite").classList.remove("time");
  document
    .querySelector("#time_sprite")
    .removeEventListener("animationend", endGame);

  //Highlight timeboard
  document.querySelector("#score_board").classList.add("highlight");
  document.querySelector("#time_board").classList.remove("highlight");

  //Tutorial text
  document.querySelector("#tutorial_text").textContent =
    "The score board top left displays your current score which is the amount of pineapples you have yoten out the pizzeria. You must destroy at least 20 pineapples to save Pablo's Pizza.";

  //Knapper
  document.querySelector("#next_button2").classList.add("hidden");
  document.querySelector("#next_button1").classList.remove("hidden");
  document
    .querySelector("#next_button1")
    .addEventListener("click", timeTutorial);
  document.querySelector("#previous_button2").classList.add("hidden");
  document.querySelector("#previous_button1").classList.remove("hidden");
  document
    .querySelector("#previous_button1")
    .addEventListener("click", startTutorial);
}

function timeTutorial() {
  console.log("timeTutorial");
  document.querySelector("#button").play();

  //Tilføj og fjern animationer
  document.querySelector("#time_sprite").classList.add("time");
  document.querySelector("#life3").classList.remove("life_lost");
  document
    .querySelector("#time_sprite")
    .removeEventListener("animationend", endGame);

  //Highlight timeboard
  document.querySelector("#score_board").classList.remove("highlight");
  document.querySelector("#time_board").classList.add("highlight");
  document.querySelector("#life_board").classList.remove("highlight");

  //Tutorial text
  document.querySelector("#tutorial_text").textContent =
    "The long bar in the middle of the top of the screen is the timer. When the time runs out the pineapple assault is over and we will see if you were succesful or not.";

  //Knapper
  document.querySelector("#next_button1").classList.add("hidden");
  document.querySelector("#next_button2").classList.remove("hidden");
  document
    .querySelector("#next_button2")
    .addEventListener("click", lifeTutorial);
  document.querySelector("#home_button2").classList.add("hidden");
  document.querySelector("#previous_button3").classList.add("hidden");
  document.querySelector("#previous_button1").classList.add("hidden");
  document.querySelector("#previous_button2").classList.remove("hidden");
  document
    .querySelector("#previous_button2")
    .addEventListener("click", scoreTutorial);
}

function lifeTutorial() {
  console.log("lifeTutorial");
  document.querySelector("#button").play();

  //Tilføj og fjern animationer
  document.querySelector("#time_sprite").classList.remove("time");
  document.querySelector("#life3").classList.add("life_lost");

  //Highlight timeboard
  document.querySelector("#time_board").classList.remove("highlight");
  document.querySelector("#life_board").classList.add("highlight");

  //Tutorial text
  document.querySelector("#tutorial_text").textContent =
    "In the top right part of the screen you find your lives. Letting a pineapple through or clicking on an acceptable ingredient will cost a life. Pablo will save you 3 times, but after that losing a life means losing the game.";

  //Knapper
  document.querySelector("#next_button2").classList.add("hidden");
  document.querySelector("#home_button2").classList.remove("hidden");
  document.querySelector("#home_button2").addEventListener("click", home);
  document.querySelector("#previous_button2").classList.add("hidden");
  document.querySelector("#previous_button3").classList.remove("hidden");
  document
    .querySelector("#previous_button3")
    .addEventListener("click", timeTutorial);
}
