const board = document.getElementById("board");
const moveText = document.getElementById("moves");

let tiles = [];
let moves = 0;
let startTime = Date.now();

function init() {
  tiles = [...Array(8).keys()].map(n => n + 1);
  tiles.push(null);
  render();
}

function render() {
  board.innerHTML = "";
  tiles.forEach((num, i) => {
    const div = document.createElement("div");
    div.className = "tile";

    if (num === null) {
      div.classList.add("empty");
    } else {
      div.textContent = num;
      div.onclick = () => move(i);
    }

    board.appendChild(div);
  });
}

function shuffle() {
  tiles.sort(() => Math.random() - 0.5);
  moves = 0;
  startTime = Date.now();
  moveText.textContent = "Moves: 0";
  render();
}

function move(index) {
  const empty = tiles.indexOf(null);
  if (isAdjacent(index, empty)) {
    [tiles[index], tiles[empty]] = [tiles[empty], tiles[index]];
    moves++;
    moveText.textContent = `Moves: ${moves}`;
    render();
    checkWin();
  }
}

function isAdjacent(a, b) {
  const x1 = a % 3, y1 = Math.floor(a / 3);
  const x2 = b % 3, y2 = Math.floor(b / 3);
  return Math.abs(x1 - x2) + Math.abs(y1 - y2) === 1;
}

function checkWin() {
  const win = tiles.slice(0, 8).every((v, i) => v === i + 1);
  if (win) {
    const time = Math.floor((Date.now() - startTime) / 1000);
    alert(`🎉 You won in ${moves} moves!`);

    fetch("http://127.0.0.1:5000/score", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ moves, time })
    });
  }
}

init();
