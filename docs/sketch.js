let board;
let taille = 10;
let caseSize = 40;
let remainingCells;
let revealed;
let gameover = false;

function setup() {
  createCanvas(400, 400);
  initBoard(taille, 3);
}

function initBoard(taille, nbdemines) {
  let cols = taille;
  let rows = taille;

  revealed = Array(cols).fill().map(() => Array(rows).fill(false));
  board = Array(cols).fill().map(() => Array(rows).fill(0));
  remainingCells = cols * rows - nbdemines;

  while (nbdemines > 0) {
    let x = floor(random(cols));
    let y = floor(random(rows));

    if (board[x][y] !== 99) {
      board[x][y] = 99;
      nbdemines--;
    }
  }
}

function drawCase(x, y, size) {
  let xpos = x * size;
  let ypos = y * size;
  stroke(0);
  fill(200);
  rect(xpos, ypos, size, size);

  if (revealed[x][y]) {
    fill(200);
    rect(xpos, ypos, size, size);

    if (board[x][y] === 99) {
      fill(255, 0, 0);
      textAlign(CENTER, CENTER);
      text("X", xpos + caseSize / 2, ypos + caseSize / 2);
    } else {
      let mineCount = getMines(x, y);
      fill(0);
      textAlign(CENTER, CENTER);
      text(mineCount.toString(), xpos + caseSize / 2, ypos + caseSize / 2);
    }
  }
}

function draw() {
  background(255);
  for (let x = 0; x < taille; x++) {
    for (let y = 0; y < taille; y++) {
      drawCase(x, y, caseSize);
    }
  }

  if (gameover) {
    fill(255, 0, 0);
    textAlign(CENTER, CENTER);
    textSize(32);
    text("Tu as perdu !", width / 2, height / 2);
  } else if (remainingCells === 0) {
    fill(0, 0, 255);
    textAlign(CENTER, CENTER);
    textSize(32);
    text("Vous avez gagné !", width / 2, height / 2);
  }
}

function getMines(x, y) {
  let count = 0;
  for (let dx = -1; dx <= 1; dx++) {
    for (let dy = -1; dy <= 1; dy++) {
      let nx = x + dx;
      let ny = y + dy;
      if (dx === 0 && dy === 0) continue;
      if (nx >= 0 && nx < board.length && ny >= 0 && ny < board[0].length) {
        if (board[nx][ny] === 99) {
          count++;
        }
      }
    }
  }
  return count;
}

function mousePressed() {
  let x = floor(mouseX / caseSize);
  let y = floor(mouseY / caseSize);

  if (x >= 0 && x < taille && y >= 0 && y < taille && !revealed[x][y]) {
    revealed[x][y] = true;

    if (board[x][y] === 99) {
      gameover = true;
    } else {
      remainingCells--;
    }
  }
}