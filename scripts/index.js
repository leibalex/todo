/**
 * Created by Alexey on 18.07.2017.
 */
window.onload = () => {
  const svgRemove = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect class="noFill" width="22" height="22"/><g><g><path class="fill" d="M16.1,3.6h-1.9V3.3c0-1.3-1-2.3-2.3-2.3h-1.7C8.9,1,7.8,2,7.8,3.3v0.2H5.9c-1.3,0-2.3,1-2.3,2.3v1.3c0,0.5,0.4,0.9,0.9,1v10.5c0,1.3,1,2.3,2.3,2.3h8.5c1.3,0,2.3-1,2.3-2.3V8.2c0.5-0.1,0.9-0.5,0.9-1V5.9C18.4,4.6,17.4,3.6,16.1,3.6z M9.1,3.3c0-0.6,0.5-1.1,1.1-1.1h1.7c0.6,0,1.1,0.5,1.1,1.1v0.2H9.1V3.3z M16.3,18.7c0,0.6-0.5,1.1-1.1,1.1H6.7c-0.6,0-1.1-0.5-1.1-1.1V8.2h10.6V18.7z M17.2,7H4.8V5.9c0-0.6,0.5-1.1,1.1-1.1h10.2c0.6,0,1.1,0.5,1.1,1.1V7z"/></g><g><g><path class="fill" d="M11,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6s0.6,0.3,0.6,0.6v6.8C11.6,17.7,11.4,18,11,18z"/></g><g><path class="fill" d="M8,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C8.7,17.7,8.4,18,8,18z"/></g><g><path class="fill" d="M14,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C14.6,17.7,14.3,18,14,18z"/></g></g></g></svg>';
  const svgComplete = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect y="0" class="noFill" width="22" height="22"/><g><path class="fill" d="M9.7,14.4L9.7,14.4c-0.2,0-0.4-0.1-0.5-0.2l-2.7-2.7c-0.3-0.3-0.3-0.8,0-1.1s0.8-0.3,1.1,0l2.1,2.1l4.8-4.8c0.3-0.3,0.8-0.3,1.1,0s0.3,0.8,0,1.1l-5.3,5.3C10.1,14.3,9.9,14.4,9.7,14.4z"/></g></svg>';
  const doc = document;

  const data = (localStorage.getItem('todolist')) ? JSON.parse(localStorage.getItem('todolist')) : {
    todo: [],
    complete: [],
  };

  const addBtn = doc.getElementById('add');
  const ulTodo = doc.getElementById('todo');
  const ulComplete = doc.getElementById('completed');
  const input = doc.getElementById('item');


  function dataObjectUpdate() {
    localStorage.setItem('todolist', JSON.stringify(data));
  }
  function addListItem(item, isComplete) {
    const element = isComplete ? ulComplete : ulTodo;

    element.insertBefore(item, element.firstElementChild);
  }
  function complete() {
    let li = this.parentNode;
    let index = -1;

    while (li.tagName !== 'LI') {
      li = li.parentNode;
    }

    const parent = li.parentNode;

    const text = li.firstElementChild.innerHTML;

    if (parent.id === 'todo') {
      addListItem(li, true);
      index = data.todo.indexOf(text);

      if (index !== -1) {
        data.todo.splice(index, 1);
        data.complete.push(text);
      }
    } else {
      addListItem(li, false);
      index = data.complete.indexOf(text);

      if (index !== -1) {
        data.complete.splice(index, 1);
        data.todo.push(text);
      }
    }

    dataObjectUpdate();
  }

  function remove() {
    let value = this.parentNode;
    let index = -1;

    while (value.tagName !== 'LI') {
      value = value.parentNode;
    }

    const parent = value.parentNode;

    const text = value.firstElementChild.innerHTML;

    if (parent.id === 'todo') {
      index = data.todo.indexOf(text);

      if (index !== -1) {
        data.todo.splice(index, 1);
        console.log('successfull remove from data.todo');
      }
    }
    if (parent.id === 'completed') {
      index = data.complete.indexOf(text);

      if (index !== -1) {
        data.complete.splice(index, 1);
        console.log('successfull remove from data.complete');
      }
    }

    parent.removeChild(value);

    dataObjectUpdate();
  }

  function createListItem(text) {
    const li = doc.createElement('li');
    const span = doc.createElement('span');
    const div = doc.createElement('div');
    const btn1 = doc.createElement('button');
    const btn2 = doc.createElement('button');
    div.classList.add('buttons');
    btn1.classList.add('remove');
    btn2.classList.add('complete');

    btn1.innerHTML = svgRemove;
    btn1.addEventListener('click', remove);

    btn2.innerHTML = svgComplete;
    btn2.addEventListener('click', complete);

    span.innerHTML = text;

    div.appendChild(btn1);
    div.appendChild(btn2);
    li.appendChild(span);
    li.appendChild(div);

    return li;
  }


  function renderTodoList() {
    if (data.todo.length !== 0) {
      console.log('todo isn`t empty');
      for (let i = 0; i < data.todo.length; i += 1) {
        const domElement = createListItem(data.todo[i]);
        addListItem(domElement, false);
      }
    } else {
      console.log('todo is empty');
    }

    if (data.complete.length !== 0) {
      console.log('complete isn`t empty');
      for (let i = 0; i < data.complete.length; i += 1) {
        const domElement = createListItem(data.complete[i]);
        addListItem(domElement, true);
      }
    } else {
      console.log('complete is empty');
    }
  }


  function addActivity() {
    const text = input.value;

    if (text) {
      addListItem(createListItem(text), false);
      input.value = '';

      data.todo.push(text);

      dataObjectUpdate();
    }
  }

  addBtn.addEventListener('click', addActivity);
  input.addEventListener('keydown', (event) => {
    if (event.code === 'Enter') {
      addActivity();
    }
  });

  renderTodoList();


  // /*  Test function  */
  // function showStorage() {
  //   const testData = JSON.parse(localStorage.getItem('todolist'));
  //   console.log('--------------------------\n');
  //
  //   console.log('\ntodo array\n');
  //
  //   for (let i = 0; i < testData.todo.length; i++) {
  //     console.log(testData.todo[i]);
  //   }
  //
  //
  //   console.log('\ncompleted array\n');
  //
  //   for (let i = 0; i < testData.complete.length; i++) {
  //     console.log(testData.complete[i]);
  //   }
  //   console.log('--------------------------\n');
  // }
};
