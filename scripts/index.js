/**
 * Created by Alexey on 18.07.2017.
 */
window.onload = () => {
  const svgRemove = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect class="noFill" width="22" height="22"/><g><g><path class="fill" d="M16.1,3.6h-1.9V3.3c0-1.3-1-2.3-2.3-2.3h-1.7C8.9,1,7.8,2,7.8,3.3v0.2H5.9c-1.3,0-2.3,1-2.3,2.3v1.3c0,0.5,0.4,0.9,0.9,1v10.5c0,1.3,1,2.3,2.3,2.3h8.5c1.3,0,2.3-1,2.3-2.3V8.2c0.5-0.1,0.9-0.5,0.9-1V5.9C18.4,4.6,17.4,3.6,16.1,3.6z M9.1,3.3c0-0.6,0.5-1.1,1.1-1.1h1.7c0.6,0,1.1,0.5,1.1,1.1v0.2H9.1V3.3z M16.3,18.7c0,0.6-0.5,1.1-1.1,1.1H6.7c-0.6,0-1.1-0.5-1.1-1.1V8.2h10.6V18.7z M17.2,7H4.8V5.9c0-0.6,0.5-1.1,1.1-1.1h10.2c0.6,0,1.1,0.5,1.1,1.1V7z"/></g><g><g><path class="fill" d="M11,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6s0.6,0.3,0.6,0.6v6.8C11.6,17.7,11.4,18,11,18z"/></g><g><path class="fill" d="M8,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C8.7,17.7,8.4,18,8,18z"/></g><g><path class="fill" d="M14,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C14.6,17.7,14.3,18,14,18z"/></g></g></g></svg>';
  const svgComplete = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect y="0" class="noFill" width="22" height="22"/><g><path class="fill" d="M9.7,14.4L9.7,14.4c-0.2,0-0.4-0.1-0.5-0.2l-2.7-2.7c-0.3-0.3-0.3-0.8,0-1.1s0.8-0.3,1.1,0l2.1,2.1l4.8-4.8c0.3-0.3,0.8-0.3,1.1,0s0.3,0.8,0,1.1l-5.3,5.3C10.1,14.3,9.9,14.4,9.7,14.4z"/></g></svg>';
  const doc = document;
  const tasksFromStorage = localStorage.getItem('todolist');

  const tasks = (tasksFromStorage) ? JSON.parse(tasksFromStorage) : {
    todo: [],
    complete: [],
  };

  const addBtn = doc.getElementById('add');
  const ulTodo = doc.getElementById('todo');
  const ulComplete = doc.getElementById('completed');
  const input = doc.getElementById('item');

  const updateStorage = () => localStorage.setItem('todolist', JSON.stringify(tasks));

  const addListItem = (item, isComplete) => {
    const element = isComplete ? ulComplete : ulTodo;

    element.insertBefore(item, element.firstElementChild);
  };

  const complete = (taskNode) => {
    const listNode = taskNode.parentNode;
    const text = taskNode.textContent;
    const isTodoTask = listNode.id === 'todo';
    const textPosition = tasks[isTodoTask ? 'todo' : 'complete'].indexOf(text);

    addListItem(taskNode, isTodoTask);

    tasks[isTodoTask ? 'todo' : 'complete'].splice(textPosition, 1);
    tasks[isTodoTask ? 'complete' : 'todo'].push(text);

    updateStorage();
  };

  const remove = (taskNode) => {
    const listNode = taskNode.parentNode;

    if (listNode.id === 'todo') {
      tasks.todo = tasks.todo.filter(taskText => taskText !== taskNode.textContent);
    } else {
      tasks.complete = tasks.complete.filter(taskText => taskText !== taskNode.textContent);
    }

    listNode.removeChild(taskNode);

    updateStorage();
  };

  const createListItem = (text) => {
    const li = doc.createElement('li');
    const createButton = (className, html, clickListener) => {
      const button = doc.createElement('button');

      button.classList.add(className);
      button.innerHTML = html;
      button.addEventListener('click', clickListener.bind(this, li));

      return button;
    };

    const span = doc.createElement('span');
    const div = doc.createElement('div');
    const btn1 = createButton('remove', svgRemove, remove);
    const btn2 = createButton('complete', svgComplete, complete);

    div.classList.add('buttons');

    span.innerHTML = text;

    [btn1, btn2].forEach(button => div.appendChild(button));
    [span, div].forEach(element => li.appendChild(element));

    return li;
  };

  const renderTodoList = () => {
    tasks.todo.forEach(todoTask => addListItem(createListItem(todoTask), false));
    tasks.complete.forEach(completedTask => addListItem(createListItem(completedTask), true));
  };

  const addActivity = () => {
    const text = input.value;

    if (text) {
      addListItem(createListItem(text), false);
      input.value = '';

      tasks.todo.push(text);

      updateStorage();
    }
  };

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
