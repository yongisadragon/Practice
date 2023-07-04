const flashcards = document.getElementsByClassName("flashcards")[0];
const createBox = document.getElementsByClassName("create-box")[0];
const question = document.getElementById("question");
const answer = document.getElementById("answer");
let contentArray = localStorage.getItem("items")
  ? JSON.parse(localStorage.getItem("items"))
  : [];
//이미 로컬스토리지를 쓰고있는지 체크 ? 맞다면 정보 가져오기 parse : 스토리지 쓰지 않는다면 새 배열 생성  []
// 1. localStorage.getItem('items') 메서드를 사용하여 items라는 이름의 로컬 스토리지 데이터를 가져옵니다.
// 2. 가져온 데이터가 존재하면, JSON.parse() 메서드를 사용하여 JSON 형식으로 저장된 문자열을 자바스크립트 객체 배열로 변환합니다.
// 3. 가져온 데이터가 존재하지 않으면, 빈 배열 []을 생성합니다.
// 4. 이렇게 생성된 배열을 contentArray 변수에 할당합니다.
// 따라서, 이 코드는 items라는 이름의 로컬 스토리지 데이터가 있으면 해당 데이터를 자바스크립트 객체 배열로 변환하여 contentArray 변수에 할당하고, 만약 items 데이터가 없으면 빈 배열을 contentArray 변수에 할당합니다.

function delFlashcards() {
  //Del Cards 버튼 클릭시 이벤트 스토리지 비우고, 카드 내용비우고, 어레이 비워준다.
  localStorage.clear();
  flashcards.innerHTML = "";
  contentArray = [];
}

contentArray.forEach(divMaker); //contentArray 배열의 각 요소에 대해 divMaker 함수를 호출
function divMaker(text) {
  let div = document.createElement("div"); // div태그 생성
  let h2_question = document.createElement("h2"); // question h2 text 생성
  let h2_answer = document.createElement("h2"); // answer h2 text 생성

  div.className = "flashcard";

  h2_question.setAttribute(
    "style",
    "border-top: 1px solid red; padding: 15px; margin-top:30px"
  );
  h2_question.innerHTML = text.my_question; //여기서 text는 addFlashcard 함수에서 전달되는 객체 contentArray[contentArray.length - 1]를 의미. 즉 정보가 flashcardInfo의 키값-> divMaker(contentArray[contentArray.length - 1]) -> function divMaker(text)의 인자값으로 전달.

  h2_answer.setAttribute("style", "text-align:center; display:none; color:red");
  h2_answer.innerHTML = text.my_answer;

  //여기까지 h2의 style과 텍스팅들을 세팅해줬고, 이제 div택에다가 h2를 달아주자.
  div.appendChild(h2_question); //각각의 div태그에 question h2 달기
  div.appendChild(h2_answer); //각각의 div태그에 answer h2 달기

  div.addEventListener("click", function () {
    //클릭하면 숨겨진 h2_answer 텍스트가 보여지도록. 반대라면 다시 숨겨지도록
    if (h2_answer.style.display === "none") {
      // == = 위치 잘 구분하기. if문안에는 연산을해서 true false를 판단하는거고, 블럭안에는 할당연산자임.
      h2_answer.style.display = "block";
    } else {
      h2_answer.style.display = "none";
    }
  });

  flashcards.appendChild(div); // flashcards라는 flashcard div들의 컨테이너에 div를 추가하는 것으로 마무리
}

function addFlashcard() {
  let flashcardInfo = {
    // 일종의 딕셔너리 객체. (키값 공백이나 특수문자면 ''사용 만약 접근할때에도 .접근법이 아니라 []로 접근해야됨.) 하지만 일반적인 경우는 아님
    my_question: question.value,
    my_answer: answer.value,
  };
  contentArray.push(flashcardInfo); //array에 객체에 들어가는 벨류값 푸쉬
  localStorage.setItem("items", JSON.stringify(contentArray)); //이 array에 더해줄때마다 로컬스토리지를 업데이트 해줌 각각 key 와 value. localStorage를 보면 value가 [{"my_question":"질문.","my_answer":"안녕"}]의 형식으로 들어가있음.
  divMaker(contentArray[contentArray.length - 1]); //위에서 만들어준 divMaker라는 함수. contentArray[contentArray.length - 1] 이거 자체가 divMaker에선 text 인자로 표현
  question.value = "";
  answer.value = ""; //업데이트가 되면 textarea의 벨류들은 지워줌
}

// function showCreateCardBox() {
//   //new card 누르면 creat flashcard생성 사실 생성이라기보단 none 에서 다시 보이게 해주는 것 div기본 설정 block
//   createBox.style.display = "block";
// }

// function hideCreateBox() {
//   //close 누르면
//   createBox.style.display = "none";
// }
