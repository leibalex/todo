let doc = document,
	add = doc.getElementById('add');

add.onclick = ()=>{
	let text = doc.getElementById('text'),
		li = doc.createElement('li'),
		doneButton = doc.createElement("<input type ='button' class = 'done'>"),
		cancellButton = doc.createElement("<input type ='button' class = 'cancell'>"),
		span = doc.createElement('span'),
		ul = doc.querySelector('ul');

	span.innerHTML = text;
	cancellButton.
	li.appendChild(doneButton);
	li.appendChild(span);
	li.appendChild(cancellButton);
	ul.appendChild(li);
}





