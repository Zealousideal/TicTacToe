let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let newBtn = document.querySelector("#newGame");
let msgContainer = document.querySelector(".msgContainer");
let msg = document.querySelector("#msg");

let turn0 = true;
const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  turn0 = true;
  enabledBoxes();
  msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    console.log("box was clicked");
    if (turn0) {
      box.innerText = "O";
      turn0 = false;
    } else {
      box.innerText = "X";
      turn0 = true;
    }
    box.disabled = true;

    checkWinner();
  });
});

const disabledBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = true;
  });
};

const enabledBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerText = "";
  });
};

const showMessage = (message) => {
  msg.innerText = message;
  msgContainer.classList.remove("hide");
  disabledBoxes();
};

const checkWinner = () => {
  let isDraw = true;

  for (let pattern of winPatterns) {
    let pos1val = boxes[pattern[0]].innerText;
    let pos2val = boxes[pattern[1]].innerText;
    let pos3val = boxes[pattern[2]].innerText;

    if (pos1val !== "" && pos2val !== "" && pos3val !== "") {
      if (pos1val === pos2val && pos2val === pos3val) {
        console.log("winner", pos1val);
        showMessage(`Congratulations, the winner is ${pos1val}`);
        return;
      }
    }
  }

  // Check if all boxes are filled
  boxes.forEach((box) => {
    if (box.innerText === "") {
      isDraw = false;
    }
  });

  // If no winner and all boxes are filled, it's a draw
  if (isDraw) {
    console.log("It's a Draw!");
    showMessage("It's a Draw!");
  }
};

newBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

// Load background music
let bgMusic = new Audio("Assets/background-music.mp3");
bgMusic.loop = true; // Keep playing on loop
bgMusic.volume = 0.4; // Adjust volume (0.0 to 1.0)

// 🎵 Create mute/unmute button
let muteBtn = document.createElement("button");
muteBtn.innerText = "🔊 Mute Music";
muteBtn.style.position = "absolute";
muteBtn.style.top = "10px";
muteBtn.style.right = "10px";
muteBtn.style.padding = "10px";
muteBtn.style.fontSize = "1rem";
muteBtn.style.backgroundColor = "#826251";
muteBtn.style.color = "#FFE8D1";
muteBtn.style.border = "none";
muteBtn.style.borderRadius = "1rem";
document.body.appendChild(muteBtn);

// 🎼 Play music when user interacts with the page
document.addEventListener("click", function startMusic() {
  bgMusic.play().catch((error) => console.log("Autoplay blocked:", error));
  document.removeEventListener("click", startMusic); // Remove listener after first interaction
});

// 🎼 Toggle mute/unmute
muteBtn.addEventListener("click", () => {
  bgMusic.muted = !bgMusic.muted;
  muteBtn.innerText = bgMusic.muted ? "🔇 Unmute Music" : "🔊 Mute Music";
});
