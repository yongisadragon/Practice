import { useState } from "react";
import "./App.css";

function App() {
  const [글제목, b] = useState("남자 코트 추천");

  return (
    <div className="App">
      <div className="black-nav">
        <h4>블로그</h4>
      </div>
      <div className="list">
        <h4>글 제목</h4>
        <p>7월 4일 발행</p>
      </div>
    </div>
  );
}

export default App;
