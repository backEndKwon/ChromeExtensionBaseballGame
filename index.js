// document.addEventListener("DOMContentLoaded", function () {
//   fetch(chrome.runtime.getURL("index.html"))
//     .then((response) => response.text())
//     .then((html) => {
//       let div = document.createElement("div");
//       div.innerHTML = html.trim();
//       document.body.appendChild(div.firstChild);
//     })
//     .catch((error) => {
//       console.warn(error);
//     });

//   let link = document.createElement("link");
//   link.rel = "stylesheet";
//   link.href = chrome.runtime.getURL("styles.css");
//   (document.head || document.documentElement).appendChild(link);

document.addEventListener("DOMContentLoaded", function () {
  fetch("index.html")
    .then((response) => response.text())
    .then((html) => {
      let div = document.createElement("div");
      div.innerHTML = html.trim();
      document.body.appendChild(div.firstChild);
    })
    .catch((error) => {
      console.warn(error);
    });

  let link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "styles.css";
  (document.head || document.documentElement).appendChild(link);
});

// getRandomNumber, compareNumber 함수 등 기존의 게임 로직을 가져옵니다.
function getRandomNumber() {
  let result = [];
  while (result.length < 3) {
    let number = Math.floor(Math.random() * 10);
    if (number === 0 && result.length === 0) continue; //0이면 다시 뽑기
    if (result.indexOf(number) === -1) {
      result.push(number);
    }
  }
  return result;
}

function compareNumber(RandomNumber) {
  //   let userNumber = readlineSync.question("숫자를 입력하세요: ");

  let userNumber = document.getElementById("userInput").value;
  console.log("👉 ~ userNumber:", userNumber);
  //userNumber가 중복된 숫자가 있을 경우도 예외처리
  if (Number(userNumber[0]) === 0) {
    alert(
      "Numbers starting with 0 are not allowed. Please enter a valid number."
    );
    return;
  }
  if (userNumber.length === 3 && [...new Set(userNumber)].length !== 3) {
    alert("Duplicate numbers found. Please enter a valid number.");
    return;
  }
  if (userNumber.trim() === "") {
    alert("You entered a blank space. Please enter a number.");
    return;
  }
  if (isNaN(userNumber)) {
    alert("Please enter only numbers.");
    return;
  }
  if (userNumber.length !== 3) {
    alert("Please enter a 3-digit number.");
    return;
  }

  //randomNumber은 answer임
  let strike = 0; //3strike
  let ball = 0; // 4ball
  let out = 0; // 3out

  userNumber = userNumber.split("").map((x) => parseInt(x));
  // for (let i = 0; i < 3; i++) {
  //   for (let j = 0; j < 3; j++) {
  //     if (userNumber[i] === RandomNumber[j]) {
  //       if (i === j) {
  //         strike++;
  //       } else {
  //         ball++;
  //       }
  //     }
  //   }
  // }
  for (let i = 0; i < 3; i++) {
    const index = RandomNumber.indexOf(userNumber[i]);

    if (index !== -1) {
      if (index === i) {
        strike++;
      } else {
        ball++;
      }
    }
  }
  //아웃인 경우
  if (strike === 0 && ball === 0) {
    out++;
  }
  console.log(`${userNumber}는 ${strike}스트라이크, ${ball}볼, ${out}아웃`);
  return [strike, ball, out, userNumber];
}

// 랜덤 숫자를 생성합니다.
const RandomNumber = getRandomNumber();
let attempts = [];
async function playGame() {
  let count = attempts.length + 1;

  [strike, ball, out, userNumber] = await compareNumber(RandomNumber);
  let inputNumber = userNumber.join("");
  attempts.push(
    `Attempt#${count} : ${inputNumber} has S:${strike} B:${ball} O:${out}`
  );

  const resultElement = document.getElementById("result");
  resultElement.innerHTML = attempts.join("<br>");

  document.getElementById("strike").innerText = "Strike: " + strike;
  document.getElementById("ball").innerText = "Ball: " + ball;
  document.getElementById("out").innerText = "Out: " + out;

  if (strike === 3) {
    const playAgain = confirm(
      `Congratulations🎉 You got it on attempt ${count}. Would you like to play again`
    );
    if (playAgain) {
      location.reload();
      // //랜덤숫자 재생성
      // RandomNumber = getRandomNumber();
      // attempts = [];
      // resultElement.innerHTML = "";
    } else {
      alert("게임을 종료합니다.");
      userInput.disabled = true;
    }
  }

  // 입력값 초기화
  userInput.value = "";
}

document
  .getElementById("userInput")
  .addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      playGame();
    }
  });
// 모달 열기
function openModal() {
  document.getElementById("myModal").style.display = "block";
}

// 모달 닫기
function closeModal() {
  document.getElementById("myModal").style.display = "none";
}
// 전구 아이콘 클릭 시 모달 열기
document.getElementById("lightbulb-icon").addEventListener("click", openModal);

// 닫기 아이콘 클릭 시 모달 닫기
document
  .getElementsByClassName("close")[0]
  .addEventListener("click", closeModal);

// 모달 외부 클릭 시 닫기
window.onclick = function (event) {
  if (event.target == document.getElementById("myModal")) {
    closeModal();
  }
};

document
  .getElementById("closeModalButton")
  .addEventListener("click", closeModal);

// });

// let link = document.createElement("link");
// link.rel = "stylesheet";
// link.href = chrome.runtime.getURL("styles.css");
// (document.head || document.documentElement).appendChild(link);
