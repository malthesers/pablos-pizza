window.addEventListener("load", startScreen);

let points;
let life;
let screen = document.querySelector("#screen");

let gameMode;
let currentTheme = "classic_theme";

const left = [
  "pos0",
  "pos1",
  "pos2",
  "pos3",
  "pos4",
  "pos5",
  "pos6",
  "pos7",
  "pos8",
];

//UI arrays for forEach loops
const containers = [
  "#pineapple1_container",
  "#pineapple2_container",
  "#pineapple3_container",
  "#tomato_container",
  "#shroom_container",
  "#onion_container",
  "#olives_container",
];
const sprites = [
  "#pineapple1_sprite",
  "#pineapple2_sprite",
  "#pineapple3_sprite",
  "#tomato_sprite",
  "#shroom_sprite",
  "#onion_sprite",
  "#olives_sprite",
];
const elements = [
  "pineapple1",
  "pineapple2",
  "pineapple3",
  "tomato",
  "shroom",
  "onion",
  "olives",
];
const lives = ["#life1", "#life2", "#life3"];
const music = ["#button", "#splat", "#death", "#music"];

//Booleans for toggling
let sound = false;
let fullscreen = false;

function startScreen() {
  console.log("startScreen");

  //Add button EventListeners
  document.querySelector("#start_button").addEventListener("click", startGame);
  document
    .querySelector("#fullscreen_button")
    .addEventListener("click", toggleFullscreen);
  document
    .querySelector("#sound_button")
    .addEventListener("click", toggleSound);
  document
    .querySelector("#standard_button")
    .addEventListener("click", startStandard);
  document
    .querySelector("#unlimited_button")
    .addEventListener("click", startUnlimited);

  //Mute sound
  music.forEach((sound) => {
    document.querySelector(sound).volume = 0;
  });

  //Add button sound effect to all buttons
  document.querySelectorAll(".button").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelector("#button").play();
    });
  });
}

function toggleFullscreen() {
  console.log("toggleFullscreen");

  //Toggle boolean for fullscreen
  fullscreen = !fullscreen;

  if (fullscreen == true) {
    //Change icon
    document.querySelector(
      "#fullscreen_button"
    ).src = `themes/${currentTheme}/assets/svg/ui/buttons/Fullscreen_off.svg`;

    //Enter fullscreen
    screen.requestFullscreen();
  } else if (fullscreen == false) {
    //Change icon
    document.querySelector(
      "#fullscreen_button"
    ).src = `themes/${currentTheme}/assets/svg/ui/buttons/Fullscreen_on.svg`;

    //Exit fullscreen
    document.exitFullscreen();
  }
}

function toggleSound() {
  console.log("toggleSound");

  //Toggle boolean for sound
  sound = !sound;

  if (sound == true) {
    //Change icon
    document.querySelector(
      "#sound_button"
    ).src = `themes/${currentTheme}/assets/svg/ui/buttons/Sound_off.svg`;

    //Set all sound volumes to 1
    music.forEach((sound) => {
      document.querySelector(sound).volume = 1;
    });

    //Play background
    document.querySelector("#music").play();
    document.querySelector("#music").loop = true;
  } else if (sound == false) {
    //Change icon
    document.querySelector(
      "#sound_button"
    ).src = `themes/${currentTheme}/assets/svg/ui/buttons/Sound_on.svg`;

    //Set all sound volumes to 0
    music.forEach((sound) => {
      document.querySelector(sound).volume = 0;
    });
  }
}

