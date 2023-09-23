function showPic(whichpic) {
  let source = whichpic.getAttribute("href");
  let placeholder = document.getElementById("placeholder");
  placeholder.setAttribute("src", source);
}