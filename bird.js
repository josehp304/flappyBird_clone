const BIRD_TOP = 0;
const BIRD_SPEED = 0.4;
const JUMP_INTERVEL = 300;
var lastJump = 0;
var bird = document.querySelector("[data-bird]");

export function setupBird() {
  bird.classList.remove("hide");
  setTop(window.innerHeight / 2);
  document.removeEventListener("keydown", handleJump);
  document.addEventListener("keydown", handleJump);
}

export function updateBird(delta) {
  if (lastJump < JUMP_INTERVEL) {
    setTop(getTop() - BIRD_SPEED * delta);
  } else {
    setTop(getTop() + BIRD_SPEED * delta);
  }
  lastJump += delta;
}

function setTop(top) {
  bird.style.top = top + "px";
}

function getTop() {
  return parseFloat(getComputedStyle(bird).getPropertyValue("top"));
}
export function getBirdRect() {
  return bird.getBoundingClientRect();
}

function handleJump(e) {
  if (e.code == "Space") {
    lastJump = 0;
  }
}