function home() {
  //Button sound
  document.querySelector("#button").play();

  //Show start
  document.querySelector("#start").classList.remove("hidden");
  document.querySelector("#game_background").classList.add("hidden");

  //Remove classes from containers and sprites
  document.querySelector("#time_sprite").classList = " ";
  containers.forEach((container) => {
    document.querySelector(container).classList = "container";
  });
  sprites.forEach((sprite) => {
    document.querySelector(sprite).classList = " ";
  });

  //Fjern EventListeners
  document
    .querySelector("#pineapple1_container")
    .removeEventListener("mousedown", pineappleClicked);
  document
    .querySelector("#pineapple2_container")
    .removeEventListener("mousedown", pineappleClicked);
  document
    .querySelector("#pineapple3_container")
    .removeEventListener("mousedown", pineappleClicked);
  document
    .querySelector("#tomato_container")
    .removeEventListener("mousedown", tomatoClicked);
  document
    .querySelector("#shroom_container")
    .removeEventListener("mousedown", shroomClicked);
  document
    .querySelector("#onion_container")
    .removeEventListener("mousedown", onionClicked);
  document
    .querySelector("#olives_container")
    .removeEventListener("mousedown", olivesClicked);
  document
    .querySelector("#pineapple1_container")
    .removeEventListener("animationend", pineappleFallRestart);
  document
    .querySelector("#pineapple2_container")
    .removeEventListener("animationend", pineappleFallRestart);
  document
    .querySelector("#pineapple3_container")
    .removeEventListener("animationend", pineappleFallRestart);
  document
    .querySelector("#tomato_container")
    .removeEventListener("animationend", tomatoFallRestart);
  document
    .querySelector("#onion_container")
    .removeEventListener("animationend", onionFallRestart);
  document
    .querySelector("#olives_container")
    .removeEventListener("animationend", olivesFallRestart);
  document
    .querySelector("#shroom_container")
    .removeEventListener("animationend", shroomFallRestart);

  document
    .querySelector("#time_sprite")
    .removeEventListener("animtionend", endGame);

  document
    .querySelector("#restart_button")
    .removeEventListener("click", startStandard);
  document
    .querySelector("#restart_button")
    .removeEventListener("click", startUnlimited);

  //Fjern skærme og andre elementer
  document.querySelector("#shadow").classList.add("hidden");
  document.querySelector("#board").classList.add("hidden");
  document.querySelector("#previous_button3").classList.add("hidden");
  document.querySelector("#home_button2").classList.add("hidden");
  document.querySelector("#life_board").classList.remove("highlight");

  //Genstart musik
  document.querySelector("#death").currentTime = 0;
  document.querySelector("#death").pause();
  document.querySelector("#music").play();

  //Unlock tutorial trophy if locked
  trophyTutorialUnlocked();
}

function startGame() {
  console.log("startGame");
  document.querySelector("#button").play();

  //Hide screens
  document.querySelector("#start").classList.add("hidden");
  document.querySelector("#level_complete").classList.add("hidden");
  document.querySelector("#game_over").classList.add("hidden");
  document.querySelector("#game_menu").classList.remove("hidden");
  document.querySelector("#shadow").classList.remove("hidden");

  //Hide buttons
  document.querySelector("#restart_button").classList.add("hidden");
  document.querySelector("#home_button").classList.add("hidden");

  document.querySelector("#home_button_menu").addEventListener("click", () => {
    console.log("homeScreen");
    document.querySelector("#button").play();

    //Change screens
    document.querySelector("#start").classList.remove("hidden");
    document.querySelector("#level_complete").classList.remove("hidden");
    document.querySelector("#game_over").classList.remove("hidden");
    document.querySelector("#game_menu").classList.add("hidden");
    document.querySelector("#trophies").classList.add("hidden");
    document.querySelector("#shadow").classList.add("hidden");

    //Showremove buttons
    document.querySelector("#restart_button").classList.remove("hidden");
    document.querySelector("#home_button").classList.remove("hidden");
  });
}

