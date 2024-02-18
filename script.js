const title = document.querySelector(".title");
const subtitle = document.querySelector(".subtitle");
const bird = document.querySelector(".bird");
import { setupBird, updateBird, getBirdRect } from "./bird.js";
import { pipeRect, setupPipe, updatePipe, getPipeCount } from "./pipe.js";

document.addEventListener("keypress", handleStart, { once: true });

function handleStart() {
  title.classList.add("hide");
  subtitle.classList.add("hide");
  setupBird();
  setupPipe();
  window.requestAnimationFrame(updateloop);
}

let lastTime;
function updateloop(time) {
  if (lastTime == null) {
    lastTime = time;
    window.requestAnimationFrame(updateloop);
    return;
  }
  const delta = time - lastTime;
  lastTime = time;
  updateBird(delta);
  updatePipe(delta);
  if (checkLose()) return handleLose();
  window.requestAnimationFrame(updateloop);
}

function checkLose() {
  let birdRect = getBirdRect();
  let outsideWorld = birdRect.top < 0 || birdRect.bottom > window.innerHeight;
  let pipeHit = pipeRect().some((r) => isCollision(birdRect, r));
  return outsideWorld || pipeHit;
}

function handleLose() {
  setTimeout(() => {
    title.classList.remove("hide");
    bird.classList.add("hide");
    let pipeCount = getPipeCount();
    subtitle.innerHTML = `${pipeCount} pipes passed`;
    subtitle.classList.remove("hide");
    document.addEventListener("keydown", handleStart, { once: true });
  }, 200);
}

function isCollision(rect1, rect2) {
  return (
    rect1.left < rect2.right &&
    rect1.top < rect2.bottom &&
    rect1.right > rect2.left &&
    rect1.bottom > rect2.top
  );
}
