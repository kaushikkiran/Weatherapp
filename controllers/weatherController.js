const config = require('./../configs/configs');
const apiKey = config.apiKey;

//Get Today's Current Weather Data from External API Call using an API Key
exports.getCurrentWeather = async (req, res) => {
    try {
        let city = req.params.city;    // Accept the city parameter from the request

        //Validate the city parameter, Setting the default city to Dublin
        if (!city || city === undefined) {
            city = "Dublin";
        }
        //Request for weather data based on city parameter
        const response = await fetch('https://api.weatherapi.com/v1/current.json?key=' + apiKey + '&q=' + city + '&aqi=no');
        const weatherData = await response.json();

        // Handle the response from the external API
        // Perform additional operations or return the data to the client

        //All Data has been retrieved in only one single unit of measurement (Apply conversion wherever necessary)
        var data = {
            location: weatherData.location.name,
            country: weatherData.location.country,
            latitude: weatherData.location.lat,
            longitude: weatherData.location.lon,
            localTime: weatherData.location.localTime,

            currentTemperature: weatherData.current.temp_c,  //All Temperature Values in Celsius
            currentCondition: weatherData.current.condition.text,
            currentWindSpeed: weatherData.current.wind_kph + 'kmph',   //All Wind Speed Values in KMPH
            currentWindDirection: weatherData.current.wind_dir,
            currentPrecipitation: weatherData.current.precip_mm + 'mm',   //All Precipitation Values in MM
            currentHumidity: weatherData.current.humidity + '%',
            currentFeelsLike: weatherData.current.feelslike_c + 'C',
            currentUVIndex: weatherData.current.uv,
        }
        res.json(data);
    }
    catch (err) {
        // Handle errors
        console.error('Error fetching weather data:', err);
        res.status(500).json({ message: 'Error fetching weather data' });
    }
};

//Function to get weather data for a specific date in the past
//A date can be passed to the function as an argument
exports.getPastWeather = async (req, res) => {
    try {
        let city = req.params.city;    // Accept the city parameter from the request

        //Validate the city paramete, Setting the default city to Dublin
        if (!city || city === undefined) {
            city = "Dublin";
        }
        //Hardcoding the past date
        let date = "2023-06-05";

        //Request for weather data based on city parameter
        const response = await fetch('https://api.weatherapi.com/v1/history.json?key=' + apiKey + '&q=' + city + '&dt=' + date);
        const weatherData = await response.json();

        //All Data has been retrieved in only one single unit of measurement (Apply conversion wherever necessary)
        res.json(weatherData);
    }
    catch (err) {
        // Handle errors
        console.error('Error fetching weather data:', err);
        res.status(500).json({ message: 'Error fetching weather data' });
    }
};

//Function to get weather data for a specific date in the future
//A date can be passed to the function as an argument
exports.getFutureWeather = async (req, res) => {
    try {
        let city = req.params.city;    // Accept the city parameter from the request

        //Validate the city paramete, Setting the default city to Dublin
        if (!city || city === undefined) {
            city = "Dublin";
        }
        //Hardcoding the future date (Anyday 14days from now upto 300 days)
        let date = '2023-06-27';

        //Request for weather data based on city parameter
        let reqURL = 'https://api.weatherapi.com/v1/future.json?key=' + apiKey + '&q=' + city + '&dt=' + date;
        const response = await fetch(reqURL);
        const weatherData = await response.json();

        //All Data has been retrieved in only one single unit of measurement (Apply conversion wherever necessary)
        var data = {
            location: weatherData.location.name,
            country: weatherData.location.country,
            averageTemperature: weatherData.location.avgTemp
        }
        res.json(weatherData);
    }
    catch (err) {
        // Handle errors
        console.error('Error fetching weather data:', err);
        res.status(500).json({ message: 'Error fetching weather data' });
    }
};

//Function to get weather data for a specific date in the future
//A date can be passed to the function as an argument
exports.getWeatherForcast = async (req, res) => {
    try {
        let city = req.params.city;    // Accept the city parameter from the request

        //Validate the city paramete, Setting the default city to Dublin
        if (!city || city === undefined) {
            city = "Dublin";
        }
        //Hardcoding the future date (Anyday 14days from now upto 300 days)
        let days = req.params.days; // Accept the days parameter from the request

        //Request for weather data based on city parameter
        const response = await fetch('https://api.weatherapi.com/v1/forecast.json?key=' + apiKey + '&q=' + city + '&days=' + days + '&aqi=no&alerts=no');
        const weatherData = await response.json();

        //All Data has been retrieved in only one single unit of measurement (Apply conversion wherever necessary)
        res.json(weatherData);
    }
    catch (err) {
        // Handle errors
        console.error('Error fetching weather data:', err);
        res.status(500).json({ message: 'Error fetching weather data' });
    }
};