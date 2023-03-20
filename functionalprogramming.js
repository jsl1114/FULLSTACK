var animals = [
  {
    name: "Jason",
    species: "cat",
  },
  {
    name: "Caro",
    species: "dog",
  },
  {
    name: "Hamilton",
    species: "dog",
  },
  {
    name: "Harlod",
    species: "fish",
  },
  {
    name: "Ursula",
    species: "cat",
  },
  {
    name: "Jimmy",
    species: "fish",
  },
]

// Filter to filter out the dogs
var isDog = (animal) => {
  return animal.species === "dog"
}
var dogs = animals.filter(isDog)

// console.log(dogs)

// map
var names = animals.map((animal) => {
  return animal.name + " is a " + animal.species
})

// console.log(names)

// reduce: not specific, can be used to express any list transformation
var orders = [
  {
    number: 1,
    amount: 250,
  },
  {
    number: 2,
    amount: 2320,
  },
  {
    number: 3,
    amount: 2210,
  },
  {
    number: 4,
    amount: 2540,
  },
  {
    number: 5,
    amount: 350,
  },
]

var totalAmount = orders.reduce((sum, order) => {
  return sum + order.amount
}, 0)

const { count } = require("console")
// console.log(totalAmount)

// Reduce again, but advanced
var fs = require("fs")
const {
  IncomingPhoneNumberPage,
} = require("twilio/lib/rest/api/v2010/account/incomingPhoneNumber")

var output = fs
  .readFileSync("data.txt", "utf8")
  .trim()
  .split("\n")
  .map((line) => line.split("\t"))
  .reduce((customers, line) => {
    customers[line[0]] = customers[line[0]] || []
    customers[line[0]].push({
      name: line[1],
      price: line[2],
      quantity: line[3],
    })
    return customers
  }, {})

// console.log(JSON.stringify(output, null, 2))

// Currying
let dragon = (name) => (size) => (element) =>
  name + " is a " + size + " dragon that breathes " + element

// console.log(dragon('Jason')('large')('water'));

// Recursion
const Fib = (n) => {
  let ans = n == 1 || n == 2 ? 1 : Fib(n - 1) + Fib(n - 2)
  return ans
}

// console.log(Fib(5))

const countDownFrom = (num) => {
  console.log(num)
  if (num !== 0) {
    countDownFrom(num - 1)
  }
}

// countDownFrom(20)

const categories = [
  { id: "animals", parent: null },
  { id: "mammals", parent: "animals" },
  { id: "dogs", parent: "mammals" },
  { id: "cats", parent: "mammals" },
  { id: "chihuahua", parent: "dogs" },
  { id: "labrador", parent: "dogs" },
  { id: "bombay", parent: "cats" },
  { id: "siamese", parent: "cats" },
]

let makeTree = (categories, parent) => {
  let node = {}
  categories
    .filter((c) => c.parent === parent)
    .forEach((c) => {
      node[c.id] = makeTree(categories, c.id)
    })
  return node
}

// console.log(JSON.stringify(makeTree(categories, null), null, 2))

// Promise
const loadImg = (url, callback) => {
  return new Promise((resolve, reject) => {
    let image = new Image()

    image.onload = () => {
      resolve(image)
    }

    image.onerror = () => {
      let message = "Could not load image at " + url
      reject(new Error(message))
    }

    image.src = url
  })
}

// Functors

