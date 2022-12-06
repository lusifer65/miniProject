let table = document.getElementById("table");

for (let i = 0; i < 8; i++) {
  let white = i % 2 == 0 ? true : false;
  let row = document.createElement("tr");
  for (let j = 0; j < 8; j++) {
    let col = document.createElement("td");
    col.classList.add("box");
    if (white) {
      col.classList.add("white");
    } else {
      col.classList.add("black");
    }
    // col.addEventListener()
    row.appendChild(col);
    white = !white;
    col.setAttribute("data-index", `${i}-${j}`);
  }
  table.appendChild(row);
}

table.addEventListener("mouseover", function (e) {
  let data = e.target.dataset.index;
  if (data !== undefined) {
    let [row, col] = data.split("-").map((item) => {
      return parseInt(item);
    });
    // console.log(row, col);

    let str = `${row}-${col}`;
    let hash = {};
    hash[str] = true;

    hash = topLeft(row, col, hash);
    hash = topRight(row, col, hash);
    hash = buttomLeft(row, col, hash);
    hash = buttomRight(row, col, hash);

    let cells = document.querySelectorAll("td");
    for (let i = 0; i < cells.length; i++) {
      cells[i].classList.remove("blue");
    }
    for (let i = 0; i < cells.length; i++) {
      let str = String(cells[i].dataset.index);
      if (str in hash) {
        cells[i].classList.add("blue");
      }
    }
  }
});

table.addEventListener("mouseleave", function (e) {
  let cells = document.querySelectorAll("td");
  for (let i = 0; i < cells.length; i++) {
    cells[i].classList.remove("blue");
  }
});

let topLeft = (row, col, hash) => {
  row--;
  col--;
  while (row >= 0 && col >= 0) {
    hash[`${row}-${col}`] = true;
    row--;
    col--;
  }
  return hash;
};

let topRight = (row, col, hash) => {
  row--;
  col++;
  while (row >= 0 && col < 8) {
    hash[`${row}-${col}`] = true;
    row--;
    col++;
  }
  return hash;
};

let buttomLeft = (row, col, hash) => {
  row++;
  col--;
  while (row < 8 && col >= 0) {
    hash[`${row}-${col}`] = true;
    row++;
    col--;
  }
  return hash;
};

let buttomRight = (row, col, hash) => {
  row++;
  col++;
  while (row < 8 && col < 8) {
    hash[`${row}-${col}`] = true;
    row++;
    col++;
  }
  return hash;
};
