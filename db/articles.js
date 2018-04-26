const collection = [
  { title: "how to smell like a wet dog",
    body: "to smell like a wet dog you MUST live like a wet dog",
    author: "P. Oodle",
    urlTitle: "how%20to%20smell%20like%20a%20wet%20dog"}
];

function all() {
  return collection;
}

function add(title, body, author, urlTitle){
  let newArticle = {};
  newArticle.title = title;
  newArticle.body = body;
  newArticle.author = author;
  newArticle.urlTitle = urlTitle;
  collection.push(newArticle); 
}; 

module.exports = {
  all: all,
  add: add,
  // getByTitle: getByTitle,
  // editByTitle: editByTitle
};