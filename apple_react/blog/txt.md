### 0704

### JSX문법 1.

class 넣을 땐 className

### JSX문법 2.

변수 or 데이터 바인딩을 해줄 땐 {중괄호}

### JSX문법 3.

style을 인라인에 넣을 땐
style={{스타일명:'값'}} ->
style={{color:'red', fontSize:'14px'}} {}안에는 객체형태로 넣어줘야됨. (font-size 같이 하면 -뺄샘기호로 인식하기 때문에 카멜케이스로)

### useState는 [?,?] 형식으로 형태로 남는다.

const [a,setA] = useState('코트 추천')
이럴 경우, useState는 ['코트 추천', 함수] = [a , setA]의 destructuring 방식의 변수 생성 문법을 형성한다.a=>'코트 추천' , setA =>(a변경)함수