function startStandard() {
  console.log("startStandard");
  document.querySelector("#button").play();

  //Set gameMode
  gameMode == "standard";

  //Reset sound
  document.querySelector("#death").currentTime = 0;
  document.querySelector("#death").pause();
  document.querySelector("#music").play();

  //Change screen
  document.querySelector("#start").classList.add("hidden");
  document.querySelector("#game_over").classList.add("hidden");
  document.querySelector("#level_complete").classList.add("hidden");
  document.querySelector("#game_background").classList.remove("hidden");
  document.querySelector("#game_menu").classList.add("hidden");
  document.querySelector("#shadow").classList.add("hidden");
  document.querySelector("#time_board").classList.remove("hidden");

  //Hide buttons
  document.querySelector("#restart_button").classList.add("hidden");
  document.querySelector("#home_button").classList.add("hidden");

  //Reset points, time and lives
  points = 0;
  life = 3;

  lives.forEach((life) => {
    document.querySelector(life).classList = " ";
  });

  document.querySelector("#score").textContent = points;
  document.querySelector("#time_sprite").classList = " ";
  document.querySelector("#time_sprite").offsetHeight;
  document.querySelector("#time_sprite").classList.add("time");
  document
    .querySelector("#time_sprite")
    .removeEventListener("animationend", endGame);
  document.querySelector("#time_sprite").offsetHeight;
  document
    .querySelector("#time_sprite")
    .addEventListener("animationend", endGame);

  //EventListeners til knapper
  document
    .querySelector("#restart_button")
    .addEventListener("click", startStandard);
  document.querySelector("#home_button").addEventListener("click", home);

  //Delay, position og fald
  document.querySelector(
    "#pineapple1_container"
  ).classList = `container fallspeed_2 pos${Math.floor(
    Math.random() * 18
  )} delay${Math.floor(Math.random() * 4)}`;
  document.querySelector(
    "#pineapple2_container"
  ).classList = `container fallspeed_2 pos${Math.floor(
    Math.random() * 18
  )} delay${Math.floor(Math.random() * 4)}`;
  document.querySelector(
    "#pineapple3_container"
  ).classList = `container fallspeed_2 pos${Math.floor(
    Math.random() * 18
  )} delay${Math.floor(Math.random() * 4)}`;
  document.querySelector(
    "#tomato_container"
  ).classList = `container fallspeed_3 pos${Math.floor(
    Math.random() * 18
  )} delay${Math.floor(Math.random() * 4)}`;
  document.querySelector(
    "#shroom_container"
  ).classList = `container fallspeed_1 pos${Math.floor(
    Math.random() * 18
  )} delay${Math.floor(Math.random() * 4)}`;
  document.querySelector(
    "#onion_container"
  ).classList = `container fallspeed_3 pos${Math.floor(
    Math.random() * 18
  )} delay${Math.floor(Math.random() * 4)}`;
  document.querySelector(
    "#olives_container"
  ).classList = `container fallspeed_1 pos${Math.floor(
    Math.random() * 18
  )} delay${Math.floor(Math.random() * 4)}`;

  //Klikfunktioner
  document
    .querySelector("#pineapple1_container")
    .addEventListener("mousedown", pineappleClicked);
  document
    .querySelector("#pineapple2_container")
    .addEventListener("mousedown", pineappleClicked);
  document
    .querySelector("#pineapple3_container")
    .addEventListener("mousedown", pineappleClicked);
  document
    .querySelector("#tomato_container")
    .addEventListener("mousedown", tomatoClicked);
  document
    .querySelector("#shroom_container")
    .addEventListener("mousedown", shroomClicked);
  document
    .querySelector("#onion_container")
    .addEventListener("mousedown", onionClicked);
  document
    .querySelector("#olives_container")
    .addEventListener("mousedown", olivesClicked);

  //Færdigfaldfunktioner
  document
    .querySelector("#pineapple1_container")
    .addEventListener("animationend", pineappleFallRestart);
  document
    .querySelector("#pineapple2_container")
    .addEventListener("animationend", pineappleFallRestart);
  document
    .querySelector("#pineapple3_container")
    .addEventListener("animationend", pineappleFallRestart);
  document
    .querySelector("#tomato_container")
    .addEventListener("animationend", tomatoFallRestart);
  document
    .querySelector("#onion_container")
    .addEventListener("animationend", onionFallRestart);
  document
    .querySelector("#olives_container")
    .addEventListener("animationend", olivesFallRestart);
  document
    .querySelector("#shroom_container")
    .addEventListener("animationend", shroomFallRestart);
}

