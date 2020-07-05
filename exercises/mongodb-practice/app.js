const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/fruitsDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please check your data entry, no name specified"],
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
  },
  review: String,
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit({
  rating: 10,
  review: "Peaches are yummy.",
});

// fruit.save();

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favouriteFruit: fruitSchema,
});

const Person = new mongoose.model("Person", personSchema);

const pineapple = new Fruit({
  name: "Pineapple",
  score: 9,
  review: "Great fruit.",
});

// pineapple.save();

const mango = new Fruit({
  name: "Mango",
  score: 10,
  review: "Delectable treat!",
});

// mango.save();

Person.updateOne({ name: "John" }, { favouriteFruit: mango }, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Successfully updated John's favourite fruit.");
  }
});

const person = new Person({
  name: "Amy",
  age: 12,
  favouriteFruit: pineapple,
});

// person.save();

// const kiwi = new Fruit({
//   name: "Kiwi",
//   score: 10,
//   review: "The best fruit!",
// });

// const orange = new Fruit({
//   name: "Orange",
//   score: 4,
//   review: "Too sour for me",
// });

// const banana = new Fruit({
//   name: "Banana",
//   score: 3,
//   review: "Weird texture",
// });

// Fruit.insertMany([kiwi, orange, banana], (err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Successfully saved all fruits to fruitsDB");
//   }
// });

Fruit.find((err, fruits) => {
  if (err) {
    console.log(err);
  } else {
    fruits.forEach((fruit) => {
      console.log(fruit.name);
    });
  }
  mongoose.connection.close();
});

// Fruit.updateOne(
//   { _id: "5f00e66a2279a7592056faaa" },
//   { name: "Peach" },
//   (err) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("Successfully updated a document.");
//     }
//   }
// );

// Fruit.deleteOne({ name: "Peach" }, (err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Successfully deleted a document.");
//   }
// });

// Person.deleteMany({ name: "John" }, (err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Successfully deleted all documents with name John.");
//   }
// });
