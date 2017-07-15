
window.onload = ()=>{


	const svgRemove = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect class="noFill" width="22" height="22"/><g><g><path class="fill" d="M16.1,3.6h-1.9V3.3c0-1.3-1-2.3-2.3-2.3h-1.7C8.9,1,7.8,2,7.8,3.3v0.2H5.9c-1.3,0-2.3,1-2.3,2.3v1.3c0,0.5,0.4,0.9,0.9,1v10.5c0,1.3,1,2.3,2.3,2.3h8.5c1.3,0,2.3-1,2.3-2.3V8.2c0.5-0.1,0.9-0.5,0.9-1V5.9C18.4,4.6,17.4,3.6,16.1,3.6z M9.1,3.3c0-0.6,0.5-1.1,1.1-1.1h1.7c0.6,0,1.1,0.5,1.1,1.1v0.2H9.1V3.3z M16.3,18.7c0,0.6-0.5,1.1-1.1,1.1H6.7c-0.6,0-1.1-0.5-1.1-1.1V8.2h10.6V18.7z M17.2,7H4.8V5.9c0-0.6,0.5-1.1,1.1-1.1h10.2c0.6,0,1.1,0.5,1.1,1.1V7z"/></g><g><g><path class="fill" d="M11,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6s0.6,0.3,0.6,0.6v6.8C11.6,17.7,11.4,18,11,18z"/></g><g><path class="fill" d="M8,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C8.7,17.7,8.4,18,8,18z"/></g><g><path class="fill" d="M14,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C14.6,17.7,14.3,18,14,18z"/></g></g></g></svg>',
		  svgComplete = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect y="0" class="noFill" width="22" height="22"/><g><path class="fill" d="M9.7,14.4L9.7,14.4c-0.2,0-0.4-0.1-0.5-0.2l-2.7-2.7c-0.3-0.3-0.3-0.8,0-1.1s0.8-0.3,1.1,0l2.1,2.1l4.8-4.8c0.3-0.3,0.8-0.3,1.1,0s0.3,0.8,0,1.1l-5.3,5.3C10.1,14.3,9.9,14.4,9.7,14.4z"/></g></svg>',
		  doc = document;

	let data = (localStorage.getItem('todolist')) ? JSON.parse(localStorage.getItem('todolist')) : {
		todo: [],
		complete: []
	};


	let addBtn = doc.getElementById('add'),
		ulTodo = doc.getElementById('todo'),
		ulComplete = doc.getElementById('completed'),
		input = doc.getElementById('item');

	addBtn.addEventListener('click', addActivity);
	input.addEventListener('keydown',event => {
		if(event.code === 'Enter'){
			addActivity();
		}
	});

	renderTodoList();



    function addActivity(){
    	let text = input.value;

    	if(text){

 			let element = createDOMElement(text);
    		addDOMElement(element, false);
    		input.value = '';

    		data.todo.push(text);

    		dataObjectUpdate();

    	}

    }

    	function remove(event){

    		let value = this.parentNode,
    			parent = null;

    		while(value.tagName !== 'LI'){
    			value = value.parentNode;
    		}

    		parent = value.parentNode;


    		let text = value.firstElementChild.innerHTML,
    			index = -1;

    			if(parent.id = 'todo'){
    				index = data.todo.indexOf(text);

    				if(index != -1){
    					data.todo.splice(index, 1);
    				}
    			}else{
    				index = data.complete.indexOf(text);

    				if(index != -1){
    					data.complete.splice(index, 1);
    				}
    			}

    			parent.removeChild(value);

    			dataObjectUpdate();

    	}

    	function complete(event){
    		let li = this.parentNode,
    			parent = null;

    		while(li.tagName !== 'LI'){
    			li = li.parentNode;
    		}

    		parent = li.parentNode;

    		let text = li.firstElementChild.innerHTML,
    			index = -1;

    		if(parent.id == 'todo'){
    			addDOMElement(li, true);
    			index = data.todo.indexOf(text);

    			if(index != -1){
    				data.todo.splice(index, 1);
    				data.complete.push(text);
    			}

    		}else{
    			addDOMElement(li, false);
    			index = data.complete.indexOf(text);

    			if(index != -1){
    				data.complete.splice(index, 1);
    				data.todo.push(text);
    			}
    		}

			dataObjectUpdate();    		
    	}

    	function addDOMElement(element, isComplete){

    		if(!isComplete){
    			ulTodo.insertBefore(element,ulTodo.firstElementChild);
    		}else{
    			ulComplete.insertBefore(element,ulComplete.firstElementChild);
    		}

    	}

    	function createDOMElement(value){

   	    let li = doc.createElement('li'),
    			span = doc.createElement('span'),
    			div = doc.createElement('div'),
    			btn1 = doc.createElement('button'),
    			btn2 = doc.createElement('button');

    		div.classList.add('buttons');
    		btn1.classList.add('remove');
    		btn2.classList.add('complete');

    		btn1.innerHTML = svgRemove;
    		btn1.addEventListener('click',remove);

    		btn2.innerHTML = svgComplete;
    		btn2.addEventListener('click',complete);

    		span.innerHTML = value;

    		div.appendChild(btn1);
    		div.appendChild(btn2);
    		li.appendChild(span);
    		li.appendChild(div);

    		return li;
    	}

    	function dataObjectUpdate(){
    		localStorage.setItem('todolist', JSON.stringify(data));
    	}

    	function renderTodoList(){
    		console.log('start rendering');
    		
    		if(data.todo){
    			console.log('todo isnt empty');
    			for(let i = 0; i < data.todo.length; i++){
    				let domElement = createDOMElement(data.todo[i]);
    				addDOMElement(domElement, false);
    			}
    		}else{
    			console.log('todo is empty');
    		}

    		if(data.complete){
    			console.log('complete isnt empty');
    			for(let i = 0; i < data.complete.length; i++){
    				let domElement = createDOMElement(data.complete[i]);
    				addDOMElement(domElement,true);
    			}
    		}else{
    			console.log('complete is empty');
    		}

    	}

    	/*  Test function  */
    	function showStorage(){
    		testData = JSON.parse(localStorage.getItem('todolist'));

    		for(let i = 0; i< testData.todo.length; i++){
    			console.log(testData.todo[i]);
    		}

    		console.log('--------------------------\n\n');

    		for(let i = 0; i< testData.complete.length; i++){
    			console.log(testData.complete[i]);
    		}
    	}
}