function startUnlimited() {
  console.log("startUnlimited");
  document.querySelector("#button").play();

  //Set gameMode
  gameMode == "unlimited";

  //Reset sound
  document.querySelector("#death").currentTime = 0;
  document.querySelector("#death").pause();
  document.querySelector("#music").play();

  //Change screen
  document.querySelector("#start").classList.add("hidden");
  document.querySelector("#game_over").classList.add("hidden");
  document.querySelector("#level_complete").classList.add("hidden");
  document.querySelector("#game_background").classList.remove("hidden");
  document.querySelector("#game_menu").classList.add("hidden");
  document.querySelector("#shadow").classList.add("hidden");
  document.querySelector("#time_board").classList.add("hidden");

  //Hide buttons
  document.querySelector("#restart_button").classList.add("hidden");
  document.querySelector("#home_button").classList.add("hidden");

  //Reset points, time and lives
  points = 0;
  life = 3;

  lives.forEach((life) => {
    document.querySelector(life).classList = " ";
  });

  document.querySelector("#score").textContent = points;

  //EventListeners til knapper
  document
    .querySelector("#restart_button")
    .addEventListener("click", startUnlimited);
  document.querySelector("#home_button").addEventListener("click", home);

  //Delay, position og fald
  document.querySelector(
    "#pineapple1_container"
  ).classList = `container fallspeed_2 pos${Math.floor(
    Math.random() * 18
  )} delay${Math.floor(Math.random() * 4)}`;
  document.querySelector(
    "#pineapple2_container"
  ).classList = `container fallspeed_2 pos${Math.floor(
    Math.random() * 18
  )} delay${Math.floor(Math.random() * 4)}`;
  document.querySelector(
    "#pineapple3_container"
  ).classList = `container fallspeed_2 pos${Math.floor(
    Math.random() * 18
  )} delay${Math.floor(Math.random() * 4)}`;
  document.querySelector(
    "#tomato_container"
  ).classList = `container fallspeed_3 pos${Math.floor(
    Math.random() * 18
  )} delay${Math.floor(Math.random() * 4)}`;
  document.querySelector(
    "#shroom_container"
  ).classList = `container fallspeed_1 pos${Math.floor(
    Math.random() * 18
  )} delay${Math.floor(Math.random() * 4)}`;
  document.querySelector(
    "#onion_container"
  ).classList = `container fallspeed_3 pos${Math.floor(
    Math.random() * 18
  )} delay${Math.floor(Math.random() * 4)}`;
  document.querySelector(
    "#olives_container"
  ).classList = `container fallspeed_1 pos${Math.floor(
    Math.random() * 18
  )} delay${Math.floor(Math.random() * 4)}`;

  //Klikfunktioner
  document
    .querySelector("#pineapple1_container")
    .addEventListener("mousedown", pineappleClicked);
  document
    .querySelector("#pineapple2_container")
    .addEventListener("mousedown", pineappleClicked);
  document
    .querySelector("#pineapple3_container")
    .addEventListener("mousedown", pineappleClicked);
  document
    .querySelector("#tomato_container")
    .addEventListener("mousedown", tomatoClicked);
  document
    .querySelector("#shroom_container")
    .addEventListener("mousedown", shroomClicked);
  document
    .querySelector("#onion_container")
    .addEventListener("mousedown", onionClicked);
  document
    .querySelector("#olives_container")
    .addEventListener("mousedown", olivesClicked);

  //Færdigfaldfunktioner
  document
    .querySelector("#pineapple1_container")
    .addEventListener("animationend", pineappleFallRestart);
  document
    .querySelector("#pineapple2_container")
    .addEventListener("animationend", pineappleFallRestart);
  document
    .querySelector("#pineapple3_container")
    .addEventListener("animationend", pineappleFallRestart);
  document
    .querySelector("#tomato_container")
    .addEventListener("animationend", tomatoFallRestart);
  document
    .querySelector("#onion_container")
    .addEventListener("animationend", onionFallRestart);
  document
    .querySelector("#olives_container")
    .addEventListener("animationend", olivesFallRestart);
  document
    .querySelector("#shroom_container")
    .addEventListener("animationend", shroomFallRestart);
}

