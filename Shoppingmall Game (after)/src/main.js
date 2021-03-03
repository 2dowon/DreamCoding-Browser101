// JSON파일에서 데이터 가져오기
function loadItems() {
    return fetch('data/data.json')
      .then(response => response.json())
      .then(json => json.items);
}

// 각각의 아이템에 HTML 요소 추가
function createElement(item) {
  const img = document.createElement('img');
  img.setAttribute('class', 'thumbnail');
  img.setAttribute('src', item.image);

  const span = document.createElement('span');
  span.setAttribute('class', 'description');
  span.innerText = `${item.gender}, ${item.size} size`;
  const li = document.createElement('li');
  li.setAttribute('class', 'item');
  li.setAttribute('data-type', item.type);
  li.setAttribute('data-color', item.color);
  li.append(img);
  li.append(span);
  return li;
}

// 버튼 클릭
function onButtonClick(event, items) {
  const target = event.target;
  const key = target.dataset.key;
  const value = target.dataset.value;
  if (key == null || value == null) {
    return;
  }
  updateItems(items, key, value);
}

// 필터링 => 원하는 값(key)과 아이템의 value가 일치할 때 보여주기
function updateItems(items, key, value) {
  items.forEach(item => {
    if (item.dataset[key] === value) {
      item.classList.remove('invisible');
    } else {
      item.classList.add('invisible');
    }
  });
}

// 로고를 클릭하면 모든 아이템 보여주기
function onLogoClick(items) {
    items.forEach(item => {
        item.classList.remove('invisible');
    });
}

loadItems().then(items => {
  const elements = items.map(createElement);
  const container = document.querySelector('.items');
  container.append(...elements);
  const logo = document.querySelector('.logo');
  logo.addEventListener('click', () => onLogoClick(elements));
  const buttons = document.querySelector('.btns');
  buttons.addEventListener('click', event => onButtonClick(event, elements));
});
