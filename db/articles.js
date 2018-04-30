const collection = [
  {
    title: "burgers",
    body: "body",
    author: "author",
    urlTitle: "urlauthor"
  },
  {
    title: "photo",
    body: "body",
    author: "author",
    urlTitle: "urlauthor"

  }


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

function getByTitle(title){
  let changeValueIndex = collection.findIndex(collection => collection.title === title );
  return collection[changeValueIndex]
}; 

function getByUrlTitle(urlTitle){
  let changeValueIndex = collection.findIndex(collection => collection.urlTitle === urlTitle);
  return collection[changeValueIndex]
}

function editByTitle(title, newTitle, newBody, newAuthor, newUrlTitle) {
  console.log("here", title, newTitle, newBody, newAuthor, newUrlTitle);
  let changeValueIndex = collection.findIndex(collection => collection.title === title);
  collection[changeValueIndex].title = newTitle;
  collection[changeValueIndex].body = newBody;
  collection[changeValueIndex].author = newAuthor;
  collection[changeValueIndex].urlTitle = newUrlTitle;
  return collection[changeValueIndex]
}

function deleteByTitle(title){
  let changeValueIndex = collection.findIndex(collection => collection.title === title);
  console.log("delete-index: ", changeValueIndex);
  console.log("pre-slice: ",collection);
  let test = collection.splice(changeValueIndex, 1); 
  console.log("post-slice: ", collection);
};

module.exports = {
  all: all,
  add: add,
  getByTitle: getByTitle,
  getByUrlTitle: getByUrlTitle,
  editByTitle: editByTitle,
  deleteByTitle: deleteByTitle
};