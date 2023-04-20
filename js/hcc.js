setHide("info_div", "info_selector", "Readme");
setHide("text_answer_div", "answer_text_selector", "Text answer");

document.getElementById("function-submit").onclick = function(){
	var input = document.getElementById('function-input');
	if (isValid(input)) {
		document.getElementById("text_answer_div").innerHTML = "<br>";
		
		var ham = new Hamming(Array.from(input.value).map(Number));
		
		var theDivText = document.getElementById("text_answer_div");
		theDivText.innerHTML += ham.toHtmlString();
	} else {
		alert("Invalid text");
	}
}

document.getElementById("info_selector").onclick = function(){
	setHide("info_div", "info_selector", "Readme");
}

document.getElementById("answer_text_selector").onclick = function(){
	setHide("text_answer_div", "answer_text_selector", "Text answer");
}

function setHide(id, name, text) {
	var element = document.getElementById(id);
	if (element.style.display == "none") {
		element.style.display = '';
		document.getElementById(name).innerHTML = "▼ " + text;
	} else {
		element.style.display = 'none';
		document.getElementById(name).innerHTML = "➤ " + text;
	}
}

function isValid(input) {
	return input.value != "" && /^[0-1]+$/.test(input.value);
}