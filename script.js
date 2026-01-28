let tiles = [];
let moves = 0;
let playerName = "";

const board = document.getElementById("board");
const shuffleBtn = document.getElementById("shuffleBtn");
const playerDisplay = document.getElementById("playerDisplay");

document.getElementById("startBtn").addEventListener("click", startGame);

function startGame() {
  const nameInput = document.getElementById("playerName").value.trim();
  if(nameInput === "") {
    alert("Please enter your name!");
    return;
  }
  playerName = nameInput;

  // Hide setup, show game
  document.getElementById("playerSetup").style.display = "none";
  document.getElementById("gameContainer").style.display = "block";

  // Show player name
  playerDisplay.textContent = `Player: ${playerName}`;

  // Initialize game
  init();
}

function init() {
  tiles = [...Array(8).keys()].map(n => n + 1);
  tiles.push(null);
  moves = 0;
  document.getElementById("moves").textContent = `Moves: ${moves}`;
  render();
}

function render() {
  board.innerHTML = "";
  tiles.forEach((num, i) => {
    const div = document.createElement("div");
    div.className = "tile";

    if(num === null){
      div.classList.add("empty");
    } else {
      div.textContent = num;
      div.onclick = () => move(i);
    }

    board.appendChild(div);
  });
}

function move(index) {
  const emptyIndex = tiles.indexOf(null);
  const validMoves = [emptyIndex - 1, emptyIndex + 1, emptyIndex - 3, emptyIndex + 3];
  
  if(validMoves.includes(index)) {
    [tiles[emptyIndex], tiles[index]] = [tiles[index], tiles[emptyIndex]];
    moves++;
    document.getElementById("moves").textContent = `Moves: ${moves}`;
    render();
    checkWin();
  }
}

function checkWin() {
  const winningTiles = [...Array(8).keys()].map(n => n + 1);
  if(JSON.stringify(tiles.slice(0,8)) === JSON.stringify(winningTiles)) {
    setTimeout(() => alert(`Congratulations ${playerName}! You won in ${moves} moves.`), 100);
    
  }
}
function checkWin() {
  const winningTiles = [...Array(8).keys()].map(n => n + 1);
  if(JSON.stringify(tiles.slice(0,8)) === JSON.stringify(winningTiles)) {
    setTimeout(() => alert(`Congratulations ${playerName}! You won in ${moves} moves.`), 100);

    fetch("http://127.0.0.1:5000/score", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ player: playerName, moves: moves })
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.error("Error:", err));
  }
}


shuffleBtn.onclick = init;
