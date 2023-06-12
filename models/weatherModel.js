const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WeatherSchema = new Schema({
  date: { type: Date, required: true },         //Assuming date to be the primary key or unique field in the collection
  location: { type: String, required: true },   //City of the application 
  temperature: { type: Number, required: true}   //Assuming its as average temperature for the day
});

// Export model
module.exports = mongoose.model("Weather", WeatherSchema); 