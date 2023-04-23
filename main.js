// allMemo라는 JSON 형식으로 작성된 문자열을 JS객체로 변환
let allMemo = JSON.parse(localStorage.getItem("allMemo"));

// allMemo의 값이 undefined라면 [] 배열을 할당합니다.
allMemo = allMemo ?? [];

// render 함수실행
render();

function saveNote() {
  // title이라는 아이디를 가진 input의 value 즉 입력값을 title상수에 저장
  const title = document.getElementById("title").value;

  // content라는 아이디를 가진 textarea의 value즉 입력값을 content상수에 저장
  const content = document.getElementById("content").value;

  // 배열인 allMemo에 객체를 push 하고 객체안에 값은 title의 value(text),content의 value(text), len이라는 key를가진 allMemo.length가 value로 들어가게 됩니다.
  allMemo.push({ title, content, len: allMemo.length });

  //localStorage에 "key","value"를 저장하기위한 setItem()
  //localStorage에 저장할 값은 title,content, allMemo.length가 됩니다.
  //stringify를 사용하여 JSON문자열로 변환시켜줍니다.
  localStorage.setItem("allMemo", JSON.stringify(allMemo));

  //render함수 실행
  render();
}

function render() {
  // display id를 가진 <section>
  const display = document.getElementById("display");
  //  <section>안에 있는 text를 문자열로 지정
  display.innerHTML = "";

  // 배열의 length만큼 순회하는 for in문 사용
  for (const item of allMemo) {
    // html에 <h2> 태그를 생성할 상수
    const saveTitle = document.createElement("h2");

    // html에 <p> 태그를 생성할 상수
    const saveContent = document.createElement("p");

    // html에 <p> 태그를 생성할 상수
    const saveId = document.createElement("p");

    //   html에 <button> 태그를 생성할 상수
    const deleteMemoBtn = document.createElement("button");

    //만든 h2태그의 text는 allMemo에 0번 index ~for
    saveTitle.textContent = item.title;

    //만든 첫번째 <p> 태그의 text는 allMemo에 0번째 index  ~for
    saveContent.textContent = item.content;

    //만든 두번째 <p> 태그에 text는 allMemo에 length +1
    saveId.textContent = item.len + 1;

    //만든 <button> 태그의 text는 "삭제"
    deleteMemoBtn.textContent = "삭제";

    //<button> 태그의 id를 allMemo안에 있는 key중 len으로 지정
    deleteMemoBtn.setAttribute("id", item.len);

    //<button>태그의 onclick이벤트가 발행사면 remove함수 실행
    deleteMemoBtn.setAttribute("onclick", "remove()");

    // <section id=display> 의 자식으로 <p> 를 위치함
    display.appendChild(saveId);

    // <section id=display> 의 자식으로 <h2> 를 위치함
    display.appendChild(saveTitle);

    // <section id=display> 의 자식으로 <p> 를 위치함
    display.appendChild(saveContent);

    // <section id=display> 의 자식으로 <button> 를 위치함
    display.appendChild(deleteMemoBtn);
  }
}

// 로컬스토리지에 저장되어있는 값 제거
function remove() {
  // allMemo에 값중 event.secElement.id 와 같은 값을
  // idx상수에 return
  const idx = allMemo.find((item) => item.len == event.srcElement.id);

  // 만약 idx에 값이 있다면 <- 0이 아닌 수는 모두 truthy 이기 때문에
  // if 문에 들어갈 수 있다
  if (idx) {
    // allMemo의 요소중 item.len 의 key와 idx.len 이 같은 인덱스 번호를 반환시켜
    // splice로 1개만 잘라냄
    allMemo.splice(
      allMemo.findIndex((item) => item.len == idx.len),
      1
    );

    // 로컬스토리지의 key와 value를 allMemo : {allMem의 JSON형식의 text} 로 보관
    localStorage.setItem("allMemo", JSON.stringify(allMemo));

    // render 함수 실행
    render();
  }
}
