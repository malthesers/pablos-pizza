window.addEventListener("load", () => {
  console.log("trophiesEnabled");

  //Add EventListeners for box
  document
    .querySelector("#trophies_button")
    .addEventListener("click", openTrophies);

  if (localStorage.getItem("trophyTutorial") == "unlocked") {
    trophyTutorialUnlocked();
  }

  if (localStorage.getItem("trophyStandard") == "unlocked") {
    trophyStandardUnlocked();
  }

  if (localStorage.getItem("trophyPerfect") == "unlocked") {
    trophyPerfectUnlocked();
  }

  if (localStorage.getItem("trophyAssassin") == "unlocked") {
    trophyAssassinUnlocked();
  }
});

let trophyTutorial;
let trophyStandard;
let trophyPerfect;
let trophyAssassin;

function openTrophies() {
  console.log("openTrophies");

  //Display trophies
  document.querySelector("#trophies").classList.remove("hidden");
  document.querySelector("#shadow").style.cursor = "pointer";
  document.querySelector("#shadow").addEventListener("click", closeTrophies);
}

function closeTrophies() {
  console.log("closeTrophies");

  //Undisplay trophies
  document.querySelector("#trophies").classList.add("hidden");
  document.querySelector("#shadow").style.cursor = "auto";
  document.querySelector("#shadow").removeEventListener("click", closeTrophies);
}

function trophyTutorialUnlocked() {
  if (trophyTutorial != "unlocked") {
    console.log("trophyTutorialUnlocked");

    localStorage.setItem("trophyTutorial", "unlocked");

    //Unlock trophy and reward
    document.querySelector("#trophy_tutorial").classList.remove("locked");
    document.querySelector("#standard_button").classList.remove("locked");
  }
}

function trophyStandardUnlocked() {
  if (trophyStandard != "unlocked") {
    console.log("trophyStandardUnlocked");

    localStorage.setItem("trophyStandard", "unlocked");

    //Unlock trophy and reward
    document.querySelector("#trophy_standard").classList.remove("locked");
    document.querySelector("#unlimited_button").classList.remove("locked");
  }
}

function trophyPerfectUnlocked() {
  if (trophyPerfect != "unlocked") {
    console.log("trophyPerfectUnlocked");

    localStorage.setItem("trophyPerfect", "unlocked");

    //Unlock trophy and reward
    document.querySelector("#trophy_perfect").classList.remove("locked");
    document.querySelector("#theme_pineapple").classList.remove("locked");
  }
}

function trophyAssassinUnlocked() {
  if (trophyAssassin != "unlocked") {
    console.log("trophyAssassinUnlocked");

    localStorage.setItem("trophyAssassin", "unlocked");

    //Unlock trophy
    document.querySelector("#trophy_assassin").classList.remove("locked");
  }
}
