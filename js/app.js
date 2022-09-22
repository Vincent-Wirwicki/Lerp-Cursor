const cursors = [...document.querySelectorAll(".cursor")];
const ease = 0.075;

let mouseX = 0,
  mouseY = 0,
  cursorX = 0,
  cursorY = 0;

const lerp = (start, end, ease) => (1 - ease) * start + ease * end;

const getMousePos = e => {
  mouseX = e.pageX;
  mouseY = e.pageY;
};

const animateCursor = () => {
  cursors.forEach(cursor => {
    const { height, width } = cursor.getBoundingClientRect();
    cursorX = lerp(cursorX, mouseX, ease);
    cursorY = lerp(cursorY, mouseY, ease);
    cursor.style.transform = `translate3d(${cursorX - width / 2}px, 
    ${cursorY - height / 2}px, 0)`;
  });
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