function pineappleClicked() {
  console.log("pineappleClicked");

  //Fjern clickability
  this.removeEventListener("mousedown", pineappleClicked);

  //Start clicked-animationer
  this.classList.add("pause");
  if (left.some((className) => this.classList.contains(className))) {
    this.firstElementChild.classList.add("hit_left");
  } else {
    this.firstElementChild.classList.add("hit_right");
  }

  //Afspil lyd
  document.querySelector("#splat").currentTime = 0;
  document.querySelector("#splat").play();

  //Få 1 point
  points++;

  //Vis point
  document.querySelector("#score").textContent = points;

  //Genstart
  this.firstElementChild.addEventListener(
    "animationend",
    pineappleClickRestart
  );
}

function pineappleClickRestart(pineappleEvent) {
  pineappleEvent.stopPropagation();

  console.log("pineappleClickRestart");

  //Tilføj clickability
  this.parentElement.addEventListener("mousedown", pineappleClicked);

  //Fjern eksisterende klasser
  this.classList = " ";

  //Genstart ananas
  posRNG = Math.floor(Math.random() * 18);
  delRNG = Math.floor(Math.random() * 5);
  this.parentElement.classList = `container pos${posRNG} del${delRNG}`;
  this.parentElement.offsetHeight;
  this.parentElement.classList.add("fallspeed_2");
}

function pineappleFallRestart() {
  console.log("pineappleFallRestart");

  //Genstart ananas
  posRNG = Math.floor(Math.random() * 18);
  delRNG = Math.floor(Math.random() * 5);
  this.classList = `container pos${posRNG} del${delRNG}`;
  this.offsetHeight;
  this.classList.add("fallspeed_2");

  //Lose 1 life
  life--;
  if (document.querySelector("#life2").classList.contains("life_lost")) {
    document.querySelector("#life1").classList.add("life_lost");
  } else if (document.querySelector("#life3").classList.contains("life_lost")) {
    document.querySelector("#life2").classList.add("life_lost");
  } else {
    document.querySelector("#life3").classList.add("life_lost");
  }

  //Check life
  if (life < 0) {
    endGame();
  }
}

function otherClicked() {
  console.log("otherClicked");

  //Remove clickability
  this.removeEventListener("mousedown", otherClicked);

  //Start click-animations
  this.classList.add("pause");
  if (left.some((position) => this.classList.contains(position))) {
    this.firstElementChild.classList.add("hit_left");
  } else {
    this.firstElementChild.classList.add("hit_right");
  }

  //Play sound
  document.querySelector("#splat").currentTime = 0;
  document.querySelector("#splat").play();

  //Remove life
  life--;
  if (document.querySelector("#life2").classList.contains("life_lost")) {
    document.querySelector("#life1").classList.add("life_lost");
  } else if (document.querySelector("#life3").classList.contains("life_lost")) {
    document.querySelector("#life2").classList.add("life_lost");
  } else {
    document.querySelector("#life3").classList.add("life_lost");
  }

  //Check life
  if (life < 0) {
    endGame();
  }

  //Restart
  this.firstElementChild.addEventListener("animationend", otherClickRestart);
}

function otherClickRestart(otherEvent) {
  console.log("otherClickRestart");

  otherEvent.stopPropagation();

  //Tilføj clickability
  this.parentElement.addEventListener("mousedown", otherClicked);

  //Fjern sprite-klasser
  this.classList = " ";

  //Genstart tomat
  posRNG = Math.floor(Math.random() * 18);
  delRNG = Math.floor(Math.random() * 5);
  this.parentElement.classList = `container pos${posRNG} del${delRNG}`;
  this.parentElement.offsetHeight;
  this.parentElement.classList.add(
    `fallspeed_${this.parentElement.dataset.fall}`
  );
}

