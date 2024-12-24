import apiManager from "./apiModule";

const uiController = () => {
    const locName = document.getElementById('location-name');
    const locTemp = document.getElementById('location-temp');
    const form = document.getElementById('loc-form');
    const error = document.getElementById('error');
    const inputs = document.querySelectorAll('input');


    const render = (data) => {

        console.log('data', data);
        const locationName = document.createElement('h1');
        locationName.id = 'location-name';
        locationName.textContent = data.location;
        const localTime = document.createElement('p');
        localTime.id = 'local-time';
        localTime.textContent = `Local Time: ${data.localTime}`;

        const locationDiv = document.querySelector('.location');
        locationDiv.appendChild(locationName);
        locationDiv.appendChild(localTime);

        const currentTemp = document.createElement('p');
        currentTemp.id = 'location-temperature';
        currentTemp.textContent = `Current Temp: ${data.currentTemp}`;

        const maxTemp = document.createElement('p');
        maxTemp.id = 'max-temp';
        maxTemp.textContent = `Max Temp: ${data.maxTemp}`;

        const minTemp = document.createElement('p');
        minTemp.id = 'min-temp';
        minTemp.textContent = `Min Temp: ${data.minTemp}`;

        const temperatureDiv = document.querySelector('.temperature');
        temperatureDiv.appendChild(currentTemp);
        temperatureDiv.appendChild(maxTemp);
        temperatureDiv.appendChild(minTemp);

        const precipitation = document.createElement('p');
        precipitation.id = 'precipitation';
        precipitation.textContent = `Precipitation: ${data.percipitation}%`;

        const humidity = document.createElement('p');
        humidity.id = 'humidity';
        humidity.textContent = `Humidity: ${data.humidity}%`;

        const wind = document.createElement('p');
        wind.id = 'wind';
        wind.textContent = `Wind Speed: ${data.wind}`;

        const extraInfoDiv = document.querySelector('.extra-info');
        extraInfoDiv.appendChild(precipitation);
        extraInfoDiv.appendChild(humidity);
        extraInfoDiv.appendChild(wind);
    }

    const errorValidation = (inputName) => {
        if (inputName.value.length === 0) {
          console.log(`${inputName} is empty`);
          
          if (inputName.name === 'cName') {
            error.textContent = 'Please enter a valid city name';
            inputName.style.border = '1px solid';
            inputName.style.borderColor = 'red';
          }
        } else {
          if (inputName.name === 'cName') {
            error.textContent = '';
            inputName.style.borderColor = 'grey';
          }
        }
      }
      
      const addLocationListener = () => {
          form.addEventListener('submit', (event) => {
            event.preventDefault();
            const formData = new FormData(form);
            const cityName = formData.get('cName');
            // form.reset();
            console.log(cityName);
            inputs.forEach(input => errorValidation(input));
            if (cityName) {
              console.log(`city name entered successfully ${cityName}`);
              apiManager().fetchWeather(cityName)
              .then(response => {
                render(response); 
            });
              
            } else {
              console.log('Please enter a city name');
            }
        });
      }

    const init = () => {
        addLocationListener();
    }

    return {
        init,
    }   
};

export default uiController;