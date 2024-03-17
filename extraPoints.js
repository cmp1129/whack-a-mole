const images = [
  "img/cake.png",
  "img/cupcake.png",
  "img/icecream.png",
  "img/cookie.png",
];
const randomImageElement = document.getElementById("randomImage");

function getRandomImage() {
  const randomIndex = Math.floor(Math.random() * images.length);
  const randomImage = images[randomIndex];
  return randomImage;
}

function getRandomTimeout() {
  return Math.floor(Math.random() * (45000 - 5000 + 1)) + 5000;
}

function changeVisibility() {
  randomImageElement.style.visibility = "visible";
  setTimeout(() => {
    randomImageElement.style.visibility = "hidden";
    setTimeout(changeImage, getRandomTimeout());
  }, 3000);
}

function changeImage() {
  const randomImage = getRandomImage();
  randomImageElement.src = randomImage;
  changeVisibility();
}

changeImage();

function getRandomPosition() {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  const randomX = Math.random() * (screenWidth - 40);
  const randomY = Math.random() * (screenHeight - 40);

  return { x: randomX, y: randomY };
}

function setPosition() {
  const randomPosition = getRandomPosition();
  randomImageElement.style.left = randomPosition.x + "px";
  randomImageElement.style.top = randomPosition.y + "px";
}

setPosition();

setInterval(setPosition, 3000);

// counter
const heartEmoji = document.getElementById("counter");
const counterElement = document.getElementById("count");
let count = 0;

randomImageElement.addEventListener("click", function () {
  count++;
  counterElement.textContent = count;
  randomImageElement.style.visibility = "hidden";

  if (count >= 3) {
    heartEmoji.style.cursor = "pointer";
    heartEmoji.classList.add("tintinear");

    heartEmoji.addEventListener("click", function () {
      const cursorElement = document.querySelector(".cursor");
      cursorElement.style.backgroundImage = "url('img/pro-hammer.png')";
      cursorElement.style.transition = "transform 0.05s";
      count = 0;
      counterElement.textContent = count;
      heartEmoji.classList.remove("tintinear");
    });
  }
});