function tomatoClicked() {
  console.log("tomatoClicked");

  //Fjern clickability
  this.removeEventListener("mousedown", tomatoClicked);

  //Start clicked-animationer
  this.classList.add("pause");
  if (left.some((className) => this.classList.contains(className))) {
    this.firstElementChild.classList.add("hit_left");
  } else {
    this.firstElementChild.classList.add("hit_right");
  }

  //Afspil lyd
  document.querySelector("#splat").currentTime = 0;
  document.querySelector("#splat").play();

  //Mist 1 liv
  life--;

  //Fjern liv
  if (document.querySelector("#life2").classList.contains("life_lost")) {
    document.querySelector("#life1").classList.add("life_lost");
  } else if (document.querySelector("#life3").classList.contains("life_lost")) {
    document.querySelector("#life2").classList.add("life_lost");
  } else {
    document.querySelector("#life3").classList.add("life_lost");
  }

  //Check liv
  if (life < 0) {
    endGame();
  }

  //Genstart
  this.firstElementChild.addEventListener("animationend", tomatoClickRestart);
}

function tomatoClickRestart(tomatoEvent) {
  console.log("tomatoClickRestart");

  tomatoEvent.stopPropagation();

  //Tilføj clickability
  this.parentElement.addEventListener("mousedown", tomatoClicked);

  //Fjern sprite-klasser
  this.classList = " ";

  //Genstart tomat
  posRNG = Math.floor(Math.random() * 18);
  delRNG = Math.floor(Math.random() * 5);
  this.parentElement.classList = `container pos${posRNG} del${delRNG}`;
  this.parentElement.offsetHeight;
  this.parentElement.classList.add("fallspeed_3");
}

function tomatoFallRestart() {
  console.log("tomatoFallRestart");

  //Genstart tomat
  posRNG = Math.floor(Math.random() * 18);
  delRNG = Math.floor(Math.random() * 5);
  this.classList = `container pos${posRNG} del${delRNG}`;
  this.offsetHeight;
  this.classList.add("fallspeed_3");
}

function onionClicked() {
  console.log("onionClicked");

  //Fjern clickability
  this.removeEventListener("mousedown", onionClicked);

  //Start clicked-animationer
  this.classList.add("pause");
  if (left.some((className) => this.classList.contains(className))) {
    this.firstElementChild.classList.add("hit_left");
  } else {
    this.firstElementChild.classList.add("hit_right");
  }

  //Afspil lyd
  document.querySelector("#splat").currentTime = 0;
  document.querySelector("#splat").play();

  //Mist 1 liv
  life--;

  //Fjern liv
  if (document.querySelector("#life2").classList.contains("life_lost")) {
    document.querySelector("#life1").classList.add("life_lost");
  } else if (document.querySelector("#life3").classList.contains("life_lost")) {
    document.querySelector("#life2").classList.add("life_lost");
  } else {
    document.querySelector("#life3").classList.add("life_lost");
  }

  //Check liv
  if (life < 0) {
    endGame();
  }

  //Genstart
  this.firstElementChild.addEventListener("animationend", onionClickRestart);
}

function onionClickRestart(onionEvent) {
  console.log("onionClickRestart");

  onionEvent.stopPropagation();

  //Tilføj clickability
  this.parentElement.addEventListener("mousedown", onionClicked);

  //Fjern sprite-klasser
  this.classList = " ";

  //Genstart løg
  posRNG = Math.floor(Math.random() * 18);
  delRNG = Math.floor(Math.random() * 5);
  this.parentElement.classList = `container pos${posRNG} del${delRNG}`;
  this.parentElement.offsetHeight;
  this.parentElement.classList.add("fallspeed_3");
}

function onionFallRestart() {
  console.log("onionFallRestart");

  //Genstart løg
  posRNG = Math.floor(Math.random() * 18);
  delRNG = Math.floor(Math.random() * 5);
  this.classList = `container pos${posRNG} del${delRNG}`;
  this.offsetHeight;
  this.classList.add("fallspeed_3");
}

