const SHORT_TEXT_LENGTH = 25;

const loadPage = (filename) => {
  fetch(`./${filename}`)
    .then(function (response) {
      return response.text();
    })
    .then(function (html) {
      document.getElementById("maincontent").innerHTML = html;
    })
    .then(function () {
      if (filename == "./newsfeed.html") {
        loadArticles();
        console.log("jee jee");
      }
    })
    .catch(function (err) {
      console.log("Failed to fetch page: ", err);
    });
};

const articleTexts = [
  {
    open: "true",
    text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit.Inventore ab repellat, laboriosam aliquam autem officiis.",
  },
  {
    open: "true",
    text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente aut iusto, ipsum omnis laudantium exercitationem dolores ab!\tAccusamus voluptatem quam facilis soluta veniam numquam alias ipsum ut suscipit, molestias ratione sequi iste voluptatibus laudantium, repellendus praesentium laborum.\nAspernatur qui iste consectetur dolore facere, nulla quo voluptates! Laboriosam quasi dolore praesentium est, harum obcaecati fugiat officiis.",
  },
  {
    open: "true",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.\nNam, earum at facere praesentium neque excepturi harum dolorum sequi cupiditate natus totam, amet tempore, modi perferendis delectus maxime minima deleniti?",
  },
];

const loadArticles = () => {
  const articles = document.getElementsByTagName("article");
  const feedLength = articles.length;

  if (articles.length > articleTexts.length) {
    feedLength = articleTexts.length;
  }

  for (let i = 0; i < feedLength; i++) {
    const article = articles[i];
    loadArticle(article, getText(article));
    closeArticle(article);
  }
};

const getText = (article) => {
  const index = getIndex(article);
  return articleTexts[index].text;
};

const loadArticle = (article, text) => {
  const articleBody = article.querySelector(".articleBody");
  removeAllChildNodes(articleBody);

  for (let paragraph of text.split("\n")) {
    const textNode = document.createTextNode(paragraph);
    const newParagraph = document.createElement("p");
    newParagraph.appendChild(textNode);
    articleBody.appendChild(newParagraph);
  }
};

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

const toggleArticle = (article) => {
  if (isOpen(article)) {
    closeArticle(article);
  } else {
    openArticle(article);
  }
};

const closeArticle = (article) => {
  const words = getText(article).split(" ");
  if (words.length <= SHORT_TEXT_LENGTH) {
    loadArticle(article, getText(article));
  } else {
    const shortenedText = words.slice(0, 25).join(" ") + " (...)";
    loadArticle(article, shortenedText);
  }
  changeStatus(article, false);
  updateLink(article);
};

const updateLink = (article) => {
  const index = getIndex(article);
  const link = article.querySelector("a");
  if (isOpen(article)) {
    link.textContent = "Read less...";
  } else {
    link.textContent = "Read more...";
  }
  if (getText(article).split(" ").length <= SHORT_TEXT_LENGTH) {
    link.textContent = "";
  }
};

const isOpen = (article) => {
  const index = getIndex(article);
  return articleTexts[index].open;
};

const openArticle = (article) => {
  const index = getIndex(article);
  loadArticle(article, articleTexts[index].text);
  changeStatus(article, true);
  updateLink(article);
};

const changeStatus = (article, open = null) => {
  const index = getIndex(article);
  if (open == null) {
    articleTexts[index].open = !articleTexts[index].open;
  } else {
    articleTexts[index].open = open;
  }
};

const getIndex = (article) => {
  const allArticles = Array.from(document.querySelectorAll("article"));
  return allArticles.indexOf(article);
};

loadPage("./login.html");
