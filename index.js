const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

//Method 1 : Using Async Await

const manageRecipes = async () => {
  try {
    // Connection to the database "recipe-app"
    const dbConnection = await mongoose.connect(MONGODB_URI);
    console.log(`Connected to the database: "${dbConnection.connection.name}"`);

    // Before adding any recipes to the database, let's remove all existing ones
    await Recipe.deleteMany();

    const bolognese = await Recipe.create({

      title: "Pasta Bolognese",
      level: "Easy Peasy",
      ingredients: ["Meat", "Tomato sauce", "Pasta", "Parmigiano"],
      cuisine: "Italian",
      dishType: "main_course",
      image: "https://media-assets.lacucinaitaliana.it/photos/61fb130ae334e788eab040b9/1:1/w_2240,c_limit/Tagliatelle-con-rag%C3%B9-alla-bolognese.jpg",
      duration: 120,
      creator: "Your Nonna",
      created: "810-10-12",

    });
console.log(bolognese.title);

await Recipe.insertMany(data);

data.forEach(element => console.log(element.title));

let updateRecipe = await Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100}, {new: true});
console.log(updateRecipe);
  
let deleteRecipe = await Recipe.deleteOne({title: "Carrot Cake"});
console.log(deleteRecipe)

dbConnection.disconnect();

    // Run your code here, after you have insured that the connection was made
  } catch (error) {
    console.log(error);
  }
};


manageRecipes();

//Method 2: Using .then() method
//If you want to use this method uncomment the code below:

/* mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
  })
  .catch((error) => {
    console.error('Error connecting to the database', error);
  }); */
