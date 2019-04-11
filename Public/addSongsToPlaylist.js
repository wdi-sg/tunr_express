function setUpEvents() {

	let i=2;
	function addField() {
		let fieldset = document.getElementById("container");
		let div = document.createElement("div");

		let p1 = document.createElement("p");
		p1.innerHTML = `Song ${i}: `;
		div.appendChild(p1);

		let songInput = document.createElement("input");
		songInput.type = "text";
		songInput.name = "song"+i;
		songInput.placeholder ="Photograph";
		div.appendChild(songInput);

		fieldset.appendChild(div);
		i++;
	}
	let button = document.getElementById("button");
	button.addEventListener("click", addField);

}

window.onload = function() {
	setUpEvents();	
};
