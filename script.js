const subHolders = [
  "Top-seen web design pages.",
  "Forging and working with elite designers",
  "Take action, don't wait for the moment",
  "Make your wish pretty",
];
const items = document.querySelectorAll("#item-1, #item-2, #item-3, #item-4");
const placeholder = document.querySelector(".placeholder");
const subholder = document.querySelector("#subholder");

function changeColors() {
  gsap.to(".container", { backgroundColor: "#000", duration: 0.5 });
  gsap.to(".placeholder, nav, footer, p", { color: "#fff", duration: 0.5 });
}
function revertColors() {
  gsap.to(".container", { backgroundColor: "#e3e3e3", duration: 0.5 });
  gsap.to(".placeholder, nav, footer, p", { color: "#000", duration: 0.5 });
}

items.forEach((item) => {
  item.addEventListener("mouseover", changeColors);
  item.addEventListener("mouseout", revertColors);
});

function animateScale(element, scaleValue) {
  gsap.fromTo(
    element,
    { scale: 1 },
    { scale: scaleValue, duration: 2, ease: "power1.out" }
  );
}
function wrapWord(text) {
  placeholder.innerHTML = "";
  [...text].forEach((letter) => {
    const span = document.createElement("span");
    span.style.filter = "blur(8px)";
    span.textContent = letter;
    placeholder.appendChild(span);
  });
}
function animateBlurEffect() {
  const letters = placeholder.children;
  let index = 0;

  function clearNextLetters() {
    if (index < letters.length) {
      gsap.to(letters[index], { filter: "blur(0px)", duration: 0.5 });
      index++;
      if (index < letters.length) {
        setTimeout(clearNextLetters, 100);
      }
    }
  }
  setTimeout(clearNextLetters, 0);
}
function shuffleLetters(finalText) {
  wrapLetters("");
  wrapLetters(finalText.replace(/./g, " "));

  let textArray = finalText.split("");
  let shufflingCounter = 0;
  let intervalHandles = [];

  function shuffle(index) {
    if (shufflingCounter < 30) {
      textArray[index] = "ABCDEFGHIJKLMNOPQRSTUVWXZY"[
        Math.floor(Math.random() * 26)
      ];
      placeholder.children[index].textContent = textArray[index];
    } else {
      placeholder.children[index].textContent = finalText.charAt(index);
      clearInterval(intervalHandles[index]);
    }
  }
  for (let i = 0; i < finalText.length; i++) {
    intervalHandles[i] = setInterval(shuffle, 80, i);
  }
  setTimeout(() => {
    shufflingCounter = 50;
    for (let i = 0; i < finalText.length; i++) {
      placeholder.children[i].textContent = finalText.charAt(i);
      clearInterval(intervalHandles[i]);
    }
    animateBlurEffect();
  }, 1000);
}

function updatePlaceHolderText(event) {
  const newText = event.target.textContent.toUpperCase();
  const itemIndex = Array.from(items).indexOf(event.target);
  const newSubholderText = subHolders[itemIndex].toUpperCase();

  subholder.textContent = newSubholderText;
  animateScale(placeholder, 1.25);
  shuffleLetters(newText);
}
function resetPlaceholderText() {
  const defaultText = "MODERN";
  const defaultSubholderText = "OUR INOVATION. ENDLESSLY CREATING";

  subholder.textContent = defaultSubholderText;
  animateScale(placeholder, 1.25);
  shuffleLetters(defaultText);
}
items.forEach((item) => {
  item.addEventListener("mouseover", updatePlaceHolderText);
  item.addEventListener("mouseout", resetPlaceholderText);
});