function olivesClicked() {
  console.log("olivesClicked");

  //Fjern clickability
  this.removeEventListener("mousedown", olivesClicked);

  //Start clicked-animationer
  this.classList.add("pause");
  if (left.some((className) => this.classList.contains(className))) {
    this.firstElementChild.classList.add("hit_left");
  } else {
    this.firstElementChild.classList.add("hit_right");
  }

  //Afspil lyd
  document.querySelector("#splat").currentTime = 0;
  document.querySelector("#splat").play();

  //Mist 1 liv
  life--;

  //Fjern liv
  if (document.querySelector("#life2").classList.contains("life_lost")) {
    document.querySelector("#life1").classList.add("life_lost");
  } else if (document.querySelector("#life3").classList.contains("life_lost")) {
    document.querySelector("#life2").classList.add("life_lost");
  } else {
    document.querySelector("#life3").classList.add("life_lost");
  }

  //Check liv
  if (life < 0) {
    endGame();
  }
  //Genstart
  this.firstElementChild.addEventListener("animationend", olivesClickRestart);
}

function olivesClickRestart(olivesEvent) {
  console.log("olivesClickRestart");

  olivesEvent.stopPropagation();

  //Tilføj clickability
  this.parentElement.addEventListener("mousedown", olivesClicked);

  //Fjern sprite-klasser
  this.classList = " ";

  //Genstart oliven
  posRNG = Math.floor(Math.random() * 18);
  delRNG = Math.floor(Math.random() * 5);
  this.parentElement.classList = `container pos${posRNG} del${delRNG}`;
  this.parentElement.offsetHeight;
  this.parentElement.classList.add("fallspeed_1");
}

function olivesFallRestart() {
  console.log("olivesFallRestart");

  //Genstart oliven
  posRNG = Math.floor(Math.random() * 18);
  delRNG = Math.floor(Math.random() * 5);
  this.classList = `container pos${posRNG} del${delRNG}`;
  this.offsetHeight;
  this.classList.add("fallspeed_1");
}

function shroomClicked() {
  console.log("shroomClicked");

  //Fjern clickability
  this.removeEventListener("mousedown", shroomClicked);

  //Start clicked-animationer
  this.classList.add("pause");
  if (left.some((className) => this.classList.contains(className))) {
    this.firstElementChild.classList.add("hit_left");
  } else {
    this.firstElementChild.classList.add("hit_right");
  }

  //Afspil lyd
  document.querySelector("#splat").currentTime = 0;
  document.querySelector("#splat").play();

  //Mist 1 liv
  life--;

  //Fjern liv
  if (document.querySelector("#life2").classList.contains("life_lost")) {
    document.querySelector("#life1").classList.add("life_lost");
  } else if (document.querySelector("#life3").classList.contains("life_lost")) {
    document.querySelector("#life2").classList.add("life_lost");
  } else {
    document.querySelector("#life3").classList.add("life_lost");
  }

  //Check liv
  if (life < 0) {
    endGame();
  }

  //Genstart
  this.firstElementChild.addEventListener("animationend", shroomClickRestart);
}

function shroomClickRestart(shroomEvent) {
  console.log("shroomClickRestart");

  shroomEvent.stopPropagation();

  //Tilføj clickability
  this.parentElement.addEventListener("mousedown", shroomClicked);

  //Fjern sprite-klasser
  this.classList = " ";

  //Genstart champignon
  posRNG = Math.floor(Math.random() * 18);
  delRNG = Math.floor(Math.random() * 5);
  this.parentElement.classList = `container pos${posRNG} del${delRNG}`;
  this.parentElement.offsetHeight;
  this.parentElement.classList.add("fallspeed_1");
}

function shroomFallRestart() {
  console.log("shroomFallRestart");

  //Genstart champignon
  posRNG = Math.floor(Math.random() * 18);
  delRNG = Math.floor(Math.random() * 5);
  this.classList = `container pos${posRNG} del${delRNG}`;
  this.offsetHeight;
  this.classList.add("fallspeed_1");
}

