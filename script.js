const DIRECTIONS = {
  top: { x: -1, y: 0 },
  right: { x: 0, y: 1 },
  bottom: { x: 1, y: 0 },
  left: { x: 0, y: -1 },
};

const BOARD_LOCATION = {
  OUTSIDE: "outside",
  INSIDE: "inside",
  FOOD_FOUND: "food_found",
};

let currentDirection = DIRECTIONS.right;

const boardElement = document.getElementById("board");
const snake = [{ x: 0, y: 0 }];

const createBoardItems = () => {
  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      const div = document.createElement("div");
      div.setAttribute("id", `x: ${x}, y: ${y}`);

      boardElement.appendChild(div);
    }
  }
};

const getBoardItem = (x, y) => {
  return document.getElementById(`x: ${x}, y: ${y}`);
};

const isFoodItem = (x, y) => {
  return getBoardItem(x, y).classList.contains("food");
};

const moveSnake = () => {
  const [head] = snake.slice(-1);
  const xSum = head.x + currentDirection.x;
  const ySum = head.y + currentDirection.y;

  if (xSum < 0 || xSum >= 10 || ySum < 0 || ySum >= 10) {
    return BOARD_LOCATION.OUTSIDE;
  }

  snake.push({ x: xSum, y: ySum });
  getBoardItem(xSum, ySum).classList.add("snakeColor");

  const isFood = isFoodItem(xSum, ySum);

  if (isFood) {
    getBoardItem(xSum, ySum).classList.remove("food");
    return BOARD_LOCATION.FOOD_FOUND;
  }

  const tail = snake.shift();
  getBoardItem(tail.x, tail.y).classList.remove("snakeColor");

  return BOARD_LOCATION.INSIDE;
};

const showRandomFood = () => {
  let emptyPositionFound = false;

  while (!emptyPositionFound) {
    const randomX = Math.floor(Math.random() * 10);
    const randomY = Math.floor(Math.random() * 10);

    const div = getBoardItem(randomX, randomY);

    if (!div.classList.contains("snakeColor")) {
      div.classList.add("food");
      emptyPositionFound = true;
    }
  }
};

const arrowPressedHandler = (event) => {
  switch (event.key) {
    case "ArrowUp": {
      currentDirection = DIRECTIONS.top;
      break;
    }
    case "ArrowRight": {
      currentDirection = DIRECTIONS.right;
      break;
    }
    case "ArrowDown": {
      currentDirection = DIRECTIONS.bottom;
      break;
    }
    case "ArrowLeft": {
      currentDirection = DIRECTIONS.left;
      break;
    }
    default: {
      break;
    }
  }
};

const game = () => {
  createBoardItems();

  document.addEventListener("keydown", arrowPressedHandler);

  const gameInterval = setInterval(() => {
    const boardLocation = moveSnake();

    if (boardLocation === BOARD_LOCATION.OUTSIDE) {
      alert("Game Over!!!");
      clearInterval(gameInterval);
    }

    if (boardLocation === BOARD_LOCATION.FOOD_FOUND) {
      showRandomFood();
    }
  }, 250);

  showRandomFood();
};

game();
