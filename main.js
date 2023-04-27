let userName = prompt("이름을 정해주세요");
const hello = document.querySelector("h1");

while (!userName) {
  userName = prompt("이름을 정해주세요");
}
hello.innerHTML = `Welcome!${userName} 님`;

// allMemo를 JSON 형식으로 작성된 문자열을 JS객체로 변환
let allMemo = JSON.parse(localStorage.getItem("allMemo"));

// allMemo의 값이 undefined라면 [] 배열을 할당합니다.
allMemo = allMemo ?? [];

console.log(allMemo);
// render 함수실행
render();

const saveBtn = document.querySelector("#save-btn");

saveBtn.addEventListener("click", saveNote);

// 저장 버튼을 눌렀을 때 실행함수 입니다.
function saveNote() {
  // input 의 입력값을 가져옵니다.
  let $title = document.querySelector("#title").value;

  // textarea의 value를 가져옵니다.
  let $content = document.querySelector("#content").value;

  if (!$title) {
    alert("내용을 입력해주세요");
  } else {
    console.log(132);
    // 배열인 allMemo에 객체를 push 하고 객체안에 값은 title의 value(text),content의 value(text), len이라는 key를가진 allMemo.length가 value로 들어가게 됩니다.
    allMemo.push({ $title, $content, len: allMemo.length });

    //localStorage에 "key","value"를 저장하기위한 setItem()
    //localStorage에 저장할 값은 title,content, allMemo.length가 됩니다.
    //stringify를 사용하여 JSON문자열로 변환시켜줍니다.
    localStorage.setItem("allMemo", JSON.stringify(allMemo));

    //render함수 실행
    render();
    document.querySelector("#title").value = "";
    document.querySelector("#content").value = "";
  }
}

function render() {
  // ul의 상위부모
  const $display = document.querySelector("#display");

  // 메모리스트를 품고있는 <ul>
  const $memolist = document.querySelector(".memo-list");

  // 함수가 실행 될 때마다 값이 초기화
  $memolist.innerHTML = "";

  for (const item of allMemo) {
    // ul안에 들어갈 자식을 생성
    const li = document.createElement("li");
    const div = document.createElement("div");
    const div2 = document.createElement("div");
    const article = document.createElement("article");
    const h3 = document.createElement("h3");
    const p = document.createElement("p");
    const viewBtn = document.createElement("button");
    const deleteBtn = document.createElement("button");

    // ul안에 들어갈 자식들의 className 추가
    li.classList.add("list-wrap");
    div.classList.add("list-num");
    div2.classList.add("button-wrap");
    viewBtn.classList.add("view");
    deleteBtn.classList.add("delete");

    // 각각의 자식을생성
    $memolist.append(li);
    li.appendChild(div);
    li.appendChild(article);
    li.appendChild(div2);
    article.appendChild(h3);
    article.appendChild(p);
    div2.appendChild(viewBtn);
    div2.appendChild(deleteBtn);

    deleteBtn.setAttribute("id", item.len); // 왜 index가 0부터 알아서 들어갈까...?

    // 제목,내용에 allMemo에 들어있는 값 대입
    h3.textContent = item.$title;
    p.textContent = item.$content;
    div.textContent = `No.${item.len + 1}`;
    viewBtn.innerHTML = `more`;
    deleteBtn.innerHTML = `<i class="fa-regular fa-trash-can"></i>`;

    deleteBtn.addEventListener("click", remove);

    // 더보기 버튼 이벤트
    viewBtn.addEventListener("click", () => {
      const modal = document.querySelector(".modal");
      const modalCloseBtn = modal.querySelector("#modal-close-button");
      const modalH3 = modal.querySelector("h3");
      const modalP = modal.querySelector("p");
      // modal 안에 들어갈 제목

      // 더보기 버튼을 누르면 모달 class추가
      const bgOpacity = document.querySelector(".background-opacity");

      bgOpacity.classList.add("bg-opacity");
      // 더보기 버튼을 누르면 모달 class추가
      const modalHidden = document.querySelector(".modal");
      modalHidden.classList.add("modal-hidden");

      modalH3.textContent = item.$title;
      modalP.textContent = item.$content;

      modalCloseBtn.addEventListener("click", () => {
        bgOpacity.classList.remove("bg-opacity");
        modalHidden.classList.remove("modal-hidden");
      });
    });
  }
}

// 로컬스토리지에 저장되어있는 값 제거
function remove() {
  const check = confirm("정말 삭제하시겠습니까?");
  // allMemo에 값중 event.secElement.id 와 같은 값을
  // idx상수에 return
  const idx = allMemo.find((item) => item.len == event.srcElement.id);

  // 만약 idx에 값이 있다면 <- 0이 아닌 수는 모두 truthy 이기 때문에
  // if 문에 들어갈 수 있다
  if (idx && check === true) {
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

const a = 1;
