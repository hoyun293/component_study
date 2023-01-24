let divs = document.querySelectorAll('div');
let RAF = window.requestAnimationFrame;
let now = function() {
  return performance
    ? performance.now()
    : Date.now();
};

/**
 * 레이아웃 스레싱 발생
 */

thrash.onclick = function() {
  reset();

  var start = now();
  let divArr = Array.from(divs);

  divArr.forEach(div=>{
    let width = div.clientWidth;
    div.style.height = width + 'px';
    div.style.background = '#'+Math.floor(Math.random() * 16777215).toString(16);   // ffffff -> 16777215
  })

  renderSpeed(now() - start);
};

/**
 * 레이아웃 스레싱 방지
 */

nothrash.onclick = function() {
  reset();
  
  var start = now();
  let divArr = Array.from(divs);

  divArr.forEach(div=>{
    let width = div.clientWidth;    // clientWidth역시 reflow를 유발해야하지만, 웹브라우저 최적화에 의해 한 번만 reflow수행
                                    // (기하학적 요소가 변경된 부분이 없기 때문)
    RAF(()=>{
        div.style.height = width + 'px';
        div.style.backgroundColor = '#'+Math.floor(Math.random()*16777215).toString(16);    // ffffff -> 16777215
    });
  });

  RAF(function() {
    renderSpeed(now() - start);
  });
};

/**
* 가상돔에서 처리
*/

vdom.onclick = function() {
  reset();

  let sectCl = divCompartment.cloneNode(true),
      divsCl = sectCl.querySelectorAll('div'),
       dFrag = document.createDocumentFragment(),
       start = now();
  
  let divArr = Array.from(divsCl);
  
  divArr.forEach(div=>{
    div.style.paddingTop = "10%";   // 위의 두 방식과 다르게 가상돔에서 div.clientWidth 는 0이기 때문에 paddingTop을 수정한다.
    div.style.backgroundColor = '#'+Math.floor(Math.random()*16777215).toString(16);    // ffffff -> 16777215
  });

  dFrag.appendChild(sectCl);
  RAF(function() {
    divCompartment.parentNode.replaceChild(dFrag,divCompartment);
    renderSpeed(now() - start);
  });
};

function reset() {
  divs = document.querySelectorAll('div');
  let divsArr = Array.from(divs);
  divsArr.forEach(div=>{
    div.style.height = '5px';
    div.offsetTop;  // offsetTop이 없다면 레이아웃 이벤트는 한 번만 발생한다. 웹브라우저 최적화로인하여 그러나, 
                    // offsetTop이 있으면 변화된 내용을 바로 적용 및 계산해야되기 때문에 reflow 발생
  });
}

function renderSpeed(ms) {
  speed.textContent = ms + 'ms';
}