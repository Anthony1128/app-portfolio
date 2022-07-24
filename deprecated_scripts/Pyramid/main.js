var pyramid = document.getElementById('pyramid');
var brick_obj = document.getElementById("brick");
var brick_item = brick_obj.value;

brick_obj.addEventListener("click", function() {
	brick_item = brick_obj.value;
	pyramid.innerHTML = printPyramid(brick_item, height_item);
});

var height_obj = document.getElementById("hight");
var height_item = Number(height_obj.value);
var height_display = document.getElementById("height_display");
height_display.textContent = height_item;

height_obj.addEventListener("click", function() {
	height_item = Number(height_obj.value);
	pyramid.innerHTML = printPyramid(brick_item, height_item);
	height_display.textContent = height_item;
});


pyramid.innerHTML = printPyramid(brick_item, height_item);
function printPyramid(item, height) {
	var res = "";

	for (var i = 2; i <= height+1; i++) {
		res += " ".repeat(height+1-i) + item.repeat(i) + "<br>";
	};

	return res;
}
