const cursor = document.querySelector(".cursor");
//cursor speed
const ease = 0.075;
let updateX, updateY;
let mouseX,
  cursorX = window.innerWidth / 2;
let mouseY,
  cursorY = window.innerHeight / 2;

const lerp = (start, end, ease) => (1 - ease) * start + ease * end;

const getMousePos = e => {
  mouseX = e.pageX;
  mouseY = e.pageY;
};

const animateCursor = () => {
  const { height, width } = cursor.getBoundingClientRect();
  updateX = parseFloat((mouseX - width / 2).toFixed(2));
  updateY = parseFloat((mouseY - height / 2).toFixed(2));
  cursorX = lerp(cursorX, mouseX, ease);
  cursorY = lerp(cursorY, mouseY, ease);
  cursor.style.transform = `translate3d(${updateX}px, ${updateY}px, 0)`;
};

const raf = () => {
  animateCursor();
  requestAnimationFrame(raf);
};

const addEvents = () => {
  window.addEventListener("mousemove", getMousePos);
};

const app = () => {
  addEvents();
  raf();
};

app();
