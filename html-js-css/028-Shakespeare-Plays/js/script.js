document.getElementById("changeStyleButton").addEventListener("click", function () {
  document.body.style.width = "800px";
  document.body.style.margin = "0 auto";

  let firstTable = document.getElementById("firstTable");
  let secondTable = document.getElementById("secondTable");

  firstTable.rows[0].style.backgroundColor = "lightgray";
  firstTable.rows[2].style.backgroundColor = "lightgray";
  firstTable.rows[4].style.backgroundColor = "lightgray";
  firstTable.rows[6].style.backgroundColor = "lightgray";

  secondTable.rows[0].style.backgroundColor = "lightgray";
  secondTable.rows[2].style.backgroundColor = "lightgray";

  let tableCells1 = document.querySelectorAll('.table1 td');
  tableCells1.forEach(function (cell1) {
    cell1.style.paddingRight = '100px';
  });

  let tableCells2 = document.querySelectorAll('.table2 td');
  tableCells2.forEach(function (cell2) {
    cell2.style.paddingRight = '187px';
  });

  let pagesCells = document.querySelectorAll('.table2 .pages');
  pagesCells.forEach(function (cell3) {
    cell3.style.paddingRight = '100px';
  });

  let iTegs = document.querySelectorAll('i');
  iTegs.forEach(function (element) {
    element.style.padding = '0 5px';
  });

  let dottedElenets = document.querySelectorAll('.dotted');
  dottedElenets.forEach(function (element) {
    element.style.textDecoration = 'underline';
    element.style.textDecorationStyle = 'dotted';
    element.style.color = 'brown';
    element.style.fontStyle = 'italic';
    element.style.fontWeight = '700';
  })

  let categoriesElements = document.querySelectorAll('.categories');
  categoriesElements.forEach(function (element) {
    element.style.display = "flex";
    element.style.justifyContent = "space-around";
    element.style.listStyleType = "none";
  })

  let ulGroupElements = document.querySelectorAll('ul.group');
  ulGroupElements.forEach(function (element) {
    element.style.listStylePosition = "inside";
    element.style.backgroundColor = "lightgrey";
    element.style.padding = "10px";
    element.style.marginTop = "1rem";
  })

});