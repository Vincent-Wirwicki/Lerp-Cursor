const cursors = [...document.querySelectorAll(".cursor")];
const cursorsDimensions = [];
const title = document.querySelector(".title");
const ease = 0.075;
const scale = 2;

let isHover = false,
  mouseX = 0,
  mouseY = 0,
  cursorX = 0,
  cursorY = 0;

const lerp = (start, end, ease) => (1 - ease) * start + ease * end;

const getMousePos = e => {
  mouseX = e.pageX;
  mouseY = e.pageY;
};

const pushCursorsDimensions = () =>
  cursors.forEach(cursor => {
    //with circle height = width
    const { height } = cursor.getBoundingClientRect();
    cursorsDimensions.push(height);
  });

const cursorsHeightWidth = (element, value) => {
  element.style.height = `${value}px`;
  element.style.width = `${value}px`;
};

const animateCursor = () => {
  cursors.forEach(cursor => {
    const { height, width } = cursor.getBoundingClientRect();
    cursorX = lerp(cursorX, mouseX, ease);
    cursorY = lerp(cursorY, mouseY, ease);
    cursor.style.transform = `translate3d(${cursorX - width / 2}px, 
    ${cursorY - height / 2}px, 0)`;
  });
  cursorsOnHover();
};

const raf = () => {
  animateCursor();
  requestAnimationFrame(raf);
};

const cursorsOnHover = () => {
  isHover
    ? cursorsHeightWidth(cursors[0], cursorsDimensions[1] * scale)
    : cursorsHeightWidth(cursors[0], cursorsDimensions[0]);
};

const onEnter = () => (isHover = true);
const onLeave = () => (isHover = false);

const addEvents = () => {
  window.addEventListener("mousemove", getMousePos);
  title.addEventListener("mouseenter", onEnter);
  title.addEventListener("mouseleave", onLeave);
};

const app = () => {
  pushCursorsDimensions();
  addEvents();
  raf();
  console.log(cursors);
};

app();
