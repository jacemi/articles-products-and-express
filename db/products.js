const collection = [
  {
    id: 0,
    name: "apple",
    price: 1.25,
    inventory: 30 
  },
  {
    id: 1,
    name: "computer",
    price: 1000,
    inventory: 4
  },
  {
    id: 2,
    name: "mosquito",
    price: 0,
    inventory: 1000000
  },
];

let universalIdNumber = 3;

function all() {
  return collection;
}

function add(name, price, inventory) {
 let newProduct = {};
 newProduct.id = universalIdNumber;
 newProduct.name = name;
 newProduct.price = price;
 newProduct.inventory = inventory;
 collection.push(newProduct);
 universalIdNumber++;
};

function getById(id) {
  let changeValueIndex = collection.findIndex(collection => collection.id === id);
  return collection[changeValueIndex]
};

function editById(id, newName, newPrice, newInventory) {
  let changeValueIndex = collection.findIndex(collection => collection.id === id);
  console.log(changeValueIndex);

  collection[changeValueIndex].name = newName;
  collection[changeValueIndex].price = newPrice;
  collection[changeValueIndex].inventory = newInventory;
  return collection[changeValueIndex]
};

function deleteById(id) {
  let changeValueIndex = collection.findIndex(collection => collection.id === id);
  let test = collection.splice(changeValueIndex, 1); 
}

module.exports = {
  all: all,
  add: add,
  getById: getById,
  editById: editById,
  deleteById: deleteById
};