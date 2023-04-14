import localStorageApi from './localstorage.js';
const formEl = document.querySelector('form');
const ulEl = document.querySelector('ul');

const LOCAL_KEY = 'todo-items';

// Перевірка якщо Local Storage пустий
let items = localStorageApi.load(LOCAL_KEY) || [];

formEl.addEventListener('submit', onClickSubmit);
ulEl.addEventListener('click', onBtnClick);


function updateList() {
  const markup = items
    .map(item => {
      return `
      <li>
      <span class="text${item.done ? ' done' : ''}">${item.text}</span>
      <div>
        <button type="button" data-id="${item.id}" class="delete">Видалити</button>
        <button type="button" data-id="${item.id}" class="done">${item.done ? 'Виконано!' : 'Не виконано'}</button>
      </div>
      </li>
    `;
    })
    .join('');

  ulEl.innerHTML = markup;

  // Додаємо до виконаних тасок клас сompleted при загрузці
  for (let item of items) {
    if (item.done) {
      const doneBtn = document.querySelector(`[data-id="${item.id}"].done`);

      doneBtn.classList.add('сompleted');
    }
  }
}

function onClickSubmit(event) {
    event.preventDefault();
    let input = event.currentTarget.elements['user-todos'];
    const task = input.value.trim();

    if (task != '') {
      const repeatTodos = items.find(({ text }) => text === task);
      if (repeatTodos) {
        alert('Така задача вже існує');
        return;
      }
    }

    const item = {
      id: Date.now(),
      text: task,
      done: false,
    };

    items.push(item);
    input.value = '';
    console.log(input)

    localStorageApi.save(LOCAL_KEY, items);
    updateList();

}


function onBtnClick(e) {
  // Робимо пошук відповідної кнопки
  const deleteBtn = e.target.matches('button.delete');
  const doneBtn = e.target.classList.contains('done');

  if (deleteBtn) {
    // Знаходимо id
    const todosId = parseInt(e.target.dataset.id);
    // Вертаємо новий масив, без елемента з найденим id
    items = items.filter(({ id }) => id !== todosId);
    // Зберігаємо у Local Storage
    localStorageApi.save(LOCAL_KEY, items);
    // Обновляємо розмітку
    updateList();
  }

  if (doneBtn) {
    // Знаходимо id
    const todosId = parseInt(e.target.dataset.id);
    // Знаходимо відповідну кнопку
    const item = items.find(({ id }) => id === todosId);

    // Якщо кнопка знайдена
    if (item) {
      const doneButton = e.target;
      // Робимо реверсію значення "done"
      item.done = !item.done;

      // Додає або знімає класс
      doneButton.classList.toggle('сompleted');

      // Змінює назву кнопки від параметра "done"
      doneButton.innerText = item.done ? 'Виконано!' : 'Не виконано';

      // Шукаємо span
      const spanEl = doneButton.parentElement.previousElementSibling;

      // Змінюємо йому клас
      spanEl.classList.toggle('done');

      // зберігаємо у Local Storage
      localStorageApi.save(LOCAL_KEY, items);
    }
  }
}
  
updateList();
