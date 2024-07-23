function selector() {
  const popup = document.createElement("div");
  popup.classList.add("popup");

  const popupContent = document.createElement("div");
  popupContent.classList.add("popup-content");

  popupContent.innerHTML = `
    <p>Choose your preference </p>
    <input type="radio" name="start" id="xx">X 
    <input type="radio" name="start" id="oo">O <br>
    <button onclick="closePopup()">Start</button>
  `;

  popup.appendChild(popupContent);
  document.body.appendChild(popup);

  // Add the blur class to the background
  all.classList.add("blur");
}
 

function closePopup() {
  const xx = document.getElementById("xx");
  const oo = document.getElementById("oo");
  if (xx.checked) {
  const popup = document.querySelector(".popup");
  popup.remove();  
  all.classList.remove("blur");
  let value = "x";
  window.location.href = `ox.html?value=${value}`;
  }
  if (oo.checked) {
  const popup = document.querySelector(".popup");
  popup.remove();  
  all.classList.remove("blur");
  let value = "o";
  window.location.href = `ox.html?value=${value}`;
  }
 
   
}


const ximage = document.getElementById("ximage");
const oimage = document.getElementById("oimage");
const urlParams = new URLSearchParams(window.location.search);
const value = urlParams.get('value');
let arrUser = [];
let arrComputer = [];

const oxButtons = document.querySelectorAll('.ox');

oxButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    check(index);
    console.log(index);
  });
});

function random() {
  let num;
  do {
    num = Math.floor(Math.random() * 9); // Generate a number between 0 and 8
  } while (arrUser.includes(num) || arrComputer.includes(num)); // Ensure it's not already used
  return num;
}

function check(val) {
  if (arrUser.includes(val) || arrComputer.includes(val)) {
    alert("The Button is already selected!!");
  } else {
    arrUser.push(val);
    ox(val);
    if (Win(arrUser)) {
      alert("You Won!");
      return;
    }
    
    const isInRand = random();
    computerMove(isInRand);
    if (Win(arrComputer)) {
      alert("Computer Won!");
    }
    
  }
}

function ox(num) {
  const imgElement = document.createElement("img");
  imgElement.classList.add("imagelook");
  imgElement.src = value === "x" ? ximage.src : oimage.src;
  imgElement.alt = value === "x" ? "ximage" : "oimage";
  oxButtons[num].appendChild(imgElement);
}

function computerMove(num) {
  arrComputer.push(num);
  const imgElement = document.createElement("img");
  imgElement.classList.add("imagelook");
  imgElement.src = value === "x" ? oimage.src : ximage.src;
  imgElement.alt = value === "x" ? "oimage" : "ximage";
  oxButtons[num].appendChild(imgElement);
}

function Win(arr) {
  const winningCombinations = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    // Add other winning combinations as needed
    // e.g., [1, 2, 3], [3, 4, 5], etc.
  ];

  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (arr.includes(a) && arr.includes(b) && arr.includes(c)) {
      return true; // Return true if there's a win
    }
  }
  
  return false; // Return false if no win
}

 