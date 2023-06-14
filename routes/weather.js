let express = require('express');
let router = express.Router();
let weatherController = require('../controllers/weatherController');

//Get All Weather Data in the present date (Default value set to Dublin)
router.get('/', weatherController.getCurrentWeather);

//Get All Weather Data for a particular city in the present date
router.get('/:city', weatherController.getCurrentWeather);

//Method cannot be implemented at present due to API limitations
//router.get('/:city/:from/:to', weatherController.getWeatherWithinRange);

//Get forecast for the next 'N' number of days, Max limit is 10 days[API Limitations])
router.get('/forecast/:city', weatherController.getWeatherForcast);
router.get('/forecast/:city/:days', weatherController.getWeatherForcast);

//Get Historical data for a specific date (Date on or after 1st Jan, 2010 in yyyy-MM-dd format)
router.get('/history/:city/:date', weatherController.getPastWeather);

//Get Future data for a specific date (Date between 14 days and 300 days from today in the future in yyyy-MM-dd format)
router.get('/future/:city/:date', weatherController.getFutureWeather);

//router.get('/getAverageTemperature/:city/:dateFrom/:dateTo', weatherController.getAverageTemperature);
//The above method can also be extended to calculate average wind speed, rainfall, precipitation, humidity,etc.
//The above method can be made to accept 2 dates or either a single date and return data based on the input values 
//The data is recorded every 3 hours by the sensor (Total 8 readings per day)

//router.get('/getMinimumTemperature/:city/:date, weatherController.getMinimumTemperature);
//The above method can also be extended to get the minimum/maximum metrics of the sensor data.
//A date value is passed as an argument, or else defaults date is to be today and values will be returned.

module.exports = router;
