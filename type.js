const typedTextSpan = document.querySelector(".typed-text");
const cursorSpan = document.querySelector(".cursor");


const textArray = ["a student 🎓", "a software developer 🧙", "a Python lover 🐍", "a Java lover ☕️", "🤠 a data wrangler 🐎🐄🐂", "a chess enjoyer ♘", "NP-complete", "a dynamic programmer", "a cat lover 🐱", "a reducer in polynomial time 📉🕑", "DAG navigator 🗺️", "Rudrata cyclist 🚴‍♂️", "neural network whisperer 🤫🧠"];
const typingDelay = 40;
const erasingDelay = 40;
const newTextDelay = 800; // Delay between current and next text
let textArrayIndex = 0;
let charIndex = 0;

function type() {
  if (charIndex < Array.from(textArray[textArrayIndex]).length) {
    if (!cursorSpan.classList.contains("typing"))
      cursorSpan.classList.add("typing");
    typedTextSpan.textContent += Array.from(textArray[textArrayIndex])[charIndex];
    charIndex++;
    setTimeout(type, typingDelay);
  } else {
    cursorSpan.classList.remove("typing");
    setTimeout(erase, newTextDelay);
  }
}

function erase() {
  if (charIndex > 0) {
    if (!cursorSpan.classList.contains("typing"))
      cursorSpan.classList.add("typing");
    typedTextSpan.textContent = Array.from(textArray[textArrayIndex]).slice(
      0,
      charIndex - 1
    ).join('');
    charIndex--;
    setTimeout(erase, erasingDelay);
  } else {
    cursorSpan.classList.remove("typing");
    textArrayIndex++;
    if (textArrayIndex >= textArray.length) textArrayIndex = 0;
    setTimeout(type, typingDelay + 1100);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // On DOM Load initiate the effect
  if (textArray.length) setTimeout(type, newTextDelay + 250);
});
