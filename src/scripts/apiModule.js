const apiManager = () => {

    const fetchWeather = async (location) => {
        const urlTest = 'http://api.weatherapi.com/v1/forecast.json?key=1986480656ec490d950204923202611&q=${your_location}';
        // const url = 'http://api.weatherapi.com/v1/forecast.json?';
        // const apiKey = 'key=1986480656ec490d950204923202611&q=';
        const apiKey = '48DBL9Y9LJFJZJVTP54BCVDFA';
        const url = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline'

        try {
            const response = await fetch(`${url}/${location}?key=${apiKey}`,
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
    
    }

    const processJson = async (processData) => {
        try {
            const response = await processData.json();
            // console.log(response);
            const data = {
              location: response.resolvedAddress,
              currentTemp: response.currentConditions.temp,
              maxTemp: response.days[0].tempmax,
              minTemp: response.days[0].tempmin,
              percipitation: response.currentConditions.precipprob,
              humidity: response.currentConditions.humidity,
              description: response.description,
              days: response.days,
            }
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