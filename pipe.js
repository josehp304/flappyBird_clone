const HOLE_HEIGHT = 250;
const PIPE_SPEED = 0.5;
const PIPE_INTERVEL = 1000;
let pipeCount = 0;
let lastPipe = 0;
let pipes = [];
export function setupPipe() {
  document.documentElement.style.setProperty("--hole-height", HOLE_HEIGHT);
  lastPipe = PIPE_INTERVEL;
  pipes.forEach((pipe) => pipe.remove());
  pipeCount = 0;
}
export function updatePipe(delta) {
  lastPipe += delta;
  if (lastPipe > PIPE_INTERVEL) {
    createPipe();
    lastPipe -= PIPE_INTERVEL;
  }
  pipes.forEach((pipe) => {
    console.log(pipe.left);
    pipe.left -= delta * PIPE_SPEED;
    console.log(delta);
    if (pipe.left + 100 < 0) {
      pipe.remove();
      pipeCount++;
    }
  });
}
export function createPipe() {
  let pipeElem = document.createElement("div");
  let topElem = pipeSegment("top");
  let bottomElem = pipeSegment("bottom");
  pipeElem.append(topElem);
  pipeElem.append(bottomElem);
  pipeElem.style.setProperty(
    "--hole-top",
    randomNumBtw(HOLE_HEIGHT * 1.5, window.innerHeight - HOLE_HEIGHT * 1.5)
  );
  pipeElem.classList.add("pipe");
  const pipe = {
    get left() {
      return parseFloat(getComputedStyle(pipeElem).getPropertyValue("left"));
    },
    set left(value) {
      pipeElem.style.left = value + "px";
    },
    remove() {
      pipes.filter((p) => p !== pipe);
      pipeElem.remove();
    },
    rect() {
      return [
        topElem.getBoundingClientRect(),
        bottomElem.getBoundingClientRect(),
      ];
    },
  };
  pipe.left = window.innerWidth;
  document.body.append(pipeElem);
  pipes.push(pipe);
}
function pipeSegment(position) {
  let segment = document.createElement("div");
  segment.classList.add("segment", position);
  return segment;
}
function randomNumBtw(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function pipeRect() {
  let pipesRect = pipes.flatMap((pipe) => pipe.rect());
  return pipesRect;
}

export function getPipeCount() {
  return pipeCount;
}
