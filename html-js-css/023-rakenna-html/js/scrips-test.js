const bodyLink = document.getElementsByTagName("body")[0]; // ссылка на body а 0 так как он 1
const divElem = document.createElement("div")  // создаем желемен (какой)
bodyLink.appendChild(divElem) // добавляем к дереву тегов к конкретному элементу в качестве потомка
divElem.id = "div1" // присваиваем к ID
const pElem1 = document.createElement("p")
const pElem2 = document.createElement("p")
divElem.appendChild(pElem1)
divElem.appendChild(pElem2)
pElem1.id = "p1"
pElem2.id = "p2"
const text1 = document.createTextNode("Text for paragraph 1")
const text2 = document.createTextNode("Text for paragraph 2")
pElem1.appendChild(text1)
pElem2.appendChild(text2)
const pElem3 = document.createElement("p")
divElem.appendChild(pElem3)
const text3 = document.createTextNode("Text for paragraph 3")
pElem3.appendChild(text3)


// const para = document.createElement("p");
// const node = document.createTextNode("!!! This is new paragraph !!!");
// para.appendChild(node);
// const element = document.getElementById("div1"); //Ссылка на элемент div1
// element.appendChild(para);  // Добавить узел para в element

// const otsikko = document.getElementsByTagName("body")[0];
// const hooyks = document.createElement("h1");
// const node2 = document.createTextNode("Uusi 1. tason otsitko");
// hooyks.appendChild(node2);
// otsikko.appendChild(hooyks);
