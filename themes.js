window.addEventListener("load", () => {
  console.log("themesEnabled");

  //Add EventListeners for box
  document
    .querySelector("#themes_button")
    .addEventListener("click", openThemes);
  document
    .querySelector("#home_button_themes")
    .addEventListener("click", closeThemes);

  //Add EventListeners for themes
  document
    .querySelector("#theme_classic")
    .addEventListener("click", classicTheme);
  document
    .querySelector("#theme_pineapple")
    .addEventListener("click", pineappleTheme);
  document
    .querySelector("#theme_azzurri")
    .addEventListener("click", azzurriTheme);

  //Use locally stored theme
  let currentTheme = localStorage.getItem("currentTheme");
  if (currentTheme == "azzurriTheme") {
    azzurriTheme();
  } else if (currentTheme == "pineappleTheme") {
    pineappleTheme();
  } else {
    classicTheme();
  }

  document.querySelectorAll(".theme").forEach((theme) => {
    theme.addEventListener("click", reverseThemes);
  });
});

function reverseThemes() {
  if (currentTheme != "pineappleTheme") {
    document.querySelector("#tomato_sprite").src =
      "themes/classicTheme/assets/svg/characters/Tomato.svg";
    document.querySelector("#shroom_sprite").src =
      "themes/classicTheme/assets/svg/characters/Mushroom.svg";
    document.querySelector("#olives_sprite").src =
      "themes/classicTheme/assets/svg/characters/Olives.svg";
    document.querySelector("#onion_sprite").src =
      "themes/classicTheme/assets/svg/characters/Onion.svg";
  }
}

function openThemes() {
  console.log("openThemes");

  //Display themes
  document.querySelector("#themes").classList.remove("hidden");
  document.querySelector("#shadow").classList.remove("hidden");
  document.querySelector("#shadow").style.cursor = "pointer";
  document.querySelector("#shadow").addEventListener("click", closeThemes);
}

function closeThemes() {
  console.log("closeThemes");

  //Undisplay themes
  document.querySelector("#themes").classList.add("hidden");
  document.querySelector("#shadow").classList.add("hidden");
  document.querySelector("#shadow").style.cursor = "auto";
  document.querySelector("#shadow").removeEventListener("click", closeThemes);
}

function classicTheme() {
  previousTheme = currentTheme;
  currentTheme = "classicTheme";

  localStorage.setItem("currentTheme", "classicTheme");

  //Show selection
  document.querySelectorAll(".selector").forEach((selector) => {
    selector.classList.remove("selected");
  });
  document
    .querySelector("#theme_classic")
    .lastElementChild.lastElementChild.classList.add("selected");

  //Change img sources
  document.querySelectorAll("img").forEach((image) => {
    image.src = image.src.replace(previousTheme, currentTheme);
  });

  document
    .querySelectorAll('div[style*="background-image:"]')
    .forEach((image) => {
      image.style.backgroundImage = image.style.backgroundImage.replace(
        previousTheme,
        currentTheme
      );
    });
}

function pineappleTheme() {
  previousTheme = currentTheme;
  currentTheme = "pineappleTheme";

  localStorage.setItem("currentTheme", "pineappleTheme");

  //Show selection
  document.querySelectorAll(".selector").forEach((selector) => {
    selector.classList.remove("selected");
  });
  document
    .querySelector("#theme_pineapple")
    .lastElementChild.lastElementChild.classList.add("selected");

  //Change img sources
  document.querySelectorAll(".container img").forEach((image) => {
    image.src = "themes/classicTheme/assets/svg/characters/Pineapple.svg";
  });
}

function azzurriTheme() {
  previousTheme = currentTheme;
  currentTheme = "azzurriTheme";

  localStorage.setItem("currentTheme", "azzurriTheme");

  //Show selection
  document.querySelectorAll(".selector").forEach((selector) => {
    selector.classList.remove("selected");
  });
  document
    .querySelector("#theme_azzurri")
    .lastElementChild.lastElementChild.classList.add("selected");

  //Change img sources
  document.querySelectorAll("img").forEach((image) => {
    image.src = image.src.replace(previousTheme, currentTheme);
  });

  document
    .querySelectorAll('div[style*="background-image:"]')
    .forEach((image) => {
      image.style.backgroundImage = image.style.backgroundImage.replace(
        previousTheme,
        currentTheme
      );
    });
}
