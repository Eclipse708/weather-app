const apiManager = () => {

    const fetchWeather = async (location) => {
        let url = 'http://api.weatherapi.com/v1/forecast.json?key=1986480656ec490d950204923202611&q=${your_location}';
        // let location = 'abbottabad';

        try {
            const response = await fetch('http://api.weatherapi.com/v1/forecast.json?key=1986480656ec490d950204923202611&q=abbottabad',
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

    const processJson = async (json) => {
        try {
            const response = await json.json();
            const temperature = response.current.temp_c;
    
            return temperature;
        } catch (e) {
            console.log(e);
        }
    }
    return {
        fetchWeather,
    }
}

export default apiManager;