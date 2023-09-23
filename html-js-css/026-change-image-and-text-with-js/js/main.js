function changeContent() {
  let name = prompt("Enter your name: ");
  if (name != null) {
    document.getElementById("text").innerHTML = "Mozilla is cool, " + name;
  }
}

function changeImage() {
  let image = document.getElementById("pictures");
  if (image.getAttribute("src") === "img/firefox.png") {
    image.setAttribute("src", "img/chrome.png");
  } else {
    image.setAttribute("src", "img/firefox.png");
  }
}