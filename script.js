var button = document.getElementById("enter");
var input = document.getElementById("userinput");
var ul = document.querySelector("ul");
var eachli = document.querySelectorAll("li");
var deletebtn = document.querySelectorAll("button.delete");

ul.addEventListener("click", checkItem);
button.addEventListener("click", clickfunction);
input.addEventListener("keypress", enterInputfunction);

deletebtn.forEach(function (i) {
  i.addEventListener("click", () => {
    i.parentNode.parentNode.removeChild(i.parentNode);
  });
});

function deleteItemfunction(i) {
  console.log(i);
  i.parentNode.removeChild(i);
  //console.log(i.parentElement.nodeName)
}
/*
forEach(var btn of deletebtn) {
	btn.addEventListener("click", deleteItemfunction);
}

function deleteItemfunction(eventItem, event) {
	alert(event.target + " also " + eventItem)
}*/

function checkItem(event) {
  //var target = getEventTarget(event);
  event.target.classList.toggle("done");
}

function inputLength() {
  return input.value.length;
}

function clickfunction() {
  if (inputLength() > 0) {
    createElementList();
  }
}

function createElementList() {
  var li = document.createElement("li");

  var button = document.createElement("button");
  button.classList.add("delete");

  var img = document.createElement("img");
  img.src = "./trash_bin_icon-icons.com_67981.png";

  li.appendChild(document.createTextNode(input.value));
  button.appendChild(img);
  li.appendChild(button);
  ul.appendChild(li);

  input.value = "";
}

function enterInputfunction(event) {
  if (inputLength() > 0 && event.keyCode === 13) {
    createElementList();
  }
}
