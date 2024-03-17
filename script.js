const cursor = document.querySelector(".cursor");
const holes = [...document.querySelectorAll(".hole")];
const scoreEl = document.querySelector(".score span");
const changeAvatarButton = document.getElementById("change-avatar");
const avatarInput = document.getElementById("avatar-input");
let score = 0;
let speed = 1500;

changeAvatarButton.addEventListener("click", function () {
  avatarInput.click();
});

avatarInput.addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    const imageURL = URL.createObjectURL(file);
    const mole = document.querySelector(".mole");
    mole.style.backgroundImage = `url(${imageURL})`;
    setTimeout(function () {
      URL.revokeObjectURL(imageURL);
    }, 5000);
  }
});

function run() {
  const i = Math.floor(Math.random() * holes.length);
  const hole = holes[i];
  let timer = null;

  const img = document.createElement("img");
  img.classList.add("mole");

  // Verificar si se ha cambiado el avatar
  const avatarInput = document.getElementById("avatar-input");
  if (avatarInput && avatarInput.files && avatarInput.files[0]) {
    const file = avatarInput.files[0];
    const imageURL = URL.createObjectURL(file);
    img.src = imageURL;
  } else {
    img.src = "img/digglet.png";
  }

  img.addEventListener("click", () => {
    score += 10;
    sound.play();
    scoreEl.textContent = score;

    if (score === 100) {
      showMessage("A little Faster!");
    }
    if (score === 200) {
      showMessage("Faster!");
    }
    if (score === 300) {
      showMessage("More Faster!");
    }
    if (score === 400) {
      showMessage("Even Faster!");
    }
    if (score === 500) {
      showMessage("You are a God!");
    }

    if (score >= 100 && score < 200) {
      speed = 1200;
    }
    if (score >= 200 && score < 300) {
      speed = 1000;
    } else if (score >= 300 && score <= 400) {
      speed = 850;
      img.style.animationDuration = "0.3s";
    } else if (score >= 400 && score <= 500) {
      speed = 700;
      img.style.animationDuration = "0.3s";
    } else if (score >= 500) {
      speed = 500;
      img.style.animationDuration = "0.3s";
    }

    if (avatarInput && avatarInput.files && avatarInput.files[0]) {
      img.style.opacity = "0.5";
      img.style.filter = "brightness(50%)";
    } else {
      img.src = "img/digglet-whacked.png";
    }

    clearTimeout(timer);
    setTimeout(() => {
      hole.removeChild(img);
      run();
    }, 500);
  });

  hole.appendChild(img);

  timer = setTimeout(() => {
    hole.removeChild(img);
    run();
  }, speed);
}
run();

// cursor
window.addEventListener("mousemove", (e) => {
  cursor.style.top = e.pageY + "px";
  cursor.style.left = e.pageX + "px";
});
window.addEventListener("mousedown", () => {
  cursor.style.transform = "translate(-20%, -20%) rotate(-45deg)";
});
window.addEventListener("mouseup", () => {
  cursor.style.transform = "translate(-20%, -20%)";
});

// music
const sound = new Audio("mp3/smash.mp3");
const audio = document.getElementById("background-music");
const toggleButton = document.getElementById("toggle-music");

function toggleMusic() {
  if (audio.paused) {
    audio.play();
    toggleButton.textContent = "🔊";
  } else {
    audio.pause();
    toggleButton.textContent = "🔇";
  }
}

toggleButton.addEventListener("click", toggleMusic);

// message
function showMessage(message) {
  const messageElement = document.createElement("div");
  messageElement.textContent = message;
  messageElement.classList.add("message");

  const messageContainer = document.getElementById("message-container");
  messageContainer.appendChild(messageElement);

  setTimeout(() => {
    messageElement.classList.add("message-show");
  }, 10);

  setTimeout(() => {
    messageElement.classList.remove("message-show");
    setTimeout(() => {
      messageContainer.removeChild(messageElement);
    }, 500);
  }, 1500);
}
