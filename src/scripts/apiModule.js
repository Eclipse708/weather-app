const apiManager = () => {

    const fetchWeather = async (location) => {
        console.log('loc', location);
        const urlTest = 'http://api.weatherapi.com/v1/forecast.json?key=1986480656ec490d950204923202611&q=${your_location}';
        const url = 'http://api.weatherapi.com/v1/forecast.json?';
        const apiKey = 'key=1986480656ec490d950204923202611&q=';

        try {
            const response = await fetch(`${url}${apiKey}${location}`,
                { mode: 'cors' }
            );

            if (response.status === 200) {
                const weatherData = processJson(response);
                return weatherData;
            } else {
                throw new Error (response.status);
            }
        } catch (e) {
            console.log('No matching location found');
            return 0;
        }

        // const resJson = data.then(response => {
        //     return response.json();
        // });

        // const temperature = resJson.then(response => {
        //    return response.current.temp_c;
        // });
        
        // return temperature;
    
    }

    const processJson = async (processData) => {
        try {
            const response = await processData.json();
            const data = {
              currentTemp: response.current.temp_c,
              maxTemp: response.forecast.forecastday[0].day.maxtemp_c,
              minTemp: response.forecast.forecastday[0].day.mintemp_c,
              percipitation: response.forecast.forecastday[0].day.daily_chance_of_rain,
              humidity: response.current.humidity,
              wind: response.current.wind_kph,
              localTime: response.location.localtime,
            }
    
            console.log(data);
            return data;
        } catch (e) {
            console.log(e);
        }
    }

    return {
        fetchWeather,
    }
}

export default apiManager;