
window.onload = ()=>{

	let doc = document,
		add = doc.getElementById('add'),
		ul = doc.querySelector('ul'),
		doneButtons = doc.querySelectorAll('.done'),
		cancellButtons = doc.querySelectorAll('.cancell');

	add.onclick = ()=>{
		let text = doc.getElementById('text').value;

		if(!text){
			alert('Поле не может быть пустым');
			return;
		}

		let li = doc.createElement('li'),
			doneButton = doc.createElement('input'),
			cancellButton = doc.createElement('input'),
			span = doc.createElement('span');
			

		doneButton.setAttribute('type','button');
		cancellButton.setAttribute('type','button');

		doneButton.classList.add('done');
		cancellButton.classList.add('cancell');

		span.innerHTML = text;
		li.appendChild(doneButton);
		li.appendChild(span);
		li.appendChild(cancellButton);
		ul.appendChild(li);

		doc.getElementById('text').value = '';
	}

}



