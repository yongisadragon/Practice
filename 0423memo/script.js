const memoContainer = document.querySelector(".memoContainer"); //포스트잇 공간
const title = document.querySelector("#title"); //제목
const content = document.querySelector("#content"); //내용
let memoArray = localStorage.getItem("memoArray")
  ? JSON.parse(localStorage.getItem("memoArray"))
  : []; //배열
memoArray = memoArray ?? [];
render();

function resetMemo() {
  localStorage.clear(); // 스토리지 비워주기
  memoContainer.innerHTML = ""; // 메모 컨테이너 비워주기
  memoArray = []; // 메모 전체 배열 비워주기
}

function createMemo(item) {
  //메모를 하나만 생성해주는 함수
  const list = document.createElement("li"); // ul>li태그 생성
  const memoId = document.createElement("p"); // 순서 번호
  const delMemoBtn = document.createElement("button"); //del 버튼 태그 생성
  const h2_title = document.createElement("h2"); // 질문 h2태그 생성
  const p_content = document.createElement("p"); // 답변 p태그 생성
  const memoTime = document.createElement("p"); // 날짜 표기

  const time = new Date();
  const year = time.getFullYear();
  const month = String(time.getMonth() + 1).padStart(2, "0"); // getMonth()는 0부터 시작하므로 1을 더해줍니다.
  const day = String(time.getDate()).padStart(2, "0");

  memoId.className = "a11y-hidden";
  memoTime.className = "memoTime";
  list.className = "memoCard";
  delMemoBtn.className = "delBtn";
  //p_content.className = "visible"; // 초기 내용 숨김 위해 클래스명 설정, 아래 토글로 on/off

  // list.addEventListener("mousedown", () => {
  //   p_content.classList.toggle("visible");
  // });

  h2_title.setAttribute(
    "style",
    "color:#3e3e3e; border-top: 1px solid #ffb347; margin-top:30px"
  );
  h2_title.textContent = item.memoTitle;
  p_content.setAttribute("style", "color:#3e3e3e;");
  p_content.textContent = item.memoContent;
  memoId.textContent = item.leng + 1;
  delMemoBtn.setAttribute("id", item.leng); // p는 보여주는 번호이기 때문에 index[0]에 1을 더해줬고, 이것은 실제 id의 번호 속성
  list.classList.add(item.leng); // p는 보여주는 번호이기 때문에 index[0]에 1을 더해줬고, 이것은 실제 id의 번호 속성
  delMemoBtn.setAttribute("style", "");
  delMemoBtn.setAttribute("onclick", "delMemo()");
  // delMemoBtn.textContent = "삭제";
  memoTime.textContent = `${year}/${month}/${day}`; //시간 표기

  // const flexDiv = document.createElement("div");
  // flexDiv.setAttribute(
  //   "style",
  //   "display:flex; justify-content: space-between;"
  // );
  memoContainer.appendChild(list);

  // list.appendChild(flexDiv);
  list.appendChild(memoId);
  list.appendChild(delMemoBtn);
  list.appendChild(h2_title);
  list.appendChild(p_content);
  list.appendChild(memoTime);

  const wrraperWH = document.querySelector(".whole-warrper");
  const randomX = parseInt(
    Math.random() * (window.innerWidth - list.offsetWidth)
  );
  const randomY = parseInt(
    Math.random() *
      (window.innerHeight - wrraperWH.offsetHeight - list.offsetHeight)
  );
  // list.style.transform = `translate(-${list.offsetWidth}px, -${list.offsetHeight}px)`;
  list.style.transform = `translate(${
    randomX - wrraperWH.offsetWidth / 2
  }px, ${randomY}px)`;

  // const random= function randomInt(min, max) {
  //   var randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
  //   return randomNum;
  // };
  // list.style.transform = `translate(${random(1, 500)}px, ${random(
  //   1,
  //   500
  // )}px)`;
}

function render() {
  memoContainer.innerHTML = "";

  for (const item of memoArray) {
    createMemo(item);
  }
}

// li를 1,2,3,4, 순서.. 어쩌고 render 에서 나온 random값을 id 각 순서에다가 위치값을 기억하게.
function addMemo() {
  //정보 값들을 객체에 담고, 어레이에 push, 로컬에 문자로 저장.
  let memoInfo = {
    memoTitle: title.value,
    memoContent: content.value,
    leng: memoArray.length,
  };
  memoArray.push(memoInfo);
  localStorage.setItem("memoArray", JSON.stringify(memoArray));
  title.value = "";
  content.value = "";
  createMemo(memoInfo);
  // render는 메모 전체 새로 그리기. 다른것은 지우지 않고
  // render();
}

function delMemo() {
  //memoArray 안의 모든요소는 memoInfo의 객체들을 요소이다. 즉, len을 참조할 수 있음.
  //event.srcElement.id는 이벤트가 발생한 요소의 id값(여기선 순서가 됨. listrender에서 정해줬음)
  const idx = memoArray.find((el) => el.leng == event.target.id); //이걸 이용해서 현재 id값과 이벤트(클릭)가 발생한 녀석의 id가 일치하는지 여부
  // console.log(idx);
  if (idx) {
    const findIdx = memoArray.findIndex((el) => el.leng === idx.leng); //주어진 판별 함수를 만족하는 배열의 첫 번째 요소에 대한 인덱스를 반환, 그 뒤의 연산자는 내가 누른 이벤트와 그 이벤트가 발생한 위치의 len이 같을 경우
    memoArray.splice(findIdx, 1);
  }
  localStorage.setItem("memoArray", JSON.stringify(memoArray));
  // const delEl = document.querySelector(`.${idx.leng}`);
  // const delEl = document.querySelectorAll(".memoCard")[idx.leng];
  // delEl.remove();
  // console.log(delEl);
  render();
}

//스크롤 버튼 추가
const scrollBtn = document.createElement("button");
scrollBtn.innerHTML = "&darr;";
scrollBtn.setAttribute("class", "scrollDown");
document.body.appendChild(scrollBtn);
const scrollDown = document.querySelector(".scrollDown");
scrollDown.addEventListener("click", function () {
  window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
});

//사운드 추가
const addBtn = document.querySelector(".add");
const resetBtn = document.querySelector(".reset");
addBtn.addEventListener("click", function () {
  let addAudio = new Audio("postit.wav");
  addAudio.loop = false;
  addAudio.play();
});
resetBtn.addEventListener("click", function () {
  let resetAudio = new Audio("tear.wav");
  resetAudio.loop = false;
  resetAudio.play();
});