function endGame() {
  console.log("endGame");

  //Fjern klasser
  containers.forEach((container) => {
    document.querySelector(container).classList = " ";
  });

  sprites.forEach((sprite) => {
    document.querySelector(sprite).classList = " ";
  });

  document.querySelector("#time_sprite").classList = " ";

  //Fjern EventListeners
  document
    .querySelector("#pineapple1_container")
    .removeEventListener("mousedown", pineappleClicked);
  document
    .querySelector("#pineapple2_container")
    .removeEventListener("mousedown", pineappleClicked);
  document
    .querySelector("#pineapple3_container")
    .removeEventListener("mousedown", pineappleClicked);
  document
    .querySelector("#tomato_container")
    .removeEventListener("mousedown", tomatoClicked);
  document
    .querySelector("#shroom_container")
    .removeEventListener("mousedown", shroomClicked);
  document
    .querySelector("#onion_container")
    .removeEventListener("mousedown", onionClicked);
  document
    .querySelector("#olives_container")
    .removeEventListener("mousedown", olivesClicked);
  document
    .querySelector("#pineapple1_container")
    .removeEventListener("animationend", pineappleFallRestart);
  document
    .querySelector("#pineapple2_container")
    .removeEventListener("animationend", pineappleFallRestart);
  document
    .querySelector("#pineapple3_container")
    .removeEventListener("animationend", pineappleFallRestart);
  document
    .querySelector("#tomato_container")
    .removeEventListener("animationend", tomatoFallRestart);
  document
    .querySelector("#onion_container")
    .removeEventListener("animationend", onionFallRestart);
  document
    .querySelector("#olives_container")
    .removeEventListener("animationend", olivesFallRestart);
  document
    .querySelector("#shroom_container")
    .removeEventListener("animationend", shroomFallRestart);

  document
    .querySelector("#time_sprite")
    .removeEventListener("animtionend", endGame);

  //Outcome
  if (points > 19) {
    levelComplete();
    if (life == 3) {
      trophyPerfectUnlocked();
    }
  } else {
    gameOver();
  }
}

function gameOver() {
  console.log("gameOver");

  //Game over text
  if (points < 1) {
    document.querySelector("#game_over_text").textContent =
      "You didn't stop any pineapples contaminating Pablo's Pizza.";
    document.querySelector("#game_over_text2").textContent =
      "As a result Pablo had to shut down not only his pizzeria but also his passion and life.";
  } else if (points < 2) {
    document.querySelector("#game_over_text").textContent =
      "You only stopped " + points + " pineapple contaminating Pablo's Pizza.";
    document.querySelector("#game_over_text2").textContent =
      "As a result Pablo had to shut down not only his pizzeria but also his passion and life.";
  } else {
    document.querySelector("#game_over_text").textContent =
      "You only stopped " + points + " pineapples contaminating Pablo's Pizza.";
    document.querySelector("#game_over_text2").textContent =
      "As a result Pablo had to shut down not only his pizzeria but also his passion and life.";
  }

  //Play music
  document.querySelector("#music").pause();
  document.querySelector("#death").play();

  //Show screen and buttons
  document.querySelector("#restart_button").classList.remove("hidden");
  document.querySelector("#home_button").classList.remove("hidden");
  document.querySelector("#game_over").classList.remove("hidden");
}

function levelComplete() {
  console.log("levelComplete");

  //Level complete text
  document.querySelector("#level_complete_text").textContent =
    "You stopped a total amount of " + points + " contaminating pineapples!";
  document.querySelector("#level_complete_text2").textContent =
    "Thanks to you, Pablo's Pizza will continue thriving and Pablo's reputation will remain intact.";

  //Show screen and buttons
  document.querySelector("#level_complete").classList.remove("hidden");
  document.querySelector("#home_button").classList.remove("hidden");
  document.querySelector("#restart_button").classList.remove("hidden");

  //Unlock trophy if locked
  trophyStandardUnlocked();
  if (currentTheme == "pineappleTheme") {
    trophyAssassinUnlocked();
  }
}
