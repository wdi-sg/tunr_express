function setUpEvents() {

	let i=2;
	function addField() {
		let container = document.getElementById("container");
		let div = document.createElement("div");

		let p1 = document.createElement("p");
		p1.innerHTML = `Song ${i}: `;
		div.appendChild(p1);

		let select = document.querySelector("select");
		let clonedNodes = select.cloneNode(true);
		clonedNodes.name="song"+i;

		div.appendChild(clonedNodes);

		container.appendChild(div);
		i++;
	}
	let button = document.getElementById("button");
	button.addEventListener("click", addField);

}

window.onload = function() {
	setUpEvents();	
};
