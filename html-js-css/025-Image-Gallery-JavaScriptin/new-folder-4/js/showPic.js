function showPic(whichpic) {
  let source = whichpic.getAttribute("href");
  let placeholder = document.getElementById("placeholder");
  placeholder.setAttribute("src", source);

  let text = whichpic.getAttribute("title")
  let discription = document.getElementById("description");
  discription.firstChild.nodeValue = text;

}